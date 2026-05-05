// Real Ohouse construction materials, scraped from o2o.ohou.se ranking
// pages and saved under public/assets/figma/construction-ai/materials/<slug>/.
// Each category has a data.json with brand/title/price; we keep the
// Korean filenames (matching imageFile in the JSON) so the assets line
// up 1:1 with the source data.

export type ConstructionMaterialCategory =
  | 'floor'
  | 'wallpaper'
  | 'sheet-film'
  | 'tile'
  | 'ceramic'
  | 'faucet'
  | 'switch'

export const constructionMaterialCategories: Array<{
  id: ConstructionMaterialCategory
  label: string
}> = [
  { id: 'wallpaper', label: 'Wallpaper' },
  { id: 'floor', label: 'Floor' },
  { id: 'sheet-film', label: 'Sheet Film' },
  { id: 'tile', label: 'Tile' },
  { id: 'ceramic', label: 'Sanitary Ware' },
  { id: 'faucet', label: 'Faucet' },
  { id: 'switch', label: 'Switch & Outlet' },
]

export function getConstructionMaterialCategoryLabel(
  category: ConstructionMaterialCategory,
): string {
  return (
    constructionMaterialCategories.find((entry) => entry.id === category)
      ?.label ?? 'Material'
  )
}

// Surface-style materials (wall/floor finishes) get a different prompt vs.
// fixture-style materials (sinks, faucets, switches) so the placeholder
// matches what the user is actually doing.
const surfaceMaterialCategories: ReadonlySet<ConstructionMaterialCategory> =
  new Set(['wallpaper', 'floor', 'sheet-film', 'tile'])

export function isConstructionSurfaceMaterial(
  category: ConstructionMaterialCategory,
): boolean {
  return surfaceMaterialCategories.has(category)
}

export type ConstructionMaterial = {
  id: string
  name: string
  brand: string
  priceLabel: string
  imageSrc: string
  category: ConstructionMaterialCategory
}

type RawMaterialItem = {
  rank: number
  id: string
  brand: string
  title: string
  price: string | null
  imageFile: string
}

type RawCategoryData = {
  category: string
  items: RawMaterialItem[]
}

import hardwoodFloorData from './materials-json/hardwood-floor.json'
import vinylFloorData from './materials-json/vinyl-floor.json'
import wallpaperData from './materials-json/wallpaper.json'
import sheetFilmData from './materials-json/sheet-film.json'
import tileData from './materials-json/tile.json'
import ceramicData from './materials-json/ceramic.json'
import faucetData from './materials-json/faucet.json'
import switchData from './materials-json/switch.json'

const materialsRoot = '/assets/figma/construction-ai/materials'

type RawSourceCategory =
  | 'hardwood-floor'
  | 'vinyl-floor'
  | 'wallpaper'
  | 'sheet-film'
  | 'tile'
  | 'ceramic'
  | 'faucet'
  | 'switch'

const rawByCategory: Record<RawSourceCategory, RawCategoryData> = {
  'hardwood-floor': hardwoodFloorData as RawCategoryData,
  'vinyl-floor': vinylFloorData as RawCategoryData,
  wallpaper: wallpaperData as RawCategoryData,
  'sheet-film': sheetFilmData as RawCategoryData,
  tile: tileData as RawCategoryData,
  ceramic: ceramicData as RawCategoryData,
  faucet: faucetData as RawCategoryData,
  switch: switchData as RawCategoryData,
}

const sourceToTargetCategory: Record<
  RawSourceCategory,
  ConstructionMaterialCategory
> = {
  'hardwood-floor': 'floor',
  'vinyl-floor': 'floor',
  wallpaper: 'wallpaper',
  'sheet-film': 'sheet-film',
  tile: 'tile',
  ceramic: 'ceramic',
  faucet: 'faucet',
  switch: 'switch',
}

