#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const cwd = process.cwd()
const [prototypeId, ...titleParts] = process.argv.slice(2)

if (!prototypeId) {
  console.error('Usage: npm run new:prototype -- <prototype-id> "<Prototype Title>"')
  process.exit(1)
}

if (!/^[a-z0-9-]+$/.test(prototypeId)) {
  console.error('Prototype id must be kebab-case, e.g. room-planner')
  process.exit(1)
}

const title =
  titleParts.join(' ').trim() ||
  prototypeId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const pascalName = prototypeId
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('')

const componentName = `${pascalName}Prototype`
const prototypeDir = path.join(cwd, 'src', 'prototypes', prototypeId)
const componentPath = path.join(prototypeDir, `${componentName}.tsx`)
const cssPath = path.join(prototypeDir, `${prototypeId}.css`)
const indexPath = path.join(prototypeDir, 'index.ts')
const registryPath = path.join(cwd, 'src', 'app', 'prototype-registry.ts')

const componentSource = `import './${prototypeId}.css'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { HomeIndicator } from '../../system/mobile/HomeIndicator'

type ${componentName}Props = {
  mode?: 'full' | 'thumbnail'
}

function ${componentName}({ mode = 'full' }: ${componentName}Props) {
  const isThumbnail = mode === 'thumbnail'

  return (
    <div
      className={
        isThumbnail
          ? '${prototypeId} ${prototypeId}--thumbnail'
          : '${prototypeId} ${prototypeId}--full'
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <div className="${prototypeId}__screen">
          <div className="${prototypeId}__content">
            <p className="${prototypeId}__eyebrow">Prototype scaffold</p>
            <h1 className="${prototypeId}__title">${title}</h1>
            <p className="${prototypeId}__copy">
              Replace this starter screen with the next Figma-driven prototype.
            </p>
          </div>
          <HomeIndicator />
        </div>
      </PrototypeScreen>
    </div>
  )
}

export default ${componentName}
`

const cssSource = `.${prototypeId} {
  overflow-x: hidden;
}

.${prototypeId}--full {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 32px 16px;
}

.${prototypeId}--thumbnail {
  width: 375px;
  height: 812px;
  display: block;
  pointer-events: none;
}

.${prototypeId}__screen {
  min-height: 812px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
}

.${prototypeId}__content {
  padding: 72px 24px 0;
}

.${prototypeId}__eyebrow {
  margin: 0 0 12px;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.3px;
  color: #828c94;
}

.${prototypeId}__title {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.4px;
  color: #2f3438;
  font-weight: 600;
}

.${prototypeId}__copy {
  margin: 12px 0 0;
  max-width: 260px;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.3px;
  color: #828c94;
}

@media (max-width: 420px) {
  .${prototypeId}--full {
    padding-inline: 0;
  }
}
`

const indexSource = `export { default } from './${componentName}'
`

async function updateRegistry() {
  const current = await fs.readFile(registryPath, 'utf8')
  const importLine = `import ${componentName} from '../prototypes/${prototypeId}/${componentName}'`

  if (current.includes(importLine) || current.includes(`id: '${prototypeId}'`)) {
    throw new Error(`Prototype "${prototypeId}" is already registered.`)
  }

  const withImport = current.replace(
    /(^import .*?\n)(?=import|type PrototypeRendererProps)/m,
    `$1${importLine}\n`,
  )

  const entry = `  {\n    id: '${prototypeId}',\n    title: '${title}',\n    description: 'Starter scaffold for ${title}.',\n    status: 'Scaffold',\n    screens: ['Intro'],\n    Component: ${componentName},\n  },\n`

  const updated = withImport.replace(
    /export const prototypeRegistry: PrototypeDefinition\[] = \[\n/,
    (match) => `${match}${entry}`,
  )

  await fs.writeFile(registryPath, updated, 'utf8')
}

async function main() {
  try {
    await fs.access(prototypeDir)
    console.error(`Prototype directory already exists: ${prototypeDir}`)
    process.exit(1)
  } catch {
    // expected when scaffold is new
  }

  await fs.mkdir(prototypeDir, { recursive: true })
  await fs.writeFile(componentPath, componentSource, 'utf8')
  await fs.writeFile(cssPath, cssSource, 'utf8')
  await fs.writeFile(indexPath, indexSource, 'utf8')
  await updateRegistry()

  console.log(`Created prototype scaffold: ${prototypeId}`)
  console.log(`Component: src/prototypes/${prototypeId}/${componentName}.tsx`)
  console.log(`Registered in: src/app/prototype-registry.ts`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
