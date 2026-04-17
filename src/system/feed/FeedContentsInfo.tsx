export type FeedContentsInfoProps = {
  text: string
}

export function FeedContentsInfo({ text }: FeedContentsInfoProps) {
  return (
    <section className="ds-feed-contents-info">
      <p className="ds-feed-contents-info__text">{text}</p>
    </section>
  )
}
