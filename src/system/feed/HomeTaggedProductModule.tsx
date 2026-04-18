import { FigmaAsset } from '../../prototype/FigmaAsset'
import { FeedMediaCarousel, type FeedMediaSlide } from './FeedMediaCarousel'
import { FeedProductStrip, type FeedProduct } from './FeedProductStrip'

export type HomeTaggedProductModuleProps = {
  slides: FeedMediaSlide[]
  products: FeedProduct[]
  saveIconSrc: string
  saveIconWidth?: number
  saveIconHeight?: number
  onSelectProduct?: (productId: string) => void
  onToggleSave?: () => void
}

export function HomeTaggedProductModule({
  slides,
  products,
  saveIconSrc,
  saveIconWidth = 24,
  saveIconHeight = 24,
  onSelectProduct,
  onToggleSave,
}: HomeTaggedProductModuleProps) {
  return (
    <section className="ds-home-tagged-media">
      <div className="ds-home-tagged-media__surface">
        <FeedMediaCarousel
          slides={slides}
          imageWidth={343}
          imageHeight={457.3}
          topPadding={0}
          showCounter={false}
          showDots={false}
          showTagReveal={false}
          tagSize={18}
          onSelectTag={onSelectProduct}
          overlay={
            <button
              type="button"
              className="ds-home-tagged-media__scrap-button"
              aria-label="Scrap"
              onClick={onToggleSave}
            >
              <span className="ds-home-tagged-media__scrap-icon-wrap" aria-hidden="true">
                <FigmaAsset
                  src={saveIconSrc}
                  alt=""
                  displayWidth={saveIconWidth}
                  displayHeight={saveIconHeight}
                />
              </span>
            </button>
          }
        />
      </div>

      <FeedProductStrip
        mode="rail"
        products={products}
        thumbnailSize={72}
        thumbnailRadius={24}
        topPadding={12}
        bottomPadding={0}
        contentPaddingX={0}
        rowHeight={84}
        itemGap={8}
        showRightFade
        onSelectProduct={onSelectProduct}
      />
    </section>
  )
}
