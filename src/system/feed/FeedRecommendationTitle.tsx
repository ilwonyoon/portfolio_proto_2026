export type FeedRecommendationTitleProps = {
  text?: string
  prefix?: string
  emphasis?: string
}

export function FeedRecommendationTitle({
  text,
  prefix,
  emphasis,
}: FeedRecommendationTitleProps) {
  if (!text && !prefix && !emphasis) {
    return null
  }

  return (
    <section className="ds-feed-recommendation-title">
      <p className="ds-feed-recommendation-title__copy">
        {text ? (
          <span>{text}</span>
        ) : (
          <>
            {prefix ? <span>{prefix}</span> : null}
            {emphasis ? (
              <span className="ds-feed-recommendation-title__emphasis">
                {emphasis}
              </span>
            ) : null}
          </>
        )}
      </p>
    </section>
  )
}
