import type { BottomNavItem } from './BottomNavBar'
import type { HomeSearchNavProps } from './HomeSearchNav'

export const sharedPersonalizedHomeSearchNav: HomeSearchNavProps = {
  menuIcon: {
    label: 'Open menu',
    src: '/assets/figma/personalized-feed/menu.svg',
    width: 20.8,
    height: 14.9,
  },
  searchIcon: {
    label: 'Search',
    src: '/assets/figma/personalized-feed/search.svg',
    width: 15.05,
    height: 15.48,
  },
  actions: [
    {
      label: 'Notifications',
      src: '/assets/figma/personalized-feed/notification.svg',
      width: 18.2,
      height: 20.18,
    },
    {
      label: 'Bookmarks',
      src: '/assets/figma/personalized-feed/bookmark.svg',
      width: 16,
      height: 19.39,
    },
    {
      label: 'Cart',
      src: '/assets/figma/personalized-feed/cart.svg',
      width: 22.72,
      height: 20.6,
    },
  ],
  placeholder: 'Search anything',
}

export const sharedPersonalizedBottomNavItems: BottomNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    iconSrc: '/assets/figma/personalized-feed/home-filled.svg',
    iconWidth: 24,
    iconHeight: 24,
  },
  {
    id: 'community',
    label: 'Community',
    iconSrc: '/assets/figma/personalized-feed/community.svg',
    iconWidth: 24,
    iconHeight: 24,
  },
  {
    id: 'shopping',
    label: 'Shopping',
    iconSrc: '/assets/figma/personalized-feed/shopping.svg',
    iconWidth: 24,
    iconHeight: 24,
  },
  {
    id: 'interior',
    label: 'Interior',
    iconSrc: '/assets/figma/personalized-feed/interior.svg',
    iconWidth: 21.8,
    iconHeight: 20.19,
  },
  {
    id: 'my-page',
    label: 'My Page',
    iconSrc: '/assets/figma/personalized-feed/profile.svg',
    iconWidth: 17.37,
    iconHeight: 19.8,
  },
]
