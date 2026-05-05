import { lazy, type ComponentType } from 'react'
import { interestProfilingScript } from '../prototypes/portfolio-2026/interest-profiling-script'
import type { LiquidGlassCursorScript } from '../system/overlays'

const OldHomeFeedPrototype = lazy(() => import('../prototypes/old-home-feed/OldHomeFeedPrototype'))
const PersonalizedFeedPrototype = lazy(() => import('../prototypes/personalized-feed/PersonalizedFeedPrototype'))
const PersonalizedDiscoverFeedPrototype = lazy(() => import('../prototypes/personalized-discover-feed'))
const Portfolio2026Prototype = lazy(() => import('../prototypes/portfolio-2026/Portfolio2026Prototype'))
const CreatorOnboardingPrototype = lazy(() => import('../prototypes/creator-onboarding'))
const CreatorProfileContentPrototype = lazy(() => import('../prototypes/creator-profile-content'))
const CreatorProgramDashboardPrototype = lazy(() => import('../prototypes/creator-program-dashboard'))
const AiRoomFlowPrototype = lazy(() => import('../prototypes/ai-room-flow'))
const ConstructionAiPrototype = lazy(() => import('../prototypes/construction-ai'))
const ContentStyleTransferPrototype = lazy(() => import('../prototypes/content-style-transfer'))
const PdpPrototype = lazy(() => import('../prototypes/pdp'))
const UploadPrototype = lazy(() => import('../prototypes/upload'))

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
  {
    id: 'pdp',
    title: 'PDP',
    description: 'Product detail page prototype for the Cuba Chair PDP frame.',
    status: 'Figma recreation',
    screens: ['Product detail'],
    Component: PdpPrototype,
  },
  {
    id: 'ai-room-flow',
    title: 'AI room flow',
    description: 'Reusable AI room selection, placement, rendering, and result flow.',
    status: 'Shared flow',
    screens: ['Photo picker', 'Placement', 'Rendering', 'Result'],
    Component: AiRoomFlowPrototype,
  },
  {
    id: 'construction-ai',
    title: 'Construction AI',
    description: 'Contractor entry point connected to the reusable AI room flow.',
    status: 'Active build',
    screens: ['Pros', 'Project photo', 'AI room flow'],
    Component: ConstructionAiPrototype,
  },
  {
    id: 'content-style-transfer',
    title: 'Content style transfer',
    description: 'Personalized feed shell with a Try-in-your-room CTA on user uploaded posts.',
    status: 'Scaffold',
    screens: ['Feed'],
    Component: ContentStyleTransferPrototype,
  },
]