// Map common Korean product/spec/finish words to natural English so we
// can show product names in English without losing meaning.
const koreanToEnglish: Array<[RegExp, string]> = [
  [/마루/g, 'Floor'],
  [/장판/g, 'Vinyl Sheet'],
  [/벽지/g, 'Wallpaper'],
  [/시트필름|시트지/g, 'Adhesive Film'],
  [/타일/g, 'Tile'],
  [/도기/g, 'Ware'],
  [/세면대/g, 'Basin'],
  [/양변기/g, 'Toilet'],
  [/비데일체형/g, 'Bidet Combo'],
  [/수전/g, 'Faucet'],
  [/주방수전/g, 'Kitchen Faucet'],
  [/세면수전/g, 'Basin Faucet'],
  [/싱크대/g, 'Sink'],
  [/욕조수전/g, 'Tub Faucet'],
  [/벽매립수전/g, 'Wall-Mount Faucet'],
  [/벽매립/g, 'Wall-Mount'],
  [/거위목수전/g, 'Gooseneck Faucet'],
  [/원홀/g, 'Single-Hole'],
  [/투홀/g, 'Two-Hole'],
  [/스위치/g, 'Switch'],
  [/콘센트/g, 'Outlet'],
  [/회로/g, '-Way'],
  [/구\b/g, '-Gang'],
  [/단로/g, 'Single-Pole'],
  [/45도/g, '45°'],
  [/220V/g, '220V'],
  [/플랫/g, 'Flat'],
  [/웨이브/g, 'Wave'],
  [/스탠리/g, 'Stanley'],
  [/오크/g, 'Oak'],
  [/오크내추럴/g, 'Natural Oak'],
  [/내추럴/g, 'Natural'],
  [/베이지/g, 'Beige'],
  [/화이트/g, 'White'],
  [/그레이/g, 'Grey'],
  [/블랑/g, 'Blanc'],
  [/사하라라이트/g, 'Sahara Light'],
  [/사하라/g, 'Sahara'],
  [/이모션라이트그레이/g, 'Emotion Light Grey'],
  [/이모션화이트/g, 'Emotion White'],
  [/이모션블랑/g, 'Emotion Blanc'],
  [/이모션/g, 'Emotion'],
  [/모로칸크림/g, 'Moroccan Cream'],
  [/콰이엇웨이브/g, 'Quiet Wave'],
  [/그랜드스테디/g, 'Grand Steady'],
  [/젠틀판타지/g, 'Gentle Fantasy'],
  [/젠/g, 'Zen'],
  [/그란데/g, 'Grande'],
  [/마뷸러스/g, 'Mabulous'],
  [/나투스진/g, 'Naturzine'],
  [/강마루/g, 'Hardened Floor'],
  [/텍스쳐|텍스처/g, 'Texture'],
  [/마테라/g, 'Matera'],
  [/무이네/g, 'Muine'],
  [/sb스톤/gi, 'SB Stone'],
  [/프레스티지/g, 'Prestige'],
  [/엑스컴포트/g, 'X Comfort'],
  [/지아자연애스페셜/g, 'Zia Nature Special'],
  [/지아자연애/g, 'Zia Nature'],
  [/지아사랑애/g, 'Zia Love'],
  [/스탠다드베인/g, 'Standard Vein'],
  [/텐더그레이/g, 'Tender Grey'],
  [/포세린/g, 'Porcelain'],
  [/스노우화이트/g, 'Snow White'],
  [/오닉스/g, 'Onyx'],
  [/클래식/g, 'Classic'],
  [/콘크리트라이트/g, 'Concrete Light'],
  [/콘크리트/g, 'Concrete'],
  [/화이트마블/g, 'White Marble'],
  [/마블/g, 'Marble'],
  [/헤리티지/g, 'Heritage'],
  [/애쉬/g, 'Ash'],
  [/브라운/g, 'Brown'],
  [/인피니티/g, 'Infinity'],
  [/로하스/g, 'LOHAS'],
  [/디아망/g, 'Diamant'],
  [/모던회벽/g, 'Modern Plaster'],
  [/회벽/g, 'Plaster'],
  [/스케치/g, 'Sketch'],
  [/조용한사색/g, 'Quiet Reflection'],
  [/방염테라피/g, 'Flameproof Therapy'],
  [/슈가/g, 'Sugar'],
  [/아트북/g, 'Artbook'],
  [/베스띠/g, 'Vesti'],
  [/테라코타/g, 'Terracotta'],
  [/에비뉴/g, 'Avenue'],
  [/테라피/g, 'Therapy'],
  [/세레나/g, 'Serena'],
  [/크림백색/g, 'Cream White'],
  [/중백색/g, 'Soft White'],
  [/도브화이트/g, 'Dove White'],
  [/스토리보드/g, 'Storyboard'],
  [/샌드링햄/g, 'Sandringham'],
  [/콘크리트화이트/g, 'Concrete White'],
  [/우드/g, 'Wood'],
  [/영림/g, 'Younglim'],
  [/하우스톤/g, 'Houstone'],
  [/스타일/g, 'Style'],
  [/베실리우스/g, 'Vesilius'],
  [/토도/g, 'Todo'],
  [/테라조/g, 'Terrazzo'],
  [/마시멜로우/g, 'Marshmallow'],
  [/어반테고/g, 'Urban Tego'],
  [/윤현상재/g, 'Yoonhyun'],
  [/웜세라믹/g, 'Warm Ceramic'],
  [/비앙코카라라/g, 'Bianco Carrara'],
  [/승원바스/g, 'Seungwon Bath'],
  [/슈티에싱크/g, 'Schtee Sink'],
  [/하프벽매립/g, 'Half Wall-Mount'],
  [/하프단/g, 'Half'],
  [/하프욕조/g, 'Half Tub'],
  [/무광스텐|무광스테인리스/g, 'Matte Stainless'],
  [/무광니켈/g, 'Matte Nickel'],
  [/랜디/g, 'Randy'],
  [/샤워욕조수전/g, 'Shower Tub Faucet'],
  [/엑셀/g, 'Excel'],
  [/디아트/g, 'Diart'],
  [/아펠라/g, 'Apella'],
  [/쿠세라/g, 'Cusera'],
  [/600x600|600X600|600 x 600/g, '600×600'],
  [/A타입/g, 'Type A'],
  [/B타입/g, 'Type B'],
  [/A형/g, 'A Type'],
  [/R/g, 'R'],
  [/S/g, 'S'],
]

