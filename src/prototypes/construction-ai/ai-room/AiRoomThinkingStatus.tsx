import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import {
  pdpAiCirclePath,
  pdpAiStarPath,
  pdpThinkingStatusTexts,
} from './deps'

gsap.registerPlugin(MorphSVGPlugin)

function PdpThinkingStatusIcon() {
  const shapeRef = useRef<SVGPathElement | null>(null)
  const groupRef = useRef<SVGGElement | null>(null)
  const haloRef = useRef<SVGCircleElement | null>(null)

  useEffect(() => {
    if (!shapeRef.current || !groupRef.current || !haloRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(shapeRef.current, {
        attr: { d: pdpAiCirclePath },
        transformOrigin: '50% 50%',
      })
      gsap.set(groupRef.current, {
        transformOrigin: '50% 50%',
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
      })
      gsap.set(haloRef.current, {
        transformOrigin: '50% 50%',
        opacity: 0,
        scale: 0.78,
      })

      const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0,
      })

      timeline
        .to(groupRef.current, {
          duration: 0.24,
          x: -3,
          y: -10,
          rotate: 16,
          scaleX: 0.95,
          scaleY: 1.06,
          ease: 'sine.out',
        }, 0)
        .to(groupRef.current, {
          duration: 0.22,
          x: 4,
          y: 7,
          rotate: 42,
          scaleX: 1.06,
          scaleY: 0.92,
          ease: 'sine.in',
        }, 0.24)
        .to(groupRef.current, {
          duration: 0.24,
          x: 6,
          y: -8,
          rotate: 76,
          scaleX: 0.94,
          scaleY: 1.05,
          ease: 'sine.out',
        }, 0.46)
        .to(groupRef.current, {
          duration: 0.22,
          x: -4,
          y: 5,
          rotate: 118,
          scaleX: 1.05,
          scaleY: 0.94,
          ease: 'sine.inOut',
        }, 0.7)
        .to(groupRef.current, {
          duration: 0.24,
          x: -2,
          y: -6,
          rotate: 164,
          scaleX: 0.97,
          scaleY: 1.03,
          ease: 'sine.out',
        }, 0.92)
        .to(groupRef.current, {
          duration: 0.28,
          x: 0,
          y: 0,
          rotate: 214,
          scaleX: 1,
          scaleY: 1,
          ease: 'sine.inOut',
        }, 1.16)
        .to(haloRef.current, {
          duration: 0.34,
          opacity: 0.2,
          scale: 0.94,
          ease: 'power2.out',
        }, 0.86)
        .to(groupRef.current, {
          duration: 0.52,
          x: 2,
          y: -2,
          rotate: 238,
          scaleX: 0.99,
          scaleY: 1.01,
          ease: 'sine.inOut',
        }, 1.62)
        .to(groupRef.current, {
          duration: 0.54,
          x: -1,
          y: 2,
          rotate: 252,
          scaleX: 1.01,
          scaleY: 0.99,
          ease: 'sine.inOut',
        }, 2.14)
        .to(groupRef.current, {
          duration: 0.58,
          x: 0,
          y: 0,
          rotate: 266,
          scaleX: 0.98,
          scaleY: 0.98,
          ease: 'sine.inOut',
        }, 2.68)
        .to(groupRef.current, {
          duration: 0.16,
          x: 0,
          y: 0,
          rotate: 280,
          scaleX: 0.98,
          scaleY: 0.98,
          ease: 'power2.in',
        }, 3.3)
        .to(groupRef.current, {
          duration: 0.94,
          rotate: 1080,
          scaleX: 1.09,
          scaleY: 1.09,
          ease: 'power3.out',
        }, 3.46)
        .to(shapeRef.current, {
          duration: 0.94,
          morphSVG: {
            shape: pdpAiStarPath,
            shapeIndex: 'auto',
          },
          ease: 'power2.inOut',
        }, 3.46)
        .to(haloRef.current, {
          duration: 0.36,
          opacity: 0.42,
          scale: 1.22,
          ease: 'power2.out',
        }, '-=0.36')
        .to(groupRef.current, {
          duration: 0.22,
          scaleX: 1,
          scaleY: 1,
          rotate: 1080,
          ease: 'back.out(1.8)',
        }, 4.4)
        .to(haloRef.current, {
          duration: 0.48,
          opacity: 0,
          scale: 1.58,
          ease: 'power2.out',
        }, '-=0.4')
        .to(groupRef.current, {
          duration: 0.38,
          rotate: 1170,
          x: 0,
          scaleX: 0.96,
          scaleY: 0.96,
          ease: 'power3.inOut',
        }, 4.64)
        .to(shapeRef.current, {
          duration: 0.38,
          morphSVG: {
            shape: pdpAiCirclePath,
            shapeIndex: 'auto',
          },
          ease: 'power3.inOut',
        }, 4.64)
        .to(groupRef.current, {
          duration: 0.06,
          rotate: 1080,
          scaleX: 1,
          scaleY: 1,
          ease: 'power2.out',
        }, 5.02)
        .set(groupRef.current, {
          rotate: 0,
        })
    })

    return () => ctx.revert()
  }, [])

  return (
    <svg
      className="pdp-thinking-status__icon-svg"
      viewBox="47.5 47.5 132 132"
      aria-hidden="true"
    >
      <circle
        ref={haloRef}
        className="pdp-thinking-status__halo"
        cx="113.5"
        cy="113.5"
        r="43"
      />
      <g ref={groupRef}>
        <path
          ref={shapeRef}
          className="pdp-thinking-status__mark"
          d={pdpAiCirclePath}
        />
      </g>
    </svg>
  )
}

export function PdpThinkingStatus({
  texts,
}: {
  texts?: string[]
}) {
  const items = texts && texts.length > 0 ? texts : pdpThinkingStatusTexts
  return (
    <div className="pdp-thinking-status" role="status" aria-live="polite">
      <span className="pdp-thinking-status__icon">
        <PdpThinkingStatusIcon />
      </span>
      <span className="pdp-thinking-status__viewport" aria-hidden="true">
        <span className="pdp-thinking-status__track">
          {items.map((text) => (
            <span key={text} className="pdp-thinking-status__text">
              {text}
            </span>
          ))}
          <span className="pdp-thinking-status__text">{items[0]}</span>
        </span>
      </span>
      <span className="pdp-thinking-status__sr">{items[0]}</span>
    </div>
  )
}
