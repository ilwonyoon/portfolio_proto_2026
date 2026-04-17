/* eslint-disable react-refresh/only-export-components */
import type { CSSProperties, ReactNode } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import type { ShortcutCarouselItem } from '../../system/mobile'

const iconBasePath = '/assets/figma/personalized-feed/shortcuts'

const iconCanvasStyle = {
  position: 'relative',
  width: 30,
  height: 30,
} satisfies CSSProperties

function iconSrc(fileName: string) {
  return `${iconBasePath}/${fileName}.svg`
}

function Layer({
  fileName,
  width,
  height,
  style,
}: {
  fileName: string
  width: number
  height: number
  style?: CSSProperties
}) {
  return (
    <div style={{ position: 'absolute', width, height, ...style }}>
      <FigmaAsset
        src={iconSrc(fileName)}
        alt=""
        displayWidth={width}
        displayHeight={height}
      />
    </div>
  )
}

function IconCanvas({ children }: { children: ReactNode }) {
  return <div style={iconCanvasStyle}>{children}</div>
}

function DealsIcon() {
  return (
    <IconCanvas>
      <Layer fileName="clock" width={30} height={29.999} />
    </IconCanvas>
  )
}

function BinaryIcon() {
  return (
    <IconCanvas>
      <Layer fileName="binaryshop-logo" width={30} height={20} style={{ left: 0, top: 6 }} />
    </IconCanvas>
  )
}

function CheckInIcon() {
  return (
    <IconCanvas>
      <Layer fileName="clovercoin" width={25} height={25} style={{ left: 2.5, top: 2.5 }} />
    </IconCanvas>
  )
}

function GameIcon() {
  return (
    <IconCanvas>
      <Layer fileName="game-union" width={24.969} height={13.5} style={{ left: 2.53, top: 5.5 }} />
      <Layer fileName="game-vector" width={20} height={11} style={{ left: 5, top: 16.5 }} />
      <Layer fileName="game-rectangle" width={24} height={5.5} style={{ left: 3, top: 14.5 }} />
      <Layer
        fileName="game-ellipse-2439"
        width={9.875}
        height={2.368}
        style={{ left: 10.12, top: 2.27 }}
      />
      <Layer fileName="game-ellipse-323" width={10} height={4} style={{ left: 10, top: -0.5 }} />
      <Layer
        fileName="game-ellipse-326"
        width={4.304}
        height={1.933}
        style={{ left: 12.85, top: 10.07 }}
      />
      <Layer
        fileName="game-ellipse-324"
        width={1.796}
        height={1.796}
        style={{ left: 12.3, top: 7.58 }}
      />
      <Layer
        fileName="game-ellipse-2440"
        width={1.765}
        height={1.796}
        style={{ left: 15.9, top: 7.58 }}
      />
    </IconCanvas>
  )
}

function InterestIcon() {
  return (
    <IconCanvas>
      <Layer
        fileName="jewelry-vector-545"
        width={26}
        height={22.5}
        style={{ left: 2, top: 4 }}
      />
      <Layer
        fileName="jewelry-vector-546"
        width={19}
        height={22.5}
        style={{ left: 2, top: 4 }}
      />
      <Layer
        fileName="jewelry-mask-group"
        width={19}
        height={22.5}
        style={{ left: 2, top: 4 }}
      />
      <Layer
        fileName="jewelry-mask-group-2"
        width={26}
        height={22.5}
        style={{ left: 2, top: 4 }}
      />
    </IconCanvas>
  )
}

function ChallengeIcon() {
  return (
    <IconCanvas>
      <Layer fileName="camera" width={25} height={22.5} style={{ left: 2.5, top: 3.5 }} />
    </IconCanvas>
  )
}

function FastDeliveryIcon() {
  return (
    <IconCanvas>
      <Layer fileName="truck" width={27.239} height={21.978} style={{ left: 2.5, top: 4 }} />
    </IconCanvas>
  )
}

function MartIcon() {
  return (
    <IconCanvas>
      <Layer fileName="mart-shampoo" width={14} height={25} style={{ left: 2.5, top: 2.5 }} />
      <Layer
        fileName="mart-tissue"
        width={18}
        height={13.008}
        style={{ left: 11, top: 14.49 }}
      />
    </IconCanvas>
  )
}

function ShowroomIcon() {
  return (
    <IconCanvas>
      <Layer fileName="showroom" width={24} height={24} style={{ left: 3, top: 3 }} />
    </IconCanvas>
  )
}

function HomeConstructionIcon() {
  return (
    <IconCanvas>
      <Layer fileName="house" width={21.736} height={23.109} style={{ left: 1.61, top: 1.04 }} />
      <div
        style={{
          position: 'absolute',
          left: 9.1,
          top: 8.46,
          width: 19,
          height: 17.831,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(-8deg)',
        }}
      >
        <FigmaAsset
          src={iconSrc('drill')}
          alt=""
          displayWidth={16.991}
          displayHeight={15.618}
        />
      </div>
    </IconCanvas>
  )
}

function PartialConstructionIcon() {
  return (
    <IconCanvas>
      <Layer fileName="paper" width={22.828} height={22.006} style={{ left: 2.35, top: 1.87 }} />
      <div
        style={{
          position: 'absolute',
          left: 5.55,
          top: 7.01,
          width: 22.26,
          height: 20.759,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(-8.5deg)',
        }}
      >
        <FigmaAsset
          src={iconSrc('roller')}
          alt=""
          displayWidth={19.813}
          displayHeight={18.029}
        />
      </div>
    </IconCanvas>
  )
}

function CleaningIcon() {
  return (
    <IconCanvas>
      <Layer
        fileName="cleaner-basket"
        width={15.214}
        height={25}
        style={{ left: 13.54, top: 2.5 }}
      />
      <Layer
        fileName="cleaner-brush"
        width={16.154}
        height={25}
        style={{ left: 2.17, top: 2.5 }}
      />
    </IconCanvas>
  )
}

export const personalizedFeedShortcuts: ShortcutCarouselItem[] = [
  {
    id: 'deals',
    label: 'Deals',
    icon: <DealsIcon />,
    labelTone: 'muted',
  },
  {
    id: 'binary-shop',
    label: 'Binary',
    icon: <BinaryIcon />,
    labelTone: 'muted',
  },
  {
    id: 'check-in',
    label: 'Check-in',
    icon: <CheckInIcon />,
    labelTone: 'muted',
  },
  {
    id: 'game',
    label: 'Game',
    icon: <GameIcon />,
    labelTone: 'muted',
  },
  {
    id: 'interest',
    label: 'Inter',
    icon: <InterestIcon />,
    labelTone: 'muted',
  },
  {
    id: 'challenge',
    label: 'Chall',
    icon: <ChallengeIcon />,
    labelTone: 'muted',
  },
  {
    id: 'fast-delivery',
    label: '빠른배송',
    icon: <FastDeliveryIcon />,
    labelTone: 'strong',
  },
  {
    id: 'oh-mart',
    label: '오마트',
    icon: <MartIcon />,
    labelTone: 'strong',
  },
  {
    id: 'oh-showroom',
    label: '오!쇼룸',
    icon: <ShowroomIcon />,
    labelTone: 'strong',
  },
  {
    id: 'home-construction',
    label: '주거시공',
    icon: <HomeConstructionIcon />,
    labelTone: 'strong',
  },
  {
    id: 'partial-construction',
    label: '부분시공',
    icon: <PartialConstructionIcon />,
    labelTone: 'strong',
  },
  {
    id: 'move-in-cleaning',
    label: '입주청소',
    icon: <CleaningIcon />,
    labelTone: 'strong',
  },
]
