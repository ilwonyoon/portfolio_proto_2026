import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import movingGif from '../../../Assets/moving.gif'
import pointGetGif from '../../../Assets/point-get.gif'
import './portfolio-2026.css'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { ProgressBar } from '../../system/mobile/ProgressBar'
import { HomeIndicator } from '../../system/mobile/HomeIndicator'
import { TopNav } from '../../system/mobile/TopNav'
import { Button } from '../../system/primitives/Button'
import { Chip } from '../../system/primitives/Chip'
import { IconButton } from '../../system/primitives/IconButton'

type Portfolio2026PrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type Step =
  | 'intro'
  | 'interests'
  | 'home-type'
  | 'living-with'
  | 'final-preferences'
  | 'recommendations'
type ProductCategory = {
  id: string
  label: string
  imageSrc?: string
}

const screenHeight = 812
const moveMonths = ['July', 'Aug', 'Sep', 'Oct'] as const
const multiSelectIds = ['ideas', 'shopping'] as const
const homeTypeOptions = [
  'Apartment',
  'Studio apartment',
  'Townhouse',
  'Single-family home',
  'Other',
] as const
const apartmentSizes = [
  'Under 500 sq ft',
  '500-800 sq ft',
  '800-1,200 sq ft',
  '1,200-1,800 sq ft',
  '1,800+ sq ft',
] as const
const livingWithOptions = [
  'Living alone',
  'Partner',
  'Parents',
  'Siblings',
  'Children',
  'Roommates',
  'Pets',
] as const
const productCategories: ProductCategory[] = [
  {
    id: 'sofas',
    label: 'Sofas',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/sofa.png',
  },
  {
    id: 'beds',
    label: 'Beds',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/bed.png',
  },
  {
    id: 'dining-tables',
    label: 'Dining tables',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/dining-table.png',
  },
  {
    id: 'fabric',
    label: 'Fabric',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/fabric.png',
  },
  {
    id: 'dressers',
    label: 'Dressers',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/dresser-storage.png',
  },
  {
    id: 'fridges',
    label: 'Fridges',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/refrigerator.png',
  },
  {
    id: 'tv-media',
    label: 'TV & media',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/tv-media.png',
  },
  {
    id: 'clothes-racks',
    label: 'Clothes racks',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/clothes-rack.png',
  },
  {
    id: 'wardrobes',
    label: 'Wardrobes',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/wardrobe.png',
  },
  {
    id: 'washer-dryer',
    label: 'Washer & dryer',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/washer-dryer.png',
  },
  {
    id: 'mattresses',
    label: 'Mattresses',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/mattress-topper.png',
  },
  {
    id: 'vanities',
    label: 'Vanities',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/vanity-console.png',
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/bathroom-essentials.png',
  },
  {
    id: 'bookcases',
    label: 'Bookcases',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/shelving-bookcase.png',
  },
  {
    id: 'chairs',
    label: 'Chairs',
    imageSrc: '/assets/figma/portfolio-2026/final-preferences/chairs.png',
  },
  {
    id: 'other',
    label: 'Other',
  },
]

const serviceOptions = [
  { id: 'interior-renovation', label: 'Interior renovation' },
  { id: 'small-moves', label: 'Small moves' },
  { id: 'resale', label: 'Secondhand selling' },
  { id: 'full-service-movers', label: 'Full-service movers' },
  { id: 'room-planner', label: '3D room planner' },
  { id: 'installation', label: 'Appliance installation' },
  { id: 'storage', label: 'Storage' },
  { id: 'move-in-cleaning', label: 'Move-in cleaning' },
  { id: 'internet-setup', label: 'Internet setup' },
  { id: 'water-purifier', label: 'Water purifier setup' },
  { id: 'home-repairs', label: 'Home repairs' },
  { id: 'furniture-repair', label: 'Furniture repair' },
] as const

const recommendationCards = [
  {
    id: 'shop',
    label: 'Shop deals',
    iconSrc: '/assets/figma/portfolio-2026/recommendations/basket.svg',
    iconWidth: 19.2,
    iconHeight: 20.16,
  },
  {
    id: 'moving-quotes',
    label: 'Get moving quotes',
    iconSrc: '/assets/figma/portfolio-2026/recommendations/movingbox.svg',
    iconWidth: 19.2,
    iconHeight: 18.8,
  },
] as const