const koreanBrandToEnglish: Record<string, string> = {
  '동화자연마루': 'Dongwha Natural Floor',
  '구정마루': 'Gujung Floor',
  '한솔홈데코': 'Hansol Home Deco',
  'LX하우시스': 'LX Hausys',
  '엘지하우시스': 'LG Hausys',
  '한화엘앤씨': 'Hanwha L&C',
  '현대엘앤씨': 'Hyundai L&C',
  '신한벽지': 'Shinhan Wallcovering',
  '대림벽지': 'Daerim Wallcovering',
  '개나리벽지': 'Gaenari Wallcovering',
  '에덴바이오벽지': 'Eden Bio Wallcovering',
  '서울벽지': 'Seoul Wallcovering',
  'KCC글라스': 'KCC Glass',
  '대림바스': 'Daerim Bath',
  '계림요업': 'Gyerim',
  '아메리칸스탠다드': 'American Standard',
  '대림': 'Daerim',
  '도비도스': 'Dobidos',
  '동성가구': 'Dongsung',
  '꼬임': 'Coim',
  '비비랜드': 'B&B Land',
  '자연나무': 'Natural Wood',
  '하우솔': 'Hausol',
  '한국지업사': 'Hanguk Jiup',
  '나투스': 'Natus',
  '베르티스': 'Bertis',
  '쿠세라': 'Cusera',
  '와토스': 'Watos',
  '디아트': 'Diart',
  '융코리아': 'Jung Korea',
  '르그랑': 'Legrand',
  '비테온': 'Viteon',
  '이지웰페어': 'Easy Welfare',
  '서울콘센트': 'Seoul Outlets',
}

function translateKorean(text: string): string {
  let out = text
  // brand-style words first to avoid mid-word collisions
  koreanToEnglish.forEach(([pattern, replacement]) => {
    out = out.replace(pattern, replacement)
  })
  // Strip remaining Korean characters that didn't match a rule.
  out = out.replace(/[ㄱ-힝]+/g, '').replace(/\s+/g, ' ').trim()
  // Tidy punctuation around removed Korean.
  out = out.replace(/\s+([,.])/g, '$1').replace(/\s*\/\s*/g, ' · ')
  return out
}

function cleanTitle(title: string) {
  // Drop the leading [Brand] tag and category breadcrumb (e.g. "/마루/").
  const withoutBrand = title.replace(/^\[[^\]]+\]\s*/, '')
  const englishish = translateKorean(withoutBrand)
  return englishish.replace(/^·\s*/, '').replace(/\s+/g, ' ').trim()
}

function translateBrand(brand: string) {
  return koreanBrandToEnglish[brand] ?? translateKorean(brand)
}

function formatPrice(price: string | null) {
  if (!price) return 'Inquire'
  const first = price.split('~')[0].trim()
  return `₩${first}`
}

export const constructionMaterials: ConstructionMaterial[] = (
  Object.keys(rawByCategory) as RawSourceCategory[]
).flatMap((sourceCategory) => {
  const data = rawByCategory[sourceCategory]
  const targetCategory = sourceToTargetCategory[sourceCategory]
  return data.items.map((item) => ({
    id: `${sourceCategory}-${item.id}`,
    name: cleanTitle(item.title),
    brand: translateBrand(item.brand),
    priceLabel: formatPrice(item.price),
    imageSrc: `${materialsRoot}/${sourceCategory}/${item.imageFile}`,
    category: targetCategory,
  }))
})
