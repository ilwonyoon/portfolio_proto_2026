export type ScrollPhysicsConfig = {
  friction: number
  maxVelocity: number
  minVelocity: number
  wheelGain: number
}

export type ScrollPhysicsPresetName =
  | 'ios-feed'
  | 'ios-detail'
  | 'ios-dashboard'
  | 'ios-pdp'

export const scrollPhysicsPresets: Record<
  ScrollPhysicsPresetName,
  ScrollPhysicsConfig
> = {
  'ios-feed': {
    friction: 0.92,
    maxVelocity: 34,
    minVelocity: 0.2,
    wheelGain: 0.18,
  },
  'ios-detail': {
    friction: 0.935,
    maxVelocity: 26,
    minVelocity: 0.16,
    wheelGain: 0.12,
  },
  'ios-dashboard': {
    friction: 0.93,
    maxVelocity: 22,
    minVelocity: 0.16,
    wheelGain: 0.12,
  },
  'ios-pdp': {
    friction: 0.925,
    maxVelocity: 24,
    minVelocity: 0.18,
    wheelGain: 0.14,
  },
}

export function resolveScrollPhysicsConfig(
  preset: ScrollPhysicsPresetName = 'ios-feed',
  overrides?: Partial<ScrollPhysicsConfig>,
): ScrollPhysicsConfig {
  return {
    ...scrollPhysicsPresets[preset],
    ...overrides,
  }
}
