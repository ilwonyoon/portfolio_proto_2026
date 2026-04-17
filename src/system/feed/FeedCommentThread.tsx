export type FeedComment = {
  id: string
  author?: string
  body: string
  emphasize?: boolean
}

export type FeedCommentThreadProps = {
  description?: string
  showDescriptionMore?: boolean
  commentCount?: number
  comments: FeedComment[]
  maxVisibleComments?: number
  viewAllVisibility?: 'auto' | 'always' | 'never'
}

export function FeedCommentThread({
  description,
  showDescriptionMore = true,
  commentCount,
  comments,
  maxVisibleComments = 2,
  viewAllVisibility = 'auto',
}: FeedCommentThreadProps) {
  const visibleComments = comments.slice(0, maxVisibleComments)
  const totalCommentCount = commentCount ?? comments.length
  const shouldShowViewAll =
    viewAllVisibility === 'always'
      ? totalCommentCount > 0
      : viewAllVisibility === 'never'
        ? false
        : totalCommentCount > visibleComments.length

  if (!description && totalCommentCount === 0 && visibleComments.length === 0) {
    return null
  }

  return (
    <section className="ds-feed-comment-thread">
      {description ? (
        <p className="ds-feed-comment-thread__description">
          {description}
          {showDescriptionMore ? (
            <span className="ds-feed-comment-thread__more"> more</span>
          ) : null}
        </p>
      ) : null}

      {shouldShowViewAll ? (
        <button type="button" className="ds-feed-comment-thread__view-all">
          {`View all ${totalCommentCount} comments`}
        </button>
      ) : null}

      <div className="ds-feed-comment-thread__comments">
        {visibleComments.map((comment) => (
          <p
            key={comment.id}
            className={
              comment.emphasize
                ? 'ds-feed-comment-thread__comment ds-feed-comment-thread__comment--emphasize'
                : 'ds-feed-comment-thread__comment'
            }
          >
            {comment.author ? (
              <span className="ds-feed-comment-thread__author">
                {`${comment.author} `}
              </span>
            ) : null}
            <span>{comment.body}</span>
          </p>
        ))}
      </div>
    </section>
  )
}
