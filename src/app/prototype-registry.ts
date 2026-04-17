import type { ComponentType } from 'react'
import Portfolio2026Prototype from '../prototypes/portfolio-2026/Portfolio2026Prototype'

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
]
