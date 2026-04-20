import { FigmaAsset } from '../../prototype/FigmaAsset'
import { HomeTaggedProductModule } from './HomeTaggedProductModule'
import type { FeedMediaSlide } from './FeedMediaCarousel'
import type { FeedProduct } from './FeedProductStrip'

export type HomePostArticleBlock =
  | {
      type: 'heading'
      id: string
      text: string
      level: 2 | 4
      tone?: 'brand' | 'default'
    }
  | {
      type: 'tagged-media'
      id: string
      slides: FeedMediaSlide[]
      products: FeedProduct[]
      imageHeight: number
    }
  | {
      type: 'photo'
      id: string
      src: string
      alt: string
      imageHeight: number
    }
  | {
      type: 'paragraph'
      id: string
      text: string
    }
  | {
      type: 'callout'
      id: string
      title: string
      items: string[]
    }
  | {
      type: 'spacer'
      id: string
      size: 'small' | 'large'
    }

type HomePostArticleContentProps = {
  blocks: HomePostArticleBlock[]
  saveIconSrc: string
}

export function HomePostArticleContent({
  blocks,
  saveIconSrc,
}: HomePostArticleContentProps) {
  return (
    <div className="ds-home-post-article">
      <div className="ds-home-post-article__divider" />
      <div className="ds-home-post-article__inner">
        {blocks.map((block) => {
          if (block.type === 'heading') {
            const HeadingTag = block.level === 2 ? 'h2' : 'h4'

            return (
              <section key={block.id} className="ds-home-post-article__heading-block">
                <HeadingTag
                  className={
                    block.tone === 'brand'
                      ? `ds-home-post-article__heading ds-home-post-article__heading--${block.level} ds-home-post-article__heading--brand`
                      : `ds-home-post-article__heading ds-home-post-article__heading--${block.level}`
                  }
                >
                  {block.text}
                </HeadingTag>
              </section>
            )
          }

          if (block.type === 'tagged-media') {
            return (
              <HomeTaggedProductModule
                key={block.id}
                slides={block.slides}
                products={block.products}
                imageHeight={block.imageHeight}
                saveIconSrc={saveIconSrc}
              />
            )
          }

          if (block.type === 'photo') {
            return (
              <section key={block.id} className="ds-home-post-article__photo-block">
                <div className="ds-home-post-article__photo-surface">
                  <FigmaAsset
                    src={block.src}
                    alt={block.alt}
                    displayWidth={343}
                    displayHeight={block.imageHeight}
                    exportScale={2}
                    className="ds-home-post-article__photo"
                  />
                  <button
                    type="button"
                    className="ds-home-post-article__scrap-button"
                    aria-label="Scrap"
                  >
                    <span className="ds-home-post-article__scrap-icon-wrap" aria-hidden="true">
                      <FigmaAsset
                        src={saveIconSrc}
                        alt=""
                        displayWidth={24}
                        displayHeight={24}
                      />
                    </span>
                  </button>
                </div>
              </section>
            )
          }

          if (block.type === 'paragraph') {
            return (
              <section key={block.id} className="ds-home-post-article__paragraph-block">
                <p className="ds-home-post-article__paragraph">{block.text}</p>
              </section>
            )
          }

          if (block.type === 'callout') {
            return (
              <section key={block.id} className="ds-home-post-article__callout">
                <h4 className="ds-home-post-article__callout-title">{block.title}</h4>
                <ul className="ds-home-post-article__callout-list">
                  {block.items.map((item) => (
                    <li key={item} className="ds-home-post-article__callout-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )
          }

          return (
            <div
              key={block.id}
              className={
                block.size === 'large'
                  ? 'ds-home-post-article__spacer ds-home-post-article__spacer--large'
                  : 'ds-home-post-article__spacer'
              }
            />
          )
        })}
      </div>
    </div>
  )
}