const reasons = [
  {
    id: 'moving',
    label: 'Moving to a new place',
    icon: (
      <FigmaIcon
        src="/assets/figma/portfolio-2026/onboarding/movingbox.svg"
        width={19.2}
        height={18.8}
      />
    ),
  },
  {
    id: 'renovation',
    label: 'Planning a renovation',
    icon: (
      <FigmaIcon
        src="/assets/figma/portfolio-2026/onboarding/tool.svg"
        width={16.16}
        height={20.78}
      />
    ),
  },
  {
    id: 'married',
    label: 'Getting married soon',
    icon: (
      <FigmaIcon
        src="/assets/figma/portfolio-2026/onboarding/heart.svg"
        width={20}
        height={17.6}
      />
    ),
  },
  {
    id: 'baby',
    label: 'Expecting a baby',
    icon: <BabyBottleIcon />,
  },
  {
    id: 'ideas',
    label: 'Looking for ideas',
    icon: (
      <FigmaIcon
        src="/assets/figma/portfolio-2026/onboarding/ideas.svg"
        width={20.8}
        height={17.6}
      />
    ),
  },
  {
    id: 'shopping',
    label: 'Shopping for home products',
    icon: <CartIcon src="/cart.svg" />,
  },
] as const

function toggleValue(current: string[], value: string) {
  return current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value]
}

function splitIntoTwoRows<T>(items: readonly T[]) {
  return items.reduce<[T[], T[]]>(
    (rows, item, index) => {
      rows[index % 2].push(item)
      return rows
    },
    [[], []],
  )
}

