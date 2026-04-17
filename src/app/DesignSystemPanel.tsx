import { ProgressBar } from '../system/mobile/ProgressBar'
import { HomeIndicator } from '../system/mobile/HomeIndicator'
import { Button } from '../system/primitives/Button'
import { Chip } from '../system/primitives/Chip'
import { colors } from '../system/tokens'

const colorEntries = [
  ['Brand', colors.brand],
  ['Surface', colors.surface],
  ['Selected', colors.surfaceSelected],
  ['Text', colors.textPrimary],
  ['Muted', colors.textSecondary],
] as const

export function DesignSystemPanel() {
  return (
    <section className="design-system-panel" aria-label="Design system tokens and components">
      <div className="design-system-panel__section">
        <p className="design-system-panel__label">Design system</p>
        <p className="design-system-panel__copy">
          Shared tokens and reusable primitives for future prototypes.
        </p>
      </div>

      <div className="design-system-panel__section">
        <p className="design-system-panel__subhead">Tokens</p>
        <div className="token-swatches">
          {colorEntries.map(([label, value]) => (
            <div key={label} className="token-swatches__item">
              <span
                className="token-swatches__chip"
                style={{ background: value }}
                aria-hidden="true"
              />
              <span className="token-swatches__meta">
                <span>{label}</span>
                <span>{value}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="token-type">
          <div className="token-type__line token-type__line--heading">
            Heading 20 / 28 / -0.3
          </div>
          <div className="token-type__line token-type__line--body">
            Body 16 / 24 / -0.3
          </div>
          <div className="token-type__line token-type__line--chip">
            Chip 14 / 18 / -0.3
          </div>
        </div>
      </div>

      <div className="design-system-panel__section">
        <p className="design-system-panel__subhead">Components</p>
        <div className="design-system-preview">
          <div className="design-system-preview__row">
            <Chip>Default chip</Chip>
            <Chip selected>Selected chip</Chip>
          </div>
          <div className="design-system-preview__row">
            <Button enabled>Primary CTA</Button>
          </div>
          <div className="design-system-preview__row">
            <ProgressBar fillClassName="design-system-preview__progress-fill" />
          </div>
          <div className="design-system-preview__surface">
            <HomeIndicator />
          </div>
        </div>
      </div>
    </section>
  )
}
