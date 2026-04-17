import type { ComponentProps } from 'react'
import { FeedCard } from '../../system/feed'

export const personalizedFeedProductSheetTitle = 'In this photo 24'

export const personalizedFeedCardData: ComponentProps<typeof FeedCard> = {
  header: {
    avatarSrc: '/assets/figma/personalized-feed/feed-card/avatar.png',
    name: 'H.House',
    subtitle: 'Cultivating today',
    actionLabel: 'Follow',
  },
  media: {
    slides: [
      {
        id: 'studio-1',
        src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
        alt: 'Bright studio with a woven chair, side table, and cabinet.',
        tags: [
          { id: 'tag-chair', productId: 'cuba-chair', left: 81, top: 181 },
          { id: 'tag-side-table', productId: 'panthella-floor-lamp', left: 161, top: 271 },
          { id: 'tag-cabinet', productId: 'arezzo-sideboard', left: 302, top: 91 },
        ],
      },
      {
        id: 'studio-2',
        src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
        alt: 'Bright studio angle focused on the lounge chair and window.',
        tags: [
          { id: 'tag-chair-2', productId: 'cuba-chair', left: 111, top: 214 },
          { id: 'tag-table-2', productId: 'round-dining-table', left: 193, top: 262 },
        ],
      },
      {
        id: 'studio-3',
        src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
        alt: 'Studio detail focusing on the cabinet and art styling.',
        tags: [
          { id: 'tag-art-3', productId: 'drifting-clouds-mobile', left: 244, top: 118 },
          { id: 'tag-cabinet-3', productId: 'arezzo-sideboard', left: 296, top: 166 },
        ],
      },
      {
        id: 'studio-4',
        src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
        alt: 'Studio scene showing furniture styling details.',
        tags: [
          { id: 'tag-chair-4', productId: 'cuba-chair', left: 96, top: 208 },
          { id: 'tag-pillow-4', productId: 'nesino-floor-stand-lamp', left: 286, top: 152 },
        ],
      },
      {
        id: 'studio-5',
        src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
        alt: 'Studio view highlighting the lounge chair and side table.',
        tags: [
          { id: 'tag-chair-5', productId: 'cuba-chair', left: 88, top: 178 },
          { id: 'tag-table-5', productId: 'panthella-floor-lamp', left: 162, top: 270 },
        ],
      },
      {
        id: 'studio-6',
        src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
        alt: 'Studio composition showing seating and soft daylight.',
        tags: [
          { id: 'tag-chair-6', productId: 'cuba-chair', left: 112, top: 214 },
          { id: 'tag-plant-6', productId: 'drifting-clouds-mobile', left: 286, top: 120 },
        ],
      },
      {
        id: 'studio-7',
        src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
        alt: 'Studio composition featuring art, cabinet, and table styling.',
        tags: [
          { id: 'tag-art-7', productId: 'drifting-clouds-mobile', left: 244, top: 118 },
          { id: 'tag-cabinet-7', productId: 'arezzo-sideboard', left: 302, top: 91 },
        ],
      },
      {
        id: 'studio-8',
        src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
        alt: 'Studio angle focused on chair, lamp, and cabinet details.',
        tags: [
          { id: 'tag-chair-8', productId: 'cuba-chair', left: 98, top: 206 },
          { id: 'tag-cabinet-8', productId: 'arezzo-sideboard', left: 288, top: 152 },
        ],
      },
      {
        id: 'studio-9',
        src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
        alt: 'Studio shot with framed artwork and product callouts.',
        tags: [
          { id: 'tag-frame-9', productId: 'drifting-clouds-mobile', left: 244, top: 118 },
          { id: 'tag-side-table-9', productId: 'panthella-floor-lamp', left: 161, top: 271 },
        ],
      },
      {
        id: 'studio-10',
        src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
        alt: 'Studio shot for carousel testing with highlighted furniture.',
        tags: [
          { id: 'tag-chair-10', productId: 'cuba-chair', left: 111, top: 214 },
          { id: 'tag-pillow-10', productId: 'nesino-floor-stand-lamp', left: 286, top: 152 },
        ],
      },
    ],
  },
  products: {
    catalog: [
      {
        id: 'panthella-floor-lamp',
        thumbnailSrc: '/assets/figma/personalized-feed/view-more/product-sheet-1.png',
        thumbnailAlt: 'Louis Poulsen Panthella Floor Lamp',
        name: 'Louis Poulsen Panthella Floor Lamp',
        priceLabel: '139,000',
        thumbnailRadius: 6,
      },
      {
        id: 'cuba-chair',
        thumbnailSrc: '/assets/figma/personalized-feed/view-more/product-sheet-2.png',
        thumbnailAlt: "Carl Hansen & Søn MG501 Cuba Chair",
        name: "Carl Hansen & Søn MG501 Cuba Chair",
        discountLabel: '25%',
        priceLabel: '1,140,000',
        thumbnailRadius: 6,
      },
      {
        id: 'round-dining-table',
        thumbnailSrc: '/assets/figma/personalized-feed/view-more/product-sheet-3.png',
        thumbnailAlt: 'ROUND DINING TABLE - CERAMIC',
        name: 'ROUND DINING TABLE - CERAMIC',
        priceLabel: '271,000',
        thumbnailRadius: 6,
      },
      {
        id: 'arezzo-sideboard',
        thumbnailSrc: '/assets/figma/personalized-feed/view-more/product-sheet-4.png',
        thumbnailAlt: 'Arezzo Sideboard Slide Storage 1600/1800',
        name: 'Arezzo Sideboard Slide Storage 1600/1800',
        discountLabel: '4%',
        priceLabel: '709,000',
        thumbnailRadius: 4,
      },
      {
        id: 'drifting-clouds-mobile',
        thumbnailSrc: '/assets/figma/personalized-feed/view-more/product-sheet-5.png',
        thumbnailAlt: 'FLENSTED MOBILES - Drifting Clouds',
        name: 'FLENSTED MOBILES - Drifting Clouds',
        discountLabel: '12%',
        priceLabel: '172,050',
        thumbnailRadius: 4,
      },
      {
        id: 'nesino-floor-stand-lamp',
        thumbnailSrc: '/assets/figma/personalized-feed/view-more/product-sheet-6.png',
        thumbnailAlt: 'Official Importer_Nesino Floor Stand Table Lamp 7 Color',
        name: 'Official Importer_Nesino Floor Stand Table Lamp 7 Color',
        discountLabel: '28%',
        priceLabel: '211,900',
        thumbnailRadius: 4,
      },
    ],
    previewProductIds: [
      'panthella-floor-lamp',
      'cuba-chair',
      'round-dining-table',
      'arezzo-sideboard',
    ],
  },
  reactions: {
    metrics: [
      {
        id: 'Like',
        iconSrc: '/assets/figma/personalized-feed/reaction-bar/heart-24.svg',
        iconWidth: 20.8,
        iconHeight: 17.8946,
        count: 175,
      },
      {
        id: 'Comment',
        iconSrc: '/assets/figma/personalized-feed/reaction-bar/comment-24.svg',
        iconWidth: 19.5,
        iconHeight: 19.4371,
        count: 14,
      },
      {
        id: 'Share',
        iconSrc: '/assets/figma/personalized-feed/reaction-bar/export-24.svg',
        iconWidth: 17.8,
        iconHeight: 19.2395,
        count: 12,
      },
    ],
    saveIconSrc: '/assets/figma/personalized-feed/reaction-bar/scrap-24.svg',
    saveIconWidth: 16,
    saveIconHeight: 19.3975,
    saveCount: 868,
  },
  comments: {
    description:
      'This is my favorite piece of furniture in the studio. I place my plants on it and store my plant care essentials here.',
    commentCount: 14,
    items: [
      {
        id: 'comment-1',
        author: 'minironi_home',
        body:
          'storage cabinet is so stylish. It blends well with the accessories too. The postcards are cute as well :)',
      },
      {
        id: 'comment-2',
        author: 'docbshakcn',
        body:
          'The boardroom is so beautiful; it seems like the atmosphere is everything.',
      },
    ],
  },
}