function Portfolio2026Prototype({
  mode = 'full',
}: Portfolio2026PrototypeProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [isMovingSelected, setIsMovingSelected] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<Step>('intro')
  const [selectedHomeType, setSelectedHomeType] = useState<string | null>(null)
  const [selectedApartmentSize, setSelectedApartmentSize] = useState<string | null>(
    null,
  )
  const [selectedLivingWith, setSelectedLivingWith] = useState<string[]>([])
  const [selectedProductCategories, setSelectedProductCategories] = useState<
    string[]
  >([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [hasFinalStepInteraction, setHasFinalStepInteraction] = useState(false)
  const [isSurveyContentVisible, setIsSurveyContentVisible] = useState(
    mode === 'thumbnail',
  )
  const isThumbnail = mode === 'thumbnail'
  const setStep = (nextStep: Step) => {
    setIsSurveyContentVisible(
      isThumbnail || nextStep === 'intro' || nextStep === 'recommendations',
    )
    setCurrentStep(nextStep)
  }

  useEffect(() => {
    if (isThumbnail) {
      return
    }

    if (!window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const cursor = cursorRef.current

    if (!cursor) {
      return
    }

    let pointerX = 0
    let pointerY = 0
    let rafId = 0

    const renderCursor = () => {
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      rafId = 0
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      cursor.classList.add('ios-cursor--visible')

      if (rafId === 0) {
        rafId = window.requestAnimationFrame(renderCursor)
      }
    }

    const handlePointerDown = () => {
      cursor.classList.add('ios-cursor--pressed')
    }

    const handlePointerUp = () => {
      cursor.classList.remove('ios-cursor--pressed')
    }

    const handlePointerLeave = () => {
      cursor.classList.remove('ios-cursor--visible', 'ios-cursor--pressed')
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerLeave)
    window.addEventListener('blur', handlePointerLeave)
    document.addEventListener('mouseleave', handlePointerLeave)

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
      }

      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerLeave)
      window.removeEventListener('blur', handlePointerLeave)
      document.removeEventListener('mouseleave', handlePointerLeave)
    }
  }, [isThumbnail])

  const headerLines = (() => {
    if (currentStep === 'intro') {
      return []
    }

    if (currentStep === 'recommendations') {
      return []
    }

    if (currentStep === 'final-preferences') {
      return [
        {
          as: 'h1' as const,
          className: 'screen-header__title',
          text: "Tell us what you're into",
        },
        {
          as: 'p' as const,
          className: 'screen-header__subtitle',
          text: 'Select anything that interests you',
        },
      ]
    }

    if (currentStep === 'living-with') {
      return [
        {
          as: 'h1' as const,
          className: 'screen-header__title',
          text: 'Who do you live with?',
        },
        {
          as: 'p' as const,
          className: 'screen-header__subtitle',
          text: 'Select all that apply',
        },
      ]
    }

    if (currentStep === 'home-type') {
      if (selectedHomeType === 'Apartment') {
        return [
          {
            as: 'h1' as const,
            className: 'screen-header__title',
            text: 'How big is your space?',
          },
          {
            as: 'p' as const,
            className: 'screen-header__subtitle',
            text: 'Styles tailored to your space',
          },
        ]
      }

      return [
        {
          as: 'h1' as const,
          className: 'screen-header__title',
          text: 'What type of home',
        },
        {
          as: 'p' as const,
          className: 'screen-header__subtitle',
          text: 'are you moving into?',
        },
      ]
    }

    if (isMovingSelected) {
      if (selectedMonth) {
        return [
          {
            as: 'h1' as const,
            className: 'screen-header__title',
            text: 'Anything else?',
          },
          {
            as: 'p' as const,
            className: 'screen-header__subtitle',
            text: 'You can select multiple options',
          },
        ]
      }

      return [
        {
          as: 'h1' as const,
          className: 'screen-header__title',
          text: 'When are you planning to move?',
        },
        {
          as: 'p' as const,
          className: 'screen-header__subtitle',
          text: 'Choose a month',
        },
      ]
    }

    return [
      {
        as: 'h1' as const,
        className: 'screen-header__title',
        text: 'What brings you here today?',
      },
      {
        as: 'p' as const,
        className: 'screen-header__subtitle',
        text: 'Select all that apply.',
      },
    ]
  })()

  const progressClassName = (() => {
    if (currentStep === 'intro') {
      return 'progress-bar__value'
    }

    if (currentStep === 'recommendations') {
      return 'progress-bar__value progress-bar__value--final'
    }

    if (currentStep === 'final-preferences') {
      return 'progress-bar__value progress-bar__value--final'
    }

    if (currentStep === 'living-with') {
      return 'progress-bar__value progress-bar__value--living-with'
    }

    if (currentStep === 'home-type') {
      if (selectedApartmentSize) {
        return 'progress-bar__value progress-bar__value--home-type-complete'
      }

      if (selectedHomeType === 'Apartment') {
        return 'progress-bar__value progress-bar__value--home-type'
      }

      return 'progress-bar__value progress-bar__value--home-type-initial'
    }

    if (selectedMonth) {
      return 'progress-bar__value progress-bar__value--complete'
    }

    if (isMovingSelected) {
      return 'progress-bar__value progress-bar__value--expanded'
    }

    return 'progress-bar__value'
  })()

  const hasFinalSelections =
    selectedProductCategories.length +
      selectedTopics.length +
      selectedServices.length >
    0
  const isFinalButtonEnabled = hasFinalStepInteraction && hasFinalSelections
  const personalizedTopicOptions = (() => {
    const hasPartner = selectedLivingWith.includes('Partner')
    const hasChildren = selectedLivingWith.includes('Children')
    const hasPets = selectedLivingWith.includes('Pets')
    const isFamilyApartmentMove =
      isMovingSelected &&
      selectedHomeType === 'Apartment' &&
      selectedApartmentSize === '800-1,200 sq ft' &&
      hasPartner &&
      hasChildren &&
      hasPets

    if (isFamilyApartmentMove) {
      return [
        'Family-friendly layout',
        'Parenting routines at home',
        'Pet-friendly fabrics',
        'Kitchen organization',
        'Dining space for four',
        'Entryway drop zone',
        "Kids' room setup",
        'Laundry organization',
        'Apartment storage ideas',
        'Cozy bedroom refresh',
      ]
    }

    if (selectedHomeType === 'Apartment') {
      return [
        'Apartment layout',
        'Kitchen organization',
        'Storage tips',
        'Living room styling',
        'Bedroom refresh',
        'Entryway organization',
        'Furniture layout',
        'Laundry organization',
        'Solo living',
        'Hosting at home',
      ]
    }

    return [
      'Living room styling',
      'Kitchen organization',
      'Storage tips',
      'Bedroom refresh',
      'Furniture layout',
      'Dining ideas',
      'Laundry organization',
      'Plant styling',
      'Hosting at home',
      'Home organization',
    ]
  })()
  const [topicRowOne, topicRowTwo] = splitIntoTwoRows(personalizedTopicOptions)
  const [serviceRowOne, serviceRowTwo] = splitIntoTwoRows(serviceOptions)

  const handleFinalToggle = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setHasFinalStepInteraction(true)
    setter((current) => toggleValue(current, value))
  }

  const handleBack = () => {
    if (currentStep === 'recommendations') {
      setStep('final-preferences')
      return
    }

    if (currentStep === 'final-preferences') {
      setStep('living-with')
      return
    }

    if (currentStep === 'living-with') {
      setStep('home-type')
      return
    }

    if (currentStep === 'home-type') {
      setStep('interests')
      return
    }

    if (currentStep === 'interests') {
      setStep('intro')
    }
  }

  const enterFinalPreferences = () => {
    setSelectedProductCategories([])
    setSelectedTopics([])
    setSelectedServices([])
    setHasFinalStepInteraction(false)
    setStep('final-preferences')
  }

  const renderSurveyStep = () => {
    if (currentStep === 'final-preferences') {
      return (
        <div className="preferences-step">
          <section className="preferences-section" aria-label="Product categories">
            <div className="preferences-section__header">
              <h2 className="preferences-section__title">Product categories</h2>
              <span className="preferences-section__count">
                {selectedProductCategories.length}/16
              </span>
            </div>

            <div className="preferences-categories">
              {productCategories.map((category) => {
                const isSelected = selectedProductCategories.includes(category.id)

                return (
                  <button
                    key={category.id}
                    type="button"
                    className={
                      isSelected
                        ? 'preference-category preference-category--selected'
                        : 'preference-category'
                    }
                    aria-pressed={isSelected}
                    onClick={() =>
                      handleFinalToggle(category.id, setSelectedProductCategories)
                    }
                  >
                    <span
                      className={
                        category.imageSrc
                          ? 'preference-category__image'
                          : 'preference-category__image preference-category__image--other'
                      }
                    >
                      {category.imageSrc ? (
                        <FigmaAsset
                          src={category.imageSrc}
                          alt=""
                          displayWidth={68}
                          displayHeight={68}
                          className="preference-category__asset"
                        />
                      ) : (
                        <span className="preference-category__more">...</span>
                      )}
                    </span>
                    <span className="preference-category__label">
                      {category.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="preferences-section" aria-label="Topics you care about">
            <div className="preferences-section__header">
              <h2 className="preferences-section__title">Topics you're into</h2>
              <span className="preferences-section__count">
                {selectedTopics.length}/16
              </span>
            </div>

            <div className="preference-chip-carousel">
              <div className="preference-chip-carousel__track">
                <div className="preference-chip-carousel__row">
                  {topicRowOne.map((topic) => {
                    const isSelected = selectedTopics.includes(topic)

                    return (
                      <button
                        key={topic}
                        type="button"
                        className={
                          isSelected
                            ? 'preference-chip preference-chip--selected'
                            : 'preference-chip'
                        }
                        aria-pressed={isSelected}
                        onClick={() => handleFinalToggle(topic, setSelectedTopics)}
                      >
                        {topic}
                      </button>
                    )
                  })}
                </div>

                <div className="preference-chip-carousel__row">
                  {topicRowTwo.map((topic) => {
                    const isSelected = selectedTopics.includes(topic)

                    return (
                      <button
                        key={topic}
                        type="button"
                        className={
                          isSelected
                            ? 'preference-chip preference-chip--selected'
                            : 'preference-chip'
                        }
                        aria-pressed={isSelected}
                        onClick={() => handleFinalToggle(topic, setSelectedTopics)}
                      >
                        {topic}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="preferences-section" aria-label="Services you may need">
            <div className="preferences-section__header">
              <h2 className="preferences-section__title">Services you might need</h2>
              <span className="preferences-section__count">
                {selectedServices.length}/16
              </span>
            </div>

            <div className="preference-chip-carousel">
              <div className="preference-chip-carousel__track">
                <div className="preference-chip-carousel__row">
                  {serviceRowOne.map((service) => {
                    const isSelected = selectedServices.includes(service.id)

                    return (
                      <button
                        key={service.id}
                        type="button"
                        className={
                          isSelected
                            ? 'preference-chip preference-chip--selected'
                            : 'preference-chip'
                        }
                        aria-pressed={isSelected}
                        onClick={() =>
                          handleFinalToggle(service.id, setSelectedServices)
                        }
                      >
                        {service.label}
                      </button>
                    )
                  })}
                </div>

                <div className="preference-chip-carousel__row">
                  {serviceRowTwo.map((service) => {
                    const isSelected = selectedServices.includes(service.id)

                    return (
                      <button
                        key={service.id}
                        type="button"
                        className={
                          isSelected
                            ? 'preference-chip preference-chip--selected'
                            : 'preference-chip'
                        }
                        aria-pressed={isSelected}
                        onClick={() =>
                          handleFinalToggle(service.id, setSelectedServices)
                        }
                      >
                        {service.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentStep === 'living-with') {
      return (
        <section className="reason-list" aria-label="Living with options">
          {livingWithOptions.map((option) => {
            const isSelected = selectedLivingWith.includes(option)

            return (
              <div
                key={option}
                className={
                  isSelected
                    ? 'reason-card reason-card--selected'
                    : 'reason-card reason-card--plain'
                }
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedLivingWith((current) => toggleValue(current, option))
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedLivingWith((current) => toggleValue(current, option))
                  }
                }}
              >
                <div className="reason-card__main">
                  <span className="reason-card__content reason-card__content--no-icon">
                    <span className="reason-card__label">{option}</span>
                  </span>
                  <span
                    className={
                      isSelected
                        ? 'reason-card__checkbox reason-card__checkbox--selected'
                        : 'reason-card__checkbox'
                    }
                  >
                    {isSelected ? (
                      <FigmaAsset
                        src="/assets/figma/portfolio-2026/onboarding/checkmark.svg"
                        alt=""
                        displayWidth={12}
                        displayHeight={12}
                      />
                    ) : null}
                  </span>
                </div>
              </div>
            )
          })}
        </section>
      )
    }

    if (currentStep === 'home-type') {
      return (
        <section className="reason-list" aria-label="Home type options">
          {homeTypeOptions.map((option) => (
            <div
              key={option}
              className={
                selectedHomeType === option
                  ? 'reason-card reason-card--selected'
                  : 'reason-card reason-card--plain'
              }
              role="button"
              tabIndex={0}
              aria-pressed={selectedHomeType === option}
              onClick={() => {
                setSelectedHomeType(option)

                if (option !== 'Apartment') {
                  setSelectedApartmentSize(null)
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelectedHomeType(option)

                  if (option !== 'Apartment') {
                    setSelectedApartmentSize(null)
                  }
                }
              }}
            >
              <div className="reason-card__main">
                <span className="reason-card__content reason-card__content--no-icon">
                  <span className="reason-card__label">{option}</span>
                </span>
                <span
                  className={
                    selectedHomeType === option
                      ? 'reason-card__checkbox reason-card__checkbox--selected'
                      : 'reason-card__checkbox'
                  }
                >
                  {selectedHomeType === option ? (
                    <FigmaAsset
                      src="/assets/figma/portfolio-2026/onboarding/checkmark.svg"
                      alt=""
                      displayWidth={12}
                      displayHeight={12}
                    />
                  ) : null}
                </span>
              </div>

              {option === 'Apartment' ? (
                <div
                  className={
                    selectedHomeType === 'Apartment'
                      ? 'reason-card__chips reason-card__chips--visible'
                      : 'reason-card__chips'
                  }
                  aria-hidden={selectedHomeType !== 'Apartment'}
                >
                  {apartmentSizes.map((size) => (
                      <Chip
                        key={size}
                        variant="month"
                        selected={selectedApartmentSize === size}
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelectedApartmentSize(size)
                        }}
                      >
                        {size}
                      </Chip>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </section>
      )
    }

    return (
      <>
        <section className="reason-list" aria-label="Onboarding reasons">
          {reasons.map((reason) => {
            const isMoving = reason.id === 'moving'
            const isExtraSelectable = multiSelectIds.includes(
              reason.id as (typeof multiSelectIds)[number],
            )
            const isSelected = isMoving && isMovingSelected
            const isExtraSelected = selectedExtras.includes(reason.id)
            const isCardSelected = isSelected || isExtraSelected

            return (
              <div
                key={reason.id}
                className={
                  isCardSelected
                    ? 'reason-card reason-card--selected'
                    : 'reason-card'
                }
                role={isMoving || isExtraSelectable ? 'button' : undefined}
                tabIndex={isMoving || isExtraSelectable ? 0 : undefined}
                aria-pressed={
                  isMoving
                    ? isSelected
                    : isExtraSelectable
                      ? isExtraSelected
                      : undefined
                }
                onClick={
                  isMoving
                    ? () => {
                        setIsMovingSelected((current) => {
                          const next = !current

                          if (!next) {
                            setSelectedMonth(null)
                            setSelectedExtras([])
                          }

                          return next
                        })
                      }
                    : isExtraSelectable
                      ? () => {
                          setSelectedExtras((current) =>
                            toggleValue(current, reason.id),
                          )
                        }
                      : undefined
                }
                onKeyDown={
                  isMoving || isExtraSelectable
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          if (isMoving) {
                            setIsMovingSelected((current) => {
                              const next = !current

                              if (!next) {
                                setSelectedMonth(null)
                                setSelectedExtras([])
                              }

                              return next
                            })
                          } else if (isExtraSelectable) {
                            setSelectedExtras((current) =>
                              toggleValue(current, reason.id),
                            )
                          }
                        }
                      }
                    : undefined
                }
              >
                <div className="reason-card__main">
                  <span className="reason-card__content">
                    {reason.icon}
                    <span className="reason-card__label">{reason.label}</span>
                  </span>
                  <span
                    className={
                      isCardSelected
                        ? 'reason-card__checkbox reason-card__checkbox--selected'
                        : 'reason-card__checkbox'
                    }
                  >
                    {isCardSelected ? (
                      <FigmaAsset
                        src="/assets/figma/portfolio-2026/onboarding/checkmark.svg"
                        alt=""
                        displayWidth={12}
                        displayHeight={12}
                      />
                    ) : null}
                  </span>
                </div>

                {isMoving ? (
                  <div
                    className={
                      isMovingSelected
                        ? 'reason-card__chips reason-card__chips--visible'
                        : 'reason-card__chips'
                    }
                    aria-hidden={!isMovingSelected}
                  >
                    {moveMonths.map((month) => (
                      <Chip
                        key={month}
                        variant="month"
                        selected={selectedMonth === month}
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelectedMonth(month)
                        }}
                      >
                        {month}
                      </Chip>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </section>

        <button className="info-row" type="button">
          <span className="info-row__content">
            <FigmaAsset
              src="/assets/figma/portfolio-2026/onboarding/info.svg"
              alt=""
              displayWidth={13.33}
              displayHeight={13.33}
            />
            <span className="info-row__text">
              <span>We use this information to personalize your experience.</span>
              <span>By continuing, you agree to its use</span>
            </span>
          </span>
          <FigmaAsset
            src="/assets/figma/portfolio-2026/onboarding/chevron-right.svg"
            alt=""
            displayWidth={5.95}
            displayHeight={10.09}
          />
        </button>
      </>
    )
  }

  return (
    <div
      className={
        isThumbnail
          ? 'portfolio-prototype portfolio-prototype--thumbnail'
          : 'portfolio-prototype portfolio-prototype--full'
      }
    >
      {isThumbnail ? null : (
        <div ref={cursorRef} aria-hidden="true" className="ios-cursor" />
      )}

      <PrototypeScreen contentHeight={screenHeight} variant="bare">
        <div className="onboarding-screen">
          <div className="status-bar">
            <div className="status-bar__time">9:41</div>
            <FigmaAsset
              src="/assets/figma/portfolio-2026/onboarding/status-levels.svg"
              alt=""
              displayWidth={68}
              displayHeight={50}
            />
          </div>

          {currentStep === 'intro' ? (
            <TopNav className="intro-top-nav" />
          ) : currentStep === 'recommendations' ? (
            <TopNav
              className="completion-top-nav"
              trailing={
                <IconButton
                  label="Close"
                  onClick={() => setStep('interests')}
                >
                  <FigmaAsset
                    src="/assets/figma/portfolio-2026/recommendations/close.svg"
                    alt=""
                    displayWidth={19.8}
                    displayHeight={19.8}
                  />
                </IconButton>
              }
            />
          ) : (
            <TopNav
              className="top-nav"
              leading={
                <IconButton
                  label={currentStep === 'interests' ? 'Close' : 'Back'}
                  onClick={handleBack}
                >
                  {currentStep === 'interests' ? (
                    <span className="icon-close" />
                  ) : (
                    <FigmaAsset
                      src="/assets/figma/portfolio-2026/home-type/arrow-left.svg"
                      alt=""
                      displayWidth={20.5}
                      displayHeight={18.87}
                    />
                  )}
                </IconButton>
              }
              center={<ProgressBar fillClassName={progressClassName} />}
            />
          )}

          {currentStep === 'intro' ? (
            <div className="intro-step">
              <AnimatedIntroScenario onStart={() => setStep('interests')} />
            </div>
          ) : currentStep === 'recommendations' ? (
            <div className="recommendations-step">
              <img
                src={pointGetGif}
                alt=""
                className="recommendations-step__gif"
                width={200}
                height={200}
              />

              <section
                className="recommendations-step__hero"
                aria-label="Recommendations ready"
              >
                <div className="recommendations-step__copy">
                  <h1 className="recommendations-step__title">Your feed is ready</h1>
                </div>
                <button type="button" className="recommendations-step__cta">
                  Go to your feed
                </button>
              </section>

              <section
                className="recommendations-list"
                aria-label="Recommended actions"
              >
                {recommendationCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    className="recommendation-card"
                  >
                    <span className="recommendation-card__icon">
                      <FigmaAsset
                        src={card.iconSrc}
                        alt=""
                        displayWidth={card.iconWidth}
                        displayHeight={card.iconHeight}
                      />
                    </span>
                    <span className="recommendation-card__label">{card.label}</span>
                    <FigmaAsset
                      src="/assets/figma/portfolio-2026/onboarding/chevron-right.svg"
                      alt=""
                      displayWidth={9.2}
                      displayHeight={15.6}
                    />
                  </button>
                ))}
              </section>
            </div>
          ) : (
            <>
              <header className="screen-header">
                <AnimatedTextBlock
                  lines={headerLines}
                  delay={0.08}
                  onComplete={() => setIsSurveyContentVisible(true)}
                />
              </header>
              <div
                className={
                  isSurveyContentVisible
                    ? 'survey-step-shell survey-step-shell--visible'
                    : 'survey-step-shell'
                }
              >
                {renderSurveyStep()}
              </div>
            </>
          )}

          {currentStep === 'recommendations' || currentStep === 'intro' ? null : (
            <div className="screen-spacer" />
          )}

          <footer className="bottom-cta">
            {currentStep === 'recommendations' || currentStep === 'intro' ? null : (
              <div
                className={
                  isSurveyContentVisible
                    ? 'bottom-cta__inner bottom-cta__inner--visible'
                    : 'bottom-cta__inner'
                }
              >
                {currentStep === 'final-preferences' ? (
                <Button
                  enabled={isFinalButtonEnabled}
                  disabled={!isFinalButtonEnabled}
                  onClick={() => setStep('recommendations')}
                >
                  Complete
                </Button>
              ) : currentStep === 'living-with' ? (
                <Button
                  enabled={selectedLivingWith.length > 0}
                  disabled={selectedLivingWith.length === 0}
                  onClick={enterFinalPreferences}
                >
                  Next
                </Button>
              ) : currentStep === 'home-type' ? (
                <Button
                  enabled={Boolean(selectedApartmentSize)}
                  disabled={!selectedApartmentSize}
                  onClick={() => setStep('living-with')}
                >
                  Next
                </Button>
              ) : (
                <Button
                  enabled={Boolean(selectedMonth)}
                  disabled={!selectedMonth}
                  onClick={() => setStep('home-type')}
                >
                  Next
                </Button>
              )}
              </div>
            )}
            <HomeIndicator />
          </footer>
        </div>
      </PrototypeScreen>
    </div>
  )
}

type FigmaIconProps = {
  src: string
  width: number
  height: number
}

function FigmaIcon({ src, width, height }: FigmaIconProps) {
  return (
    <span className="figma-icon">
      <FigmaAsset src={src} alt="" displayWidth={width} displayHeight={height} />
    </span>
  )
}

function BabyBottleIcon() {
  return (
    <span className="figma-icon babybottle-icon">
      <FigmaAsset
        src="/assets/figma/portfolio-2026/onboarding/babybottle.svg"
        alt=""
        displayWidth={15.2}
        displayHeight={20.84}
      />
      <span className="babybottle-icon__line babybottle-icon__line--top">
        <FigmaAsset
          src="/assets/figma/portfolio-2026/onboarding/babybottle-line-2.svg"
          alt=""
          displayWidth={3.6}
          displayHeight={1.2}
        />
      </span>
      <span className="babybottle-icon__line babybottle-icon__line--bottom">
        <FigmaAsset
          src="/assets/figma/portfolio-2026/onboarding/babybottle-line-1.svg"
          alt=""
          displayWidth={3.6}
          displayHeight={1.2}
        />
      </span>
    </span>
  )
}

type CartIconProps = {
  src: string
}

function CartIcon({ src }: CartIconProps) {
  return (
    <span className="figma-icon">
      <FigmaAsset
        src={src}
        alt=""
        displayWidth={20.83}
        displayHeight={15.71}
      />
    </span>
  )
}

type AnimatedIntroScenarioProps = {
  onStart: () => void
}

function AnimatedIntroScenario({ onStart }: AnimatedIntroScenarioProps) {
  return (
    <div>
      <img
        src={movingGif}
        alt=""
        className="intro-step__gif"
        width={130}
        height={130}
      />
      <div className="intro-step__copy">
        <p className="intro-step__title">Let&apos;s personalize your feed</p>
        <p className="intro-step__description">
          Answer a few quick questions so we can tailor recommendations for you.
        </p>
        <button
          type="button"
          className="intro-step__cta intro-step__cta--visible"
          onClick={onStart}
        >
          Get started
        </button>
      </div>
    </div>
  )
}

type AnimatedTextBlockProps = {
  lines: Array<{
    as: 'h1' | 'p'
    className: string
    text: string
  }>
  delay?: number
  onComplete?: () => void
}

function AnimatedTextBlock({
  lines,
  delay = 0,
  onComplete,
}: AnimatedTextBlockProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const onCompleteRef = useRef(onComplete)
  const textKey = lines.map((line) => line.text).join('|')

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useLayoutEffect(() => {
    const element = rootRef.current

    if (!element) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const chars = element.querySelectorAll<HTMLElement>('[data-char]')

    if (mediaQuery.matches || chars.length === 0) {
      onCompleteRef.current?.()
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(chars, {
        opacity: 0,
      })

      gsap.to(chars, {
        opacity: 1,
        duration: 0.01,
        ease: 'none',
        stagger: 0.027,
        delay,
        onComplete: () => onCompleteRef.current?.(),
      })
    }, element)

    return () => ctx.revert()
  }, [delay, textKey])

  return (
    <div ref={rootRef} aria-label={lines.map((line) => line.text).join(' ')}>
      {lines.map((line) => {
        const Tag = line.as

        return (
          <Tag key={`${line.as}-${line.text}`} className={line.className}>
            {Array.from(line.text).map((char, index) => (
              <span
                key={`${line.text}-${char}-${index}`}
                data-char
                className="animated-char"
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </Tag>
        )
      })}
    </div>
  )
}

export default Portfolio2026Prototype
