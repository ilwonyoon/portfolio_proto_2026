import type { HomeTourGridSectionItem } from '../../system/feed'

export type OldHomeFeedGridSection = {
  id: string
  title: string
  items: HomeTourGridSectionItem[]
  viewMoreLabel?: string
}

export const oldHomeFeedGridSections: OldHomeFeedGridSection[] = [
  {
    id: 'home-tour-for-you',
    title: 'Home tour for you',
    items: [
      {
        id: 'home-tour-1',
        imageSrc: '/assets/figma/old-home-feed/home-tour-grid/tour-1.png',
        imageAlt: 'Home tour featuring plants and a moss arrangement',
        title: '🪴바쁜 현대인의삶! 관리가 필요없는 식물과 이끼 식...',
      },
      {
        id: 'home-tour-2',
        imageSrc: '/assets/figma/old-home-feed/home-tour-grid/tour-2.png',
        imageAlt: 'Vintage home tour with an oriental mood',
        title: '동양적인 감각을 더해, 깊이 있게 정리한 빈티지 하우스',
      },
      {
        id: 'home-tour-3',
        imageSrc: '/assets/figma/old-home-feed/home-tour-grid/tour-3.png',
        imageAlt: 'Hotel lounge inspired apartment home tour',
        title: '감각에 실용을 더한, 호텔 라운지 무드의 34평 보금자리',
      },
      {
        id: 'home-tour-4',
        imageSrc: '/assets/figma/old-home-feed/home-tour-grid/tour-4.png',
        imageAlt: 'Neutral-tone apartment home tour',
        title: '콘셉트 따라 매일 다양하게 변신하는 33평 뉴트롤톤 아파트',
      },
    ],
  },
  {
    id: 'you-might-like-this',
    title: 'You might like this',
    items: [
      {
        id: 'you-might-like-1',
        imageSrc: '/assets/figma/old-home-feed/content-grid/you-might-like-1.png',
        imageAlt: 'Affordable Ikea lifestyle product recommendations',
        title: '1만원 이하 가성비가 내린다 🌧️이케아 살림템 추천 9',
      },
      {
        id: 'you-might-like-2',
        imageSrc: '/assets/figma/old-home-feed/content-grid/you-might-like-2.png',
        imageAlt: 'Cutlery recommendations by brand and material',
        title: '활용도 만점! 브랜드 & 소재별 커트러리 6종 추천🍴',
      },
      {
        id: 'you-might-like-3',
        imageSrc: '/assets/figma/old-home-feed/content-grid/you-might-like-3.png',
        imageAlt: 'Housewarming gift recommendations for moving season',
        title: '이사 시즌 🏡 3~10만 원대 힙한 집들이 선물 추천 6',
      },
      {
        id: 'you-might-like-4',
        imageSrc: '/assets/figma/old-home-feed/content-grid/you-might-like-4.png',
        imageAlt: 'Housewarming gift ideas recommended by newlyweds',
        title: '신혼부부가 추천하는! 가격대별 집들이 선물 BEST 5',
      },
    ],
  },
  {
    id: 'white-tone-collection',
    title: 'White tone collection.zip 🤍',
    viewMoreLabel: 'View more',
    items: [
      {
        id: 'white-tone-1',
        imageSrc: '/assets/figma/old-home-feed/content-grid/white-tone-1.png',
        imageAlt: 'Modern white newlywed home tour',
        title: '좋아하는 컬러로 맞춘 모던 앤 화이트, 우리만의 신혼집',
      },
      {
        id: 'white-tone-2',
        imageSrc: '/assets/figma/old-home-feed/content-grid/white-tone-2.png',
        imageAlt: 'Bright modern 28-pyeong white home',
        title: '화이트 크리스마스 그 자체! 눈부신 28평 모던 하우스',
      },
      {
        id: 'white-tone-3',
        imageSrc: '/assets/figma/old-home-feed/content-grid/white-tone-3.png',
        imageAlt: '17-pyeong newlywed home balancing design and function',
        title: '17평 구축의 기적, 디자인과 실용성을 모두 채운 신혼집',
      },
      {
        id: 'white-tone-4',
        imageSrc: '/assets/figma/old-home-feed/content-grid/white-tone-4.png',
        imageAlt: 'Renovated home with original cherry molding and old windows',
        title: '구축, 체리 몰딩, 오래된 단창. 괜찮아 싹 바꿀 거니까!',
      },
    ],
  },
  {
    id: 'weekly-best',
    title: '🏅Weekly Best🏅',
    viewMoreLabel: 'View more',
    items: [
      {
        id: 'weekly-best-1',
        imageSrc: '/assets/figma/old-home-feed/content-grid/weekly-best-1.png',
        imageAlt: 'Creative trash bag storage ideas',
        title: '이렇게 기발한 방법이?👀 쓰레기 봉투 정리법 4가지',
      },
      {
        id: 'weekly-best-2',
        imageSrc: '/assets/figma/old-home-feed/content-grid/weekly-best-2.png',
        imageAlt: 'Housewarming gift picks for moving season',
        title: '이사 시즌 🏡 3~10만 원대 힙한 집들이 선물 추천 6',
      },
      {
        id: 'weekly-best-3',
        imageSrc: '/assets/figma/old-home-feed/content-grid/weekly-best-3.png',
        imageAlt: 'Unique home styling item roundup',
        title: '시중에 찾기 힘든 유니크하고 멋진 홈스타일링 아이템10',
      },
      {
        id: 'weekly-best-4',
        imageSrc: '/assets/figma/old-home-feed/content-grid/weekly-best-4.png',
        imageAlt: 'Living organization items that make a home look polished',
        title: '집 좀 꾸미네! 칭찬 듣는👀 정리정돈 리빙 잇템 8',
      },
    ],
  },
]
