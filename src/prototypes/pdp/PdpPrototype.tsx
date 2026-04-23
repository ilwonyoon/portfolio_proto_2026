import { useRef, type ReactNode } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { HomeIndicator, StatusBar, TopNav } from '../../system/mobile'
import { useInertialScroll } from '../../system/mobile/useInertialScroll'
import './pdp.css'

type PdpPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

const assetRoot = '/assets/figma/pdp'
const statusLevelsSrc = '/assets/figma/portfolio-2026/onboarding/status-levels.svg'

function PdpIconButton({
  className,
  label,
  children,
}: {
  className?: string
  label: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={className ? `pdp-icon-button ${className}` : 'pdp-icon-button'}
      aria-label={label}
    >
      {children}
    </button>
  )
}

function PdpTopNavigation() {
  return (
    <TopNav
      className="pdp-top-nav"
      leading={
        <div className="pdp-top-nav__group">
          <PdpIconButton label="Back">
            <FigmaAsset
              src={`${assetRoot}/arrow-left.svg`}
              alt=""
              displayWidth={20.5}
              displayHeight={18.867}
            />
          </PdpIconButton>
          <PdpIconButton label="Home">
            <FigmaAsset
              src={`${assetRoot}/home-outline.svg`}
              alt=""
              displayWidth={20.8}
              displayHeight={19.85}
            />
          </PdpIconButton>
        </div>
      }
      trailing={
        <div className="pdp-top-nav__group">
          <PdpIconButton label="Search">
            <FigmaAsset
              src={`${assetRoot}/search-24.svg`}
              alt=""
              displayWidth={24}
              displayHeight={24}
            />
          </PdpIconButton>
          <PdpIconButton label="Cart">
            <FigmaAsset
              src={`${assetRoot}/cart-24.svg`}
              alt=""
              displayWidth={24}
              displayHeight={24}
            />
          </PdpIconButton>
        </div>
      }
    />
  )
}

function PdpMediaCounter() {
  return (
    <div className="pdp-media-counter" aria-label="Image 1 of 5">
      <span>1</span>
      <span>/</span>
      <span>5</span>
    </div>
  )
}

function PdpRating() {
  const filledStars = Array.from({ length: 4 }, (_, index) => (
    <FigmaAsset
      key={`star-${index + 1}`}
      src={`${assetRoot}/star-filled.svg`}
      alt=""
      displayWidth={12.517}
      displayHeight={11.947}
      className="pdp-rating__star"
    />
  ))

  return (
    <div className="pdp-rating" aria-label="4.5 out of 5 stars, 257 reviews">
      <span className="pdp-rating__stars" aria-hidden="true">
        {filledStars}
        <FigmaAsset
          src={`${assetRoot}/star-half.svg`}
          alt=""
          displayWidth={14}
          displayHeight={14}
          className="pdp-rating__star"
        />
      </span>
      <button type="button" className="pdp-rating__count">
        (257)
      </button>
    </div>
  )
}

function PdpShareIcon() {
  return (
    <span className="pdp-share-icon" aria-hidden="true">
      <FigmaAsset
        src={`${assetRoot}/share-24.svg`}
        alt=""
        displayWidth={20}
        displayHeight={22.858}
      />
    </span>
  )
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <FigmaAsset
      src={`${assetRoot}/info-16.svg`}
      alt=""
      displayWidth={16}
      displayHeight={16}
      className={className}
    />
  )
}

function ChevronRight() {
  return (
    <FigmaAsset
      src={`${assetRoot}/chevron-right-16.svg`}
      alt=""
      displayWidth={8}
      displayHeight={13.354}
      className="pdp-inline-icon"
    />
  )
}

function PdpHero() {
  return (
    <section className="pdp-hero" aria-label="Product images">
      <FigmaAsset
        src={`${assetRoot}/cuba-chair-hero-2x.png`}
        alt="Carl Hansen & Søn MG501 Cuba Chair"
        displayWidth={375}
        displayHeight={375}
        exportScale={2}
        className="pdp-hero__image"
        fetchPriority="high"
      />
      <PdpMediaCounter />
    </section>
  )
}

