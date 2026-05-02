// Wallpaper / flooring catalog used by the Apply Materials bottom sheet.
// Imagery and prices are illustrative — pulled from existing public/assets
// figma exports so we don't need new files. Prices use ohou.se's
// per-pyeong (3.3㎡) convention since these are construction materials.

export type ConstructionMaterialCategory = 'wallpaper' | 'flooring'

export type ConstructionMaterial = {
  id: string
  name: string
  brand: string
  pricePerPyeong: string
  imageSrc: string
  category: ConstructionMaterialCategory
}

export const constructionMaterialCategories: Array<{
  id: ConstructionMaterialCategory
  label: string
}> = [
  { id: 'wallpaper', label: 'Wallpaper' },
  { id: 'flooring', label: 'Flooring' },
]

const portfolioRoot = '/assets/figma/construction-ai/portfolio'

export const constructionMaterials: ConstructionMaterial[] = [
  // Wallpaper
  {
    id: 'wp-warm-linen',
    name: 'Warm Linen Texture',
    brand: 'LG Z:IN',
    pricePerPyeong: '₩28,000/py',
    imageSrc: `${portfolioRoot}/photos/photo-04.avif`,
    category: 'wallpaper',
  },
  {
    id: 'wp-soft-grey',
    name: 'Soft Grey Solid',
    brand: 'Hyundai L&C',
    pricePerPyeong: '₩32,000/py',
    imageSrc: `${portfolioRoot}/photos/photo-06.avif`,
    category: 'wallpaper',
  },
  {
    id: 'wp-cream-textured',
    name: 'Cream Textured Pattern',
    brand: 'KCC',
    pricePerPyeong: '₩35,000/py',
    imageSrc: `${portfolioRoot}/photos/photo-08.avif`,
    category: 'wallpaper',
  },
  {
    id: 'wp-natural-beige',
    name: 'Natural Beige Weave',
    brand: 'Shinhan Wallcoverings',
    pricePerPyeong: '₩42,000/py',
    imageSrc: `${portfolioRoot}/photos/photo-09.avif`,
    category: 'wallpaper',
  },
  {
    id: 'wp-warm-white',
    name: 'Warm White Subtle Stripe',
    brand: 'LG Z:IN',
    pricePerPyeong: '₩26,000/py',
    imageSrc: `${portfolioRoot}/photos/photo-12.avif`,
    category: 'wallpaper',
  },
  {
    id: 'wp-mocha',
    name: 'Mocha Smooth Finish',
    brand: 'Hyundai L&C',
    pricePerPyeong: '₩38,000/py',
    imageSrc: `${portfolioRoot}/photos/photo-13.avif`,
    category: 'wallpaper',
  },
  {
    id: 'wp-sand',
    name: 'Sand Pebble Pattern',
    brand: 'Daerim Wallcovering',
    pricePerPyeong: '₩45,000/py',
    imageSrc: `${portfolioRoot}/photos/photo-15.avif`,
    category: 'wallpaper',
  },
  {
    id: 'wp-paper-white',
    name: 'Paper White Plain',
    brand: 'KCC',
    pricePerPyeong: '₩22,000/py',
    imageSrc: `${portfolioRoot}/photos/photo-17.avif`,
    category: 'wallpaper',
  },
  // Flooring
  {
    id: 'fl-oak-natural',
    name: 'Oak Natural Engineered',
    brand: 'Dongwha Easyfloor',
    pricePerPyeong: '₩185,000/py',
    imageSrc: `${portfolioRoot}/case-01/photo-08.jpg`,
    category: 'flooring',
  },
  {
    id: 'fl-walnut',
    name: 'Walnut Smoked Plank',
    brand: 'LG Z:IN Hausys',
    pricePerPyeong: '₩240,000/py',
    imageSrc: `${portfolioRoot}/case-02/photo-12.jpg`,
    category: 'flooring',
  },
  {
    id: 'fl-warm-grey',
    name: 'Warm Grey Laminate',
    brand: 'Hyundai L&C',
    pricePerPyeong: '₩140,000/py',
    imageSrc: `${portfolioRoot}/case-03/photo-09.jpg`,
    category: 'flooring',
  },
  {
    id: 'fl-light-ash',
    name: 'Light Ash Wide Plank',
    brand: 'Green Hardwood',
    pricePerPyeong: '₩175,000/py',
    imageSrc: `${portfolioRoot}/case-04/photo-10.jpg`,
    category: 'flooring',
  },
  {
    id: 'fl-honey-pine',
    name: 'Honey Pine Vinyl',
    brand: 'Nokchawon',
    pricePerPyeong: '₩95,000/py',
    imageSrc: `${portfolioRoot}/case-01/photo-15.jpg`,
    category: 'flooring',
  },
  {
    id: 'fl-charcoal',
    name: 'Charcoal Stone-Look Tile',
    brand: 'KCC Glas',
    pricePerPyeong: '₩220,000/py',
    imageSrc: `${portfolioRoot}/case-02/photo-04.jpg`,
    category: 'flooring',
  },
  {
    id: 'fl-cream-marble',
    name: 'Cream Marble Porcelain',
    brand: 'Yikoo Living',
    pricePerPyeong: '₩310,000/py',
    imageSrc: `${portfolioRoot}/case-03/photo-04.jpg`,
    category: 'flooring',
  },
  {
    id: 'fl-bleached-oak',
    name: 'Bleached Oak SPC',
    brand: 'Dongwha Easyfloor',
    pricePerPyeong: '₩158,000/py',
    imageSrc: `${portfolioRoot}/case-04/photo-19.jpg`,
    category: 'flooring',
  },
]
