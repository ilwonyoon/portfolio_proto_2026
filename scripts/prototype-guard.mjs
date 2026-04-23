#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const cwd = process.cwd()
const [, , mode, targetArg] = process.argv

const curatedHistoryExamples = [
  {
    asset: '/assets/figma/creator-onboarding/notification-24.svg',
    note: 'suffix says 24, actual vector is 18.20 x 20.25',
  },
  {
    asset: '/assets/figma/creator-onboarding/settings-24.svg',
    note: 'suffix says 24, actual vector is 20.72 x 21.00',
  },
  {
    asset: '/assets/figma/creator-profile-content/profile-active-blue-24.svg',
    note: 'suffix says 24, actual vector is 17.37 x 19.80',
  },
]

function printUsage() {
  console.log(
    'Usage:\n' +
      '  npm run prototype:pre -- <prototype-id>\n' +
      '  npm run prototype:post -- <prototype-id>\n',
  )
}

function normalizeAssetPath(src) {
  if (!src) {
    return null
  }

  const normalized = src.trim().replace(/^['"`]|['"`]$/g, '')

  if (!normalized.startsWith('/assets/figma/') || !normalized.endsWith('.svg')) {
    return null
  }

  return normalized
}

function numericSuffixFromFilename(filePath) {
  const match = path.basename(filePath).match(/(?:-|_)(\d+(?:\.\d+)?)\.svg$/)
  return match ? Number(match[1]) : null
}

function parseViewBox(svgSource) {
  const match = svgSource.match(/viewBox="[^"]*?0 0 ([\d.]+) ([\d.]+)"/)

  if (!match) {
    return null
  }

  return {
    width: Number(match[1]),
    height: Number(match[2]),
  }
}

async function walkFiles(dirPath, predicate = () => true) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolutePath, predicate)))
      continue
    }

    if (predicate(absolutePath)) {
      files.push(absolutePath)
    }
  }

  return files
}

async function loadAssetMetadata() {
  const assetRoot = path.join(cwd, 'public', 'assets', 'figma')
  const svgFiles = await walkFiles(assetRoot, (filePath) => filePath.endsWith('.svg'))
  const assetMap = new Map()

  for (const absolutePath of svgFiles) {
    const source = await fs.readFile(absolutePath, 'utf8')
    const viewBox = parseViewBox(source)

    if (!viewBox) {
      continue
    }

    const webPath = `/${path.relative(path.join(cwd, 'public'), absolutePath).replaceAll(path.sep, '/')}`

    assetMap.set(webPath, {
      asset: webPath,
      absolutePath,
      width: viewBox.width,
      height: viewBox.height,
      suffix: numericSuffixFromFilename(absolutePath),
      isLikelyIcon: Math.max(viewBox.width, viewBox.height) <= 32,
    })
  }

  return assetMap
}

