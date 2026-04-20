import { FigmaAsset } from '../../prototype/FigmaAsset'
import { FeedMediaCarousel, type FeedMediaSlide } from './FeedMediaCarousel'
import { FeedProductStrip, type FeedProduct } from './FeedProductStrip'

export type HomeTaggedProductModuleProps = {
  slides: FeedMediaSlide[]
  products: FeedProduct[]
  saveIconSrc: string
  imageHeight?: number
  saveIconWidth?: number
  saveIconHeight?: number
  onSelectProduct?: (productId: string) => void
  onToggleSave?: () => void
}

export function HomeTaggedProductModule({
  slides,
  products,
  saveIconSrc,
  imageHeight = 457.3,
  saveIconWidth = 24,
  saveIconHeight = 24,
  onSelectProduct,
  onToggleSave,
}: HomeTaggedProductModuleProps) {
  const homeTourProducts = products.map((product) => ({
    ...product,
    thumbnailRadius: 8,
  }))

  return (
    <section className="ds-home-tagged-media">
      <div className="ds-home-tagged-media__surface">
        <FeedMediaCarousel
          slides={slides}
          imageWidth={343}
          imageHeight={imageHeight}
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
        products={homeTourProducts}
        thumbnailSize={64}
        thumbnailRadius={8}
        topPadding={8}
        bottomPadding={0}
        contentPaddingX={0}
        rowHeight={72}
        itemGap={8}
        showRightFade
        rightFadeWidth={44}
        onSelectProduct={onSelectProduct}
      />
    </section>
  )
}
