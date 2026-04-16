import './App.css'
import { FigmaAsset } from './prototype/FigmaAsset'
import { PrototypeScreen } from './prototype/PrototypeScreen'

const screenHeight = 812

const reasons = [
  {
    label: 'Moving to a new place',
    icon: <FigmaIcon src="/assets/figma/portfolio-2026/onboarding/movingbox.svg" width={19.2} height={18.8} />,
  },
  {
    label: 'Planning a renovation',
    icon: <FigmaIcon src="/assets/figma/portfolio-2026/onboarding/tool.svg" width={16.16} height={20.78} />,
  },
  {
    label: 'Getting married soon',
    icon: <FigmaIcon src="/assets/figma/portfolio-2026/onboarding/heart.svg" width={20} height={17.6} />,
  },
  {
    label: 'Expecting a baby',
    icon: <BabyBottleIcon />,
  },
  {
    label: 'Looking for ideas',
    icon: <FigmaIcon src="/assets/figma/portfolio-2026/onboarding/ideas.svg" width={20.8} height={17.6} />,
  },
  {
    label: 'Shopping for home products',
    icon: <CartIcon />,
  },
] as const

function App() {
  return (
    <main className="app-shell">
      <PrototypeScreen contentHeight={screenHeight} variant="bare">
        <div className="onboarding-screen">
          <div className="status-bar">
            <div className="status-bar__time">9:41</div>
            <FigmaAsset
              src="/assets/figma/portfolio-2026/onboarding/status-levels.svg"
              alt=""
              displayWidth={68}
              displayHeight={50}
            />
          </div>

          <div className="top-nav">
            <button className="icon-button" type="button" aria-label="Close">
              <span className="icon-close" />
            </button>

            <div className="progress-bar" aria-hidden="true">
              <div className="progress-bar__value" />
            </div>
          </div>

          <header className="screen-header">
            <h1>Tell us what you&apos;re here for</h1>
            <p>Select all that apply.</p>
          </header>

          <section className="reason-list" aria-label="Onboarding reasons">
            {reasons.map((reason) => (
              <button key={reason.label} className="reason-card" type="button">
                <span className="reason-card__content">
                  {reason.icon}
                  <span className="reason-card__label">{reason.label}</span>
                </span>
                <span className="reason-card__checkbox" aria-hidden="true" />
              </button>
            ))}
          </section>

          <button className="info-row" type="button">
            <span className="info-row__content">
              <FigmaAsset
                src="/assets/figma/portfolio-2026/onboarding/info.svg"
                alt=""
                displayWidth={13.33}
                displayHeight={13.33}
              />
              <span className="info-row__text">
                <span>We use this information to personalize your experience.</span>
                <span>By continuing, you agree to its use</span>
              </span>
            </span>
            <FigmaAsset
              src="/assets/figma/portfolio-2026/onboarding/chevron-right.svg"
              alt=""
              displayWidth={5.95}
              displayHeight={10.09}
            />
          </button>

          <div className="screen-spacer" />

          <footer className="bottom-cta">
            <div className="bottom-cta__inner">
              <button className="cta-button" type="button" disabled>
                Agree and continue
              </button>
            </div>
            <div className="home-indicator">
              <span className="home-indicator__pill" />
            </div>
          </footer>
        </div>
      </PrototypeScreen>
    </main>
  )
}

type FigmaIconProps = {
  src: string
  width: number
  height: number
}

function FigmaIcon({ src, width, height }: FigmaIconProps) {
  return (
    <span className="figma-icon">
      <FigmaAsset src={src} alt="" displayWidth={width} displayHeight={height} />
    </span>
  )
}

function BabyBottleIcon() {
  return (
    <span className="figma-icon babybottle-icon">
      <FigmaAsset
        src="/assets/figma/portfolio-2026/onboarding/babybottle.svg"
        alt=""
        displayWidth={15.2}
        displayHeight={20.84}
      />
      <span className="babybottle-icon__line babybottle-icon__line--top">
        <FigmaAsset
          src="/assets/figma/portfolio-2026/onboarding/babybottle-line-2.svg"
          alt=""
          displayWidth={3.6}
          displayHeight={1.2}
        />
      </span>
      <span className="babybottle-icon__line babybottle-icon__line--bottom">
        <FigmaAsset
          src="/assets/figma/portfolio-2026/onboarding/babybottle-line-1.svg"
          alt=""
          displayWidth={3.6}
          displayHeight={1.2}
        />
      </span>
    </span>
  )
}

function CartIcon() {
  return (
    <span className="figma-icon cart-icon">
      <FigmaAsset
        src="/assets/figma/portfolio-2026/onboarding/cart.svg"
        alt=""
        displayWidth={20.83}
        displayHeight={15.71}
      />
      <span className="cart-icon__wheel cart-icon__wheel--left">
        <FigmaAsset
          src="/assets/figma/portfolio-2026/onboarding/cart-wheel.svg"
          alt=""
          displayWidth={3.04}
          displayHeight={3.04}
        />
      </span>
      <span className="cart-icon__wheel cart-icon__wheel--right">
        <FigmaAsset
          src="/assets/figma/portfolio-2026/onboarding/cart-wheel.svg"
          alt=""
          displayWidth={3.04}
          displayHeight={3.04}
        />
      </span>
    </span>
  )
}

export default App
