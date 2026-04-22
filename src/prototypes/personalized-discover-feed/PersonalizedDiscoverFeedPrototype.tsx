import PersonalizedFeedPrototype from '../personalized-feed/PersonalizedFeedPrototype'

type PersonalizedDiscoverFeedPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

function PersonalizedDiscoverFeedPrototype({
  mode = 'full',
}: PersonalizedDiscoverFeedPrototypeProps) {
  return (
    <PersonalizedFeedPrototype
      mode={mode}
      initialTopTab="discover"
      scrollableTopTabs
    />
  )
}

export default PersonalizedDiscoverFeedPrototype
