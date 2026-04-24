import { useEffect, useRef } from 'react'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { HomeIndicator, StatusBar, TopNav } from '../../system/mobile'
import './generating-motion-lab.css'

type GeneratingMotionLabPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

const statusLevelsSrc = '/assets/figma/portfolio-2026/onboarding/status-levels.svg'
const assetRoot = '/assets/figma/pdp'
const messages = [
  'Matching scale and perspective',
  'Balancing light and shadow',
  'Blending the chair into your room',
]

const variants = [
  {
    id: 'gemini-cinematic',
    label: 'G1',
    title: 'Gemini: Blur Dissolve',
    note: 'Text heavily blurs during swap. No sharp overlapping characters.',
  },
  {
    id: 'gemini-organic',
    label: 'G2',
    title: 'Gemini: Gradient Wipe',
    note: 'Text is wiped away left-to-right. Seamless scanner effect.',
  },
  {
    id: 'gemini-quantum',
    label: 'G3',
    title: 'Gemini: Vertical Roll',
    note: 'Text physically scrolls up. Clean, spatial, and natural.',
  },
  {
    id: 'quiet-material',
    label: 'A',
    title: 'Quiet material',
    note: 'Glass-first. Sheen is restrained and wide.',
  },
  {
    id: 'text-first',
    label: 'B',
    title: 'Text-first',
    note: 'Readable copy with clearer glyph sheen.',
  },
  {
    id: 'codex-wave',
    label: 'C',
    title: 'Codex-like wave',
    note: 'Diagonal text wave with a continuous loop.',
  },
  {
    id: 'dual-wave',
    label: 'D',
    title: 'Dual wave',
    note: 'Two staggered bands to remove jump cuts.',
  },
  {
    id: 'editorial',
    label: 'E',
    title: 'Editorial gloss',
    note: 'Slightly brighter, more premium sheen.',
  },
  {
    id: 'ultra-subtle',
    label: 'F',
    title: 'Ultra subtle',
    note: 'Closest to invisible. Confidence over motion.',
  },
] as const

function MotionLabMessage({
  message,
  delay,
}: {
  message: string
  delay: string
}) {
  return (
    <p className="motion-lab-card__line" style={{ animationDelay: delay }}>
      <span className="motion-lab-card__line-base">{message}</span>
      <span className="motion-lab-card__line-sheen" aria-hidden="true">
        {message}
      </span>
      <span className="motion-lab-card__line-sheen motion-lab-card__line-sheen--secondary" aria-hidden="true">
        {message}
      </span>
    </p>
  )
}

function MotionLabPreview({
  variantId,
  title,
  note,
}: {
  variantId: string
  title: string
  note: string
}) {
  return (
    <section className="motion-lab-section">
      <div className="motion-lab-section__meta">
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
      <div className={`motion-lab-preview motion-lab-preview--${variantId}`}>
        <FigmaAsset
          src={`${assetRoot}/place-chair-room-2x.png`}
          alt=""
          displayWidth={343}
          displayHeight={188}
          exportScale={2}
          className="motion-lab-preview__image"
        />
        <div className="motion-lab-preview__glass" aria-hidden="true" />
        <div className="motion-lab-preview__scan" aria-hidden="true" />

        <div className="motion-lab-card">
          <div className="motion-lab-card__thumb">
            <FigmaAsset
              src={`${assetRoot}/place-chair-object-2x.png`}
              alt=""
              displayWidth={52}
              displayHeight={52}
              exportScale={2}
            />
          </div>
          <div className="motion-lab-card__copy">
            <p className="motion-lab-card__eyebrow">Creating an image</p>
            <div className="motion-lab-card__message-stack" aria-hidden="true">
              <MotionLabMessage message={messages[0]} delay="0s" />
              <MotionLabMessage message={messages[1]} delay="3s" />
              <MotionLabMessage message={messages[2]} delay="6s" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function GeneratingMotionLabPrototype({
  mode = 'full',
}: GeneratingMotionLabPrototypeProps) {
  const isThumbnail = mode === 'thumbnail'
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isThumbnail) {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [isThumbnail])

  return (
    <div className={isThumbnail ? 'motion-lab motion-lab--thumbnail' : 'motion-lab'}>
      <PrototypeScreen contentHeight={isThumbnail ? 812 : 1480} variant="bare">
        <div className="motion-lab-screen">
          <header className="motion-lab-header">
            <StatusBar levelsSrc={statusLevelsSrc} className="motion-lab-status" />
            <TopNav
              className="motion-lab-top-nav"
              center={<h1>Generating Motion Lab</h1>}
            />
          </header>

          <main
            ref={scrollRef}
            className="motion-lab-main prototype-screen__scroll-region"
          >
            <section className="motion-lab-hero">
              <p className="motion-lab-hero__eyebrow">Motion study</p>
              <h2>Same card, different motion art direction</h2>
              <p className="motion-lab-hero__body">
                Compare material strength, loop topology, and sheen behavior under the same
                background and copy.
              </p>
            </section>

            {variants.map((variant) => (
              <MotionLabPreview
                key={variant.id}
                variantId={variant.id}
                title={`${variant.label}. ${variant.title}`}
                note={variant.note}
              />
            ))}
          </main>

          <div className="motion-lab-home-indicator">
            <HomeIndicator />
          </div>
        </div>
      </PrototypeScreen>
    </div>
  )
}
