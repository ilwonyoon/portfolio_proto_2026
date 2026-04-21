import type { ComponentType } from 'react'
import OldHomeFeedPrototype from '../prototypes/old-home-feed/OldHomeFeedPrototype'
import PersonalizedFeedPrototype from '../prototypes/personalized-feed/PersonalizedFeedPrototype'
import Portfolio2026Prototype from '../prototypes/portfolio-2026/Portfolio2026Prototype'
import CreatorOnboardingPrototype from '../prototypes/creator-onboarding'

type PrototypeRendererProps = {
  mode?: 'full' | 'thumbnail'
}

export type PrototypeDefinition = {
  id: string
  title: string
  description: string
  status: string
  screens: string[]
  Component: ComponentType<PrototypeRendererProps>
}

export const prototypeRegistry: PrototypeDefinition[] = [
  {
    id: 'old-home-feed',
    title: 'Old home feed',
    description: 'Previous Ohouse home feed shell prototype.',
    status: 'Active build',
    screens: ['Home'],
    Component: OldHomeFeedPrototype,
  },
  {
    id: 'personalized-feed',
    title: 'Personalized feed',
    description: 'Starter scaffold for Personalized feed.',
    status: 'Scaffold',
    screens: ['Intro'],
    Component: PersonalizedFeedPrototype,
  },
  {
    id: 'portfolio-2026',
    title: 'Interest profiling',
    description:
      'Ohouse onboarding and recommendation flow prototype based on Figma-driven assets.',
    status: 'Active build',
    screens: [
      'Onboarding',
      'Home Type',
      'Living With',
      'Final Preferences',
      'Recommendations',
    ],
    Component: Portfolio2026Prototype,
  },
  {
    id: 'creator-onboarding',
    title: 'Creator onboarding',
    description: 'My Page creator onboarding preview from the Figma frame.',
    status: 'Figma recreation',
    screens: ['My Page'],
    Component: CreatorOnboardingPrototype,
  },
]