function PdpProductInfo() {
  return (
    <section className="pdp-info" aria-label="Product information">
      <div className="pdp-title-block">
        <p className="pdp-brand">Carl Hansen &amp; Søn</p>
        <div className="pdp-name-row">
          <h1>Carl Hansen &amp; Søn MG501 Cuba Chair</h1>
          <PdpIconButton label="Share product" className="pdp-share-button">
            <PdpShareIcon />
          </PdpIconButton>
        </div>
        <PdpRating />
      </div>

      <div className="pdp-price-block">
        <div className="pdp-list-price">
          <span>35%</span>
          <span>399,000</span>
          <InfoIcon />
        </div>
        <p className="pdp-sale-price">1,090,000</p>
      </div>

      <div className="pdp-price-guarantee">
        <span>Guaranteed Price</span>
        <span>Lowest online price daily</span>
        <InfoIcon />
      </div>

      <div className="pdp-coupon-card">
        <span className="pdp-coupon-card__icon">
          <FigmaAsset
            src={`${assetRoot}/cart-24.svg`}
            alt=""
            displayWidth={18}
            displayHeight={18}
          />
        </span>
        <span className="pdp-coupon-card__copy">
          <span>More discount available on checkout</span>
          <span>Orders over 400,000 KRW</span>
        </span>
      </div>
    </section>
  )
}

function PdpBenefitShipping() {
  return (
    <section className="pdp-benefit-shipping" aria-label="Benefits and shipping">
      <div className="pdp-field-row">
        <p className="pdp-field-row__label">Benefits</p>
        <div className="pdp-field-row__content">
          <p className="pdp-strong">350P Reward (VIP 3% applied)</p>
          <p className="pdp-line-with-icon">
            <span>10,000 KRW per month (8 months) interest-free installment</span>
            <ChevronRight />
          </p>
        </div>
      </div>

      <div className="pdp-field-row">
        <p className="pdp-field-row__label">Shipping</p>
        <div className="pdp-field-row__content pdp-field-row__content--shipping">
          <p className="pdp-line-with-icon pdp-strong">
            <span>Free Shipping</span>
            <ChevronRight />
          </p>
          <p>Direct Delivery from Supplier</p>
          <p className="pdp-note">
            <FigmaAsset
              src={`${assetRoot}/check-16.svg`}
              alt=""
              displayWidth={12.1}
              displayHeight={8.5}
              className="pdp-note__check"
            />
            <span>Delivery to Jeju not available</span>
          </p>
          <button type="button" className="pdp-arrival-button">
            <FigmaAsset
              src={`${assetRoot}/delivery-time.svg`}
              alt=""
              displayWidth={17.54}
              displayHeight={17.392}
            />
            <span>Arrive by 11/9 (Wed)</span>
            <FigmaAsset
              src={`${assetRoot}/chevron-down-16.svg`}
              alt=""
              displayWidth={13.35}
              displayHeight={7.91}
              className="pdp-arrival-button__chevron"
            />
          </button>
          <button type="button" className="pdp-bundled-button">
            <span>Add bundled shipping items</span>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

function PdpCtaBar() {
  return (
    <div className="pdp-cta-bar">
      <div className="pdp-cta-bar__toolbar">
        <button type="button" className="pdp-save-button" aria-label="Save product">
          <FigmaAsset
            src={`${assetRoot}/scrap-24.svg`}
            alt=""
            displayWidth={16}
            displayHeight={19.4}
          />
          <span>1,234</span>
        </button>
        <button type="button" className="pdp-buy-button">
          Buy Now
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}

export default function PdpPrototype({ mode = 'full' }: PdpPrototypeProps) {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const isThumbnail = mode === 'thumbnail'

  useInertialScroll(mainRef, {
    enabled: !isThumbnail,
    preset: 'ios-pdp',
  })

  return (
    <div className={isThumbnail ? 'pdp-prototype pdp-prototype--thumbnail' : 'pdp-prototype'}>
      <PrototypeScreen contentHeight={812} variant="bare">
        <div className="pdp-screen">
          <header className="pdp-header">
            <StatusBar levelsSrc={statusLevelsSrc} />
            <PdpTopNavigation />
          </header>

          <main
            ref={mainRef}
            className="pdp-main prototype-screen__scroll-region"
            data-inertial-scroll={!isThumbnail ? 'true' : undefined}
          >
            <PdpHero />
            <div className="pdp-content-wrap">
              <PdpProductInfo />
              <PdpBenefitShipping />
              <div className="pdp-divider" />
            </div>
          </main>

          <PdpCtaBar />
        </div>
      </PrototypeScreen>
    </div>
  )
}