function resolveTemplateSrc(expression, constMap) {
  const stringLiteralMatch = expression.match(/^['"]([^'"]+)['"]$/)

  if (stringLiteralMatch) {
    return normalizeAssetPath(stringLiteralMatch[1])
  }

  const templateLiteralMatch = expression.match(/^`([^`]+)`$/)

  if (!templateLiteralMatch) {
    return null
  }

  const template = templateLiteralMatch[1]
  const simpleTemplateMatch = template.match(/^\$\{(\w+)\}\/([^$]+\.svg)$/)

  if (!simpleTemplateMatch) {
    return null
  }

  const [, constName, tail] = simpleTemplateMatch
  const base = constMap.get(constName)

  if (!base) {
    return null
  }

  return normalizeAssetPath(`${base}/${tail}`)
}

function parseConstMap(fileSource) {
  const constMap = new Map()

  for (const match of fileSource.matchAll(
    /const\s+(\w+)\s*=\s*['"]([^'"]+)['"]/g,
  )) {
    constMap.set(match[1], match[2])
  }

  return constMap
}

function parseFigmaAssetUsages(fileSource, constMap) {
  const usages = []
  const blocks = fileSource.match(/<FigmaAsset[\s\S]*?\/>/g) ?? []

  for (const block of blocks) {
    const srcMatch = block.match(/src=\{([^}]+)\}|src="([^"]+)"/)
    const widthMatch = block.match(/displayWidth=\{([\d.]+)\}/)
    const heightMatch = block.match(/displayHeight=\{([\d.]+)\}/)

    if (!srcMatch || !widthMatch || !heightMatch) {
      continue
    }

    const rawSrc = srcMatch[1]?.trim() ?? `"${srcMatch[2]}"`
    const src = resolveTemplateSrc(rawSrc, constMap)

    if (!src) {
      continue
    }

    usages.push({
      src,
      width: Number(widthMatch[1]),
      height: Number(heightMatch[1]),
      kind: 'FigmaAsset',
    })
  }

  return usages
}

function parseObjectIconUsages(fileSource, constMap) {
  const usages = []

  for (const match of fileSource.matchAll(
    /(iconSrc|src)\s*:\s*([^,\n]+),[\s\S]{0,220}?(iconWidth|displayWidth|width)\s*:\s*([\d.]+)[\s\S]{0,120}?(iconHeight|displayHeight|height)\s*:\s*([\d.]+)/g,
  )) {
    const src = resolveTemplateSrc(match[2].trim(), constMap)

    if (!src) {
      continue
    }

    usages.push({
      src,
      width: Number(match[4]),
      height: Number(match[6]),
      kind: 'iconConfig',
    })
  }

  return usages
}

function round(value) {
  return Number(value.toFixed(2))
}

function analyzeUsage(filePath, usage, assetMeta) {
  const widthDelta = Math.abs(usage.width - assetMeta.width)
  const heightDelta = Math.abs(usage.height - assetMeta.height)
  const suffix = assetMeta.suffix
  const matchesSuffix =
    suffix !== null &&
    Math.abs(usage.width - suffix) <= 0.25 &&
    Math.abs(usage.height - suffix) <= 0.25

  if (
    matchesSuffix &&
    (Math.abs(assetMeta.width - suffix) > 1 || Math.abs(assetMeta.height - suffix) > 1)
  ) {
    return {
      severity: 'error',
      filePath,
      message:
        'display size matches filename slot suffix, not the actual SVG vector size',
      usage,
      assetMeta,
    }
  }

  if (assetMeta.isLikelyIcon && (widthDelta > 2 || heightDelta > 2)) {
    return {
      severity: 'warn',
      filePath,
      message: 'display size is materially different from the actual SVG viewBox size',
      usage,
      assetMeta,
    }
  }

  return null
}

async function resolveTargetFiles(target) {
  const prototypeDir = path.join(cwd, 'src', 'prototypes', target)
  const absoluteTarget = path.resolve(cwd, target)
  const candidates = []

  try {
    const stat = await fs.stat(prototypeDir)
    if (stat.isDirectory()) {
      candidates.push(prototypeDir)
    }
  } catch {}

  try {
    const stat = await fs.stat(absoluteTarget)
    if (stat.isDirectory()) {
      candidates.push(absoluteTarget)
    }
  } catch {}

  if (candidates.length === 0) {
    throw new Error(`Could not resolve target "${target}"`)
  }

  const files = []

  for (const dirPath of candidates) {
    files.push(
      ...(await walkFiles(
        dirPath,
        (filePath) => filePath.endsWith('.ts') || filePath.endsWith('.tsx'),
      )),
    )
  }

  return [...new Set(files)]
}

function printHistoryExamples() {
  console.log('\nKnown repeated icon import failures from this repo:')
  for (const example of curatedHistoryExamples) {
    console.log(`- ${example.asset}: ${example.note}`)
  }
}

async function runPre(target) {
  const assetMap = await loadAssetMetadata()
  const prefix = `/assets/figma/${target}/`
  const localAssets = [...assetMap.values()].filter((asset) =>
    asset.asset.startsWith(prefix),
  )
  const suffixMismatches = localAssets.filter(
    (asset) =>
      asset.isLikelyIcon &&
      asset.suffix !== null &&
      (Math.abs(asset.width - asset.suffix) > 1 ||
        Math.abs(asset.height - asset.suffix) > 1),
  )

  console.log(`Prototype pre-hook: ${target}`)
  console.log('\nBefore implementing, follow these rules:')
  console.log('- Reuse existing system components before building a new one.')
  console.log(
    '- For icons, pass the real SVG vector size to `FigmaAsset`, not the 24x24 slot/container size.',
  )
  console.log(
    '- Treat filename suffixes like `-24.svg` as a slot hint only. They are not reliable icon vector dimensions.',
  )
  console.log(
    '- Wrap icons in a 24x24 or 18x18 slot with CSS/layout. Keep the image itself at the measured vector size.',
  )
  console.log(
    '- When the SVG viewBox has decimals, preserve those decimals unless you have a strong reason not to.',
  )

  printHistoryExamples()

  if (suffixMismatches.length > 0) {
    console.log(`\nPotential icon traps in public/assets/figma/${target}:`)
    for (const asset of suffixMismatches.slice(0, 12)) {
      console.log(
        `- ${asset.asset}: suffix ${asset.suffix}, actual ${round(asset.width)} x ${round(asset.height)}`,
      )
    }
  } else {
    console.log('\nNo local icon suffix mismatches found in the target asset folder.')
  }
}

async function runPost(target) {
  const assetMap = await loadAssetMetadata()
  const targetFiles = await resolveTargetFiles(target)
  const findings = []

  for (const absolutePath of targetFiles) {
    const fileSource = await fs.readFile(absolutePath, 'utf8')
    const constMap = parseConstMap(fileSource)
    const usages = [
      ...parseFigmaAssetUsages(fileSource, constMap),
      ...parseObjectIconUsages(fileSource, constMap),
    ]

    for (const usage of usages) {
      const assetMeta = assetMap.get(usage.src)

      if (!assetMeta) {
        continue
      }

      const finding = analyzeUsage(absolutePath, usage, assetMeta)

      if (finding) {
        findings.push(finding)
      }
    }
  }

  console.log(`Prototype post-hook: ${target}`)

  if (findings.length === 0) {
    console.log('No suspicious icon import sizing found.')
    return
  }

  const errors = findings.filter((finding) => finding.severity === 'error')
  const warnings = findings.filter((finding) => finding.severity === 'warn')

  if (errors.length > 0) {
    console.log('\nErrors:')
    for (const finding of errors) {
      console.log(
        `- ${path.relative(cwd, finding.filePath)}\n` +
          `  ${finding.usage.src}\n` +
          `  used ${finding.usage.width} x ${finding.usage.height}, actual ${round(finding.assetMeta.width)} x ${round(finding.assetMeta.height)}\n` +
          `  ${finding.message}`,
      )
    }
  }

  if (warnings.length > 0) {
    console.log('\nWarnings:')
    for (const finding of warnings.slice(0, 20)) {
      console.log(
        `- ${path.relative(cwd, finding.filePath)}\n` +
          `  ${finding.usage.src}\n` +
          `  used ${finding.usage.width} x ${finding.usage.height}, actual ${round(finding.assetMeta.width)} x ${round(finding.assetMeta.height)}\n` +
          `  ${finding.message}`,
      )
    }
  }

  printHistoryExamples()

  if (errors.length > 0) {
    process.exitCode = 1
  }
}

async function main() {
  if (!mode || !targetArg || !['pre', 'post'].includes(mode)) {
    printUsage()
    process.exit(1)
  }

  if (mode === 'pre') {
    await runPre(targetArg)
    return
  }

  await runPost(targetArg)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
