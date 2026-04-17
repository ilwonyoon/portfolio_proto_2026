import { FeedCardHeader } from './FeedCardHeader'
import { FeedMediaCarousel } from './FeedMediaCarousel'
import { FeedReactionBar } from './FeedReactionBar'
import type { LongformAdviceFeedItem } from './HomeFeedItem'

type LongformAdviceFeedCardProps = {
  item: LongformAdviceFeedItem
}

function LongformImageBar({
  title,
  ctaLabel,
}: LongformAdviceFeedItem['imageBar']) {
  return (
    <section className="ds-longform-advice-card__image-bar">
      <div className="ds-longform-advice-card__image-bar-copy">
        <p className="ds-longform-advice-card__image-bar-title">{title}</p>
        <p className="ds-longform-advice-card__image-bar-cta">{ctaLabel}</p>
      </div>
    </section>
  )
}

export function LongformAdviceFeedCard({
  item,
}: LongformAdviceFeedCardProps) {
  return (
    <article className="ds-longform-advice-card">
      <FeedCardHeader {...item.header} topPadding={0} />
      <FeedMediaCarousel
        slides={item.media.slides}
        imageHeight={item.media.imageHeight ?? 280}
        topPadding={0}
      />
      <LongformImageBar {...item.imageBar} />
      <FeedReactionBar {...item.reactions} topPadding={0} />
    </article>
  )
}
