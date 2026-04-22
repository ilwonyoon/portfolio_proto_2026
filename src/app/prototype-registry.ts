import type { ComponentType } from 'react'
import OldHomeFeedPrototype from '../prototypes/old-home-feed/OldHomeFeedPrototype'
import PersonalizedFeedPrototype from '../prototypes/personalized-feed/PersonalizedFeedPrototype'
import PersonalizedDiscoverFeedPrototype from '../prototypes/personalized-discover-feed'
import Portfolio2026Prototype from '../prototypes/portfolio-2026/Portfolio2026Prototype'
import { interestProfilingScript } from '../prototypes/portfolio-2026/interest-profiling-script'
import CreatorOnboardingPrototype from '../prototypes/creator-onboarding'
import CreatorProfileContentPrototype from '../prototypes/creator-profile-content'
import CreatorProgramDashboardPrototype from '../prototypes/creator-program-dashboard'
import UploadPrototype from '../prototypes/upload'
import type { LiquidGlassCursorScript } from '../system/overlays'

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
  previewModes?: {
    live?: {
      label?: string
    }
    scripted?: {
      label?: string
      script: LiquidGlassCursorScript
    }
  }
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
    id: 'personalized-discover-feed',
    title: 'Personalized discover',
    description: 'Discover tab grid experience for the personalized feed.',
    status: 'Figma recreation',
    screens: ['Discover'],
    Component: PersonalizedDiscoverFeedPrototype,
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
    previewModes: {
      live: { label: 'Live' },
      scripted: {
        label: 'Scripted',
        script: interestProfilingScript,
      },
    },
  },
  {
    id: 'creator-onboarding',
    title: 'Creator onboarding',
    description: 'My Page creator onboarding preview from the Figma frame.',
    status: 'Figma recreation',
    screens: ['My Page'],
    Component: CreatorOnboardingPrototype,
  },
  {
    id: 'creator-profile-content',
    title: 'Creator profile content',
    description: 'Creator My Page state with published content and dashboard access.',
    status: 'Figma recreation',
    screens: ['My Page'],
    Component: CreatorProfileContentPrototype,
  },
  {
    id: 'creator-program-dashboard',
    title: 'Creator program dashboard',
    description: 'Creator dashboard Program tab preview from the Figma frame.',
    status: 'Figma recreation',
    screens: ['Program'],
    Component: CreatorProgramDashboardPrototype,
  },
  {
    id: 'upload',
    title: 'Upload',
    description: 'Product tag upload flow with reusable mobile sheet patterns.',
    status: 'Figma recreation',
    screens: ['Add product tag'],
    Component: UploadPrototype,
  },
]
