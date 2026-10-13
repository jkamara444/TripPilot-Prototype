import {
  Badge,
  Button as VisaButton,
  ContentCard,
  Nav,
  Panel,
  SectionMessage,
  Surface,
  Textarea,
  Typography,
  VisaLogo,
} from "@visa/nova-react"
import {
  GenericDocumentLow,
  VisaAccountLow,
  VisaAddLow,
  VisaArrowBackLow,
  VisaCalendarLow,
  VisaCardCorporateLow,
  VisaChatAiLow,
  VisaCheckmarkLow,
  VisaChevronRightLow,
  VisaCloseLow,
  VisaHomeLow,
  VisaMapLocationLow,
  VisaMenuLow,
  VisaNotificationsLow,
  VisaReceiptLow,
  VisaSecurityLockLow,
  VisaSendLow,
  VisaTimeLow,
  VisaTransactionsLow,
  VisaTransitAirplaneLow,
  VisaWarningLow,
} from "@visa/nova-icons-react"
import {
  useState,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react"

type Screen = "home" | "intent" | "recommended" | "review" | "active" | "disruption" | "complete"

type IconName = "add" | "back" | "calendar" | "card" | "check" | "chevron" | "clock" | "close" | "expense" | "flight" | "home" | "location" | "lock" | "lodging" | "menu" | "notification" | "person" | "policy" | "send" | "spark" | "transactions" | "warning"

function Icon({ name, size = 20 }: { name: IconName, size?: number }) {
  const icons: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
    add: VisaAddLow,
    back: VisaArrowBackLow,
    calendar: VisaCalendarLow,
    card: VisaCardCorporateLow,
    check: VisaCheckmarkLow,
    chevron: VisaChevronRightLow,
    clock: VisaTimeLow,
    close: VisaCloseLow,
    expense: VisaReceiptLow,
    flight: VisaTransitAirplaneLow,
    home: VisaHomeLow,
    location: VisaMapLocationLow,
    lock: VisaSecurityLockLow,
    lodging: VisaMapLocationLow,
    menu: VisaMenuLow,
    notification: VisaNotificationsLow,
    person: VisaAccountLow,
    policy: GenericDocumentLow,
    send: VisaSendLow,
    spark: VisaChatAiLow,
    transactions: VisaTransactionsLow,
    warning: VisaWarningLow,
  }
  const VisaIcon = icons[name]

  return (
    <VisaIcon
      aria-hidden="true"
      className={name === "check" ? "icon confirmation-check" : "icon"}
      height={size}
      width={size}
    />
  )
}

function Button({
  children,
  onClick,
  secondary = false,
  compact = false,
}: {
  children: ReactNode
  onClick: () => void
  secondary?: boolean
  compact?: boolean
}) {
  return (
    <VisaButton
      buttonSize={compact ? "small" : "large"}
      className={`trip-button ${compact ? "trip-button-compact" : ""}`}
      colorScheme={secondary ? "secondary" : "primary"}
      onClick={onClick}
      type="button"
    >
      <span>{children}</span>
    </VisaButton>
  )
}

function VisaMark() {
  return <VisaLogo className="visa-mark" aria-label="Visa" />
}

function AppHeader({
  title,
  subtitle,
  onBack,
  brand = false,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
  brand?: boolean
}) {
  return (
    <header className="app-header">
      <div className="nav-row">
        {onBack ? (
          <VisaButton
            className="icon-button"
            colorScheme="tertiary"
            iconButton
            onClick={onBack}
            type="button"
            aria-label="Go back"
          >
            <Icon name="back" size={24} />
          </VisaButton>
        ) : brand ? (
          <VisaButton
            className="icon-button"
            colorScheme="tertiary"
            iconButton
            type="button"
            aria-label="Menu"
          >
            <Icon name="menu" size={24} />
          </VisaButton>
        ) : (
          <span className="nav-spacer" />
        )}
        <div className="nav-copy">
          {!brand ? (
            <>
              <Typography
                className="nav-title"
                tag="div"
                variant="headline-4"
                role="heading"
                aria-level={1}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  className="eyebrow"
                  colorScheme="subtle"
                  tag="div"
                  variant="label-small"
                >
                  {subtitle}
                </Typography>
              )}
            </>
          ) : (
            <VisaMark />
          )}
        </div>
        <VisaButton
          className="icon-button"
          colorScheme="tertiary"
          iconButton
          type="button"
          aria-label={brand ? "Profile" : "More options"}
        >
          <Icon name={brand ? "person" : "menu"} size={24} />
        </VisaButton>
      </div>
    </header>
  )
}

function BottomNav({
  active = "home",
}: {
  active?: "home" | "trips" | "expenses" | "profile"
}) {
  const items: { id: typeof active, label: string, icon: IconName }[] = [
    { id: "home", label: "Home", icon: "home" },
    { id: "trips", label: "Trips", icon: "flight" },
    { id: "expenses", label: "Expenses", icon: "expense" },
    { id: "profile", label: "Profile", icon: "person" },
  ]

  return (
    <Nav
      className="bottom-nav"
      orientation="horizontal"
      aria-label="Primary navigation"
    >
      {items.map((item) => (
        <VisaButton
          className={active === item.id ? "active" : ""}
          colorScheme="tertiary"
          key={item.id}
          stacked
          type="button"
        >
          <Icon name={item.icon} size={24} />
          <span>{item.label}</span>
        </VisaButton>
      ))}
    </Nav>
  )
}

function PolicyPill({
  children,
  gold = false,
}: {
  children: ReactNode
  gold?: boolean
}) {
  return (
    <div className={`policy-pill ${gold ? "gold" : ""}`}>
      <span className="policy-pill-icon">
        <Icon name={gold ? "card" : "check"} size={18} />
      </span>
      <span className="policy-pill-text">{children}</span>
    </div>
  )
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="screen">
      <AppHeader brand title="Good morning, Maya" />
      <main className="content home-content">
        <div className="home-greeting">
          <Typography tag="div" variant="headline-3">
            Good morning, Maya
          </Typography>
          <Typography colorScheme="subtle" tag="div" variant="body-3">
            Secure Travel Pass
          </Typography>
        </div>
        <Surface className="hero-card">
          <div className="hero-icon">
            <Icon name="spark" size={24} />
          </div>
          <div className="hero-kicker">TripPilot</div>
          <div className="hero-title" role="heading" aria-level={2}>
            Tell TripPilot where work needs you.
          </div>
          <p>
            Describe the trip you need. TripPilot will build an option around
            your schedule, company travel policy, and saved preferences.
          </p>
          <Button onClick={onStart}>Plan a work trip</Button>
          <div className="secure-note">
            <Icon name="lock" size={16} /> Corporate Visa payment ready
          </div>
        </Surface>

        <div className="section-heading">
          <div>
            <div className="overline">Overview</div>
            <div className="section-title" role="heading" aria-level={2}>
              Your travel
            </div>
          </div>
          <span className="quiet-link">See all</span>
        </div>

        <section className="empty-card">
          <div className="empty-icon">
            <Icon name="flight" size={22} />
          </div>
          <div>
            <div className="card-title">No upcoming trips</div>
            <p>Your confirmed business travel will appear here.</p>
          </div>
        </section>

        <section className="protection-row">
          <div className="protection-icon">
            <Icon name="lock" size={18} />
          </div>
          <div>
            <div className="small-title">Travel with confidence</div>
            <p>
              Your saved company travel rules and payment settings are ready.
            </p>
          </div>
          <Icon name="chevron" size={18} />
        </section>
      </main>
      <BottomNav />
    </div>
  )
}

function IntentScreen({
  onBack,
  onFind,
}: {
  onBack: () => void
  onFind: () => void
}) {
  return (
    <div className="screen">
      <AppHeader title="Plan a trip" subtitle="TripPilot" onBack={onBack} />
      <main className="content intent-content">
        <div className="chat-thread" aria-label="Trip planning conversation">
          <div className="sent-message">
            <div className="message-meta">You</div>
            <div className="user-bubble">
              “I need to be in Chicago by 10 AM Tuesday and home Thursday night.”
            </div>
          </div>
          <div className="received-message">
            <div className="assistant-avatar">
              <Icon name="spark" size={20} />
            </div>
            <div className="received-column">
              <div className="message-meta">TripPilot</div>
              <div className="prompt-bubble">
                Got it — arrive before 10 AM Tuesday, return Thursday night.
              </div>
            </div>
          </div>
        </div>

        <section className="context-card">
          <div className="context-heading">
            <div>
              <div className="card-title">Your saved travel context</div>
            </div>
            <span className="edit-link">Edit</span>
          </div>
          <div className="context-list">
            <div className="context-row">
              <span className="context-icon">
                <Icon name="flight" size={16} />
              </span>
              <span className="context-copy">
                <strong>Flight</strong>
                <span>Aisle · United preferred</span>
              </span>
            </div>
            <div className="context-row">
              <span className="context-icon">
                <Icon name="lodging" size={16} />
              </span>
              <span className="context-copy">
                <strong>Hotel</strong>
                <span>Marriott Bonvoy</span>
              </span>
            </div>
            <div className="context-row">
              <span className="context-icon">
                <Icon name="policy" size={16} />
              </span>
              <span className="context-copy">
                <strong>Policy</strong>
                <span>Economy · ≤ $220/night</span>
              </span>
            </div>
            <div className="context-row">
              <span className="context-icon">
                <Icon name="card" size={16} />
              </span>
              <span className="context-copy">
                <strong>Payment</strong>
                <span>Corporate Visa ••4821</span>
              </span>
            </div>
          </div>
        </section>
      </main>
      <div className="sticky-action">
        <div className="chat-composer">
          <VisaButton
            aria-label="Add attachment"
            className="composer-icon"
            colorScheme="tertiary"
            iconButton
            type="button"
          >
            <Icon name="add" size={20} />
          </VisaButton>
          <Textarea
            aria-label="Add trip details"
            className="composer-input"
            fixed
            placeholder="Add trip details…"
            rows={1}
          />
          <VisaButton
            aria-label="Send trip details"
            className="composer-icon"
            colorScheme="tertiary"
            iconButton
            type="button"
          >
            <Icon name="send" size={20} />
          </VisaButton>
        </div>
        <Button onClick={onFind}>Find my trip</Button>
      </div>
    </div>
  )
}

function FlightRow({
  depart,
  arrive,
  route,
  label,
}: {
  depart: string
  arrive: string
  route: string
  label: string
}) {
  return (
    <div className="flight-row">
      <div className="brand-tile">UA</div>
      <div className="flight-main">
        <div className="flight-times">
          <strong>{depart}</strong>
          <span className="flight-line" />
          <strong>{arrive}</strong>
        </div>
        <div className="flight-meta">
          {route} · {label}
        </div>
      </div>
    </div>
  )
}

function RecommendationScreen({
  onBack,
  onApprove,
  onWhy,
}: {
  onBack: () => void
  onApprove: () => void
  onWhy: () => void
}) {
  const [alternatives, setAlternatives] = useState(false)

  return (
    <div className="screen">
      <AppHeader
        title="Recommended trip"
        subtitle="TripPilot recommendation"
        onBack={onBack}
      />
      <main className="content recommendation-content">
        <div className="recommendation-intro">
          <div>
            <div className="step-label">RECOMMENDED</div>
            <div
              className="page-title compact-title"
              role="heading"
              aria-level={2}
            >
              Chicago · Jun 16–19
            </div>
          </div>
          <div className="total-block">
            <small>Total</small>
            <strong>$907</strong>
          </div>
        </div>
        <Badge badgeType="stable" className="policy-strip">
          <Icon name="check" size={15} /> In policy
        </Badge>

        <ContentCard className="trip-card">
          <div className="trip-section">
            <div className="trip-section-head">
              <span>
                <Icon name="flight" size={16} /> MON, JUN 16
              </span>
              <strong>United 211</strong>
            </div>
            <FlightRow
              depart="6:40 PM"
              arrive="8:14 PM"
              route="SFO → ORD"
              label="Nonstop · Economy"
            />
          </div>
          <div className="trip-section hotel-section">
            <div className="trip-section-head">
              <span>3 NIGHTS</span>
              <strong>$193/night</strong>
            </div>
            <div className="hotel-row">
              <div className="hotel-monogram">M</div>
              <div>
                <strong>Marriott Downtown</strong>
                <span>540 N Michigan Ave · King room</span>
              </div>
            </div>
          </div>
          <div className="trip-section">
            <div className="trip-section-head">
              <span>
                <Icon name="flight" size={16} /> THU, JUN 19
              </span>
              <strong>United 672</strong>
            </div>
            <FlightRow
              depart="6:15 PM"
              arrive="8:52 PM"
              route="ORD → SFO"
              label="Nonstop · Economy"
            />
          </div>
        </ContentCard>

        <div className="pill-grid">
          <PolicyPill>12+ hr arrival buffer</PolicyPill>
          <PolicyPill>United + Marriott preferences</PolicyPill>
          <PolicyPill>Within policy</PolicyPill>
          <PolicyPill gold>Visa ••4821</PolicyPill>
        </div>

        <VisaButton
          className="why-row"
          colorScheme="tertiary"
          onClick={onWhy}
          type="button"
        >
          <span className="why-icon">
            <Icon name="spark" size={17} />
          </span>
          <span>
            <strong>Why this trip?</strong>
            <small>See how TripPilot chose it</small>
          </span>
          <Icon name="chevron" size={18} />
        </VisaButton>

        {alternatives && (
          <div className="alternatives-panel">
            <div>
              <strong>2 more policy-ready options</strong>
              <span>From $971 · Similar arrival times</span>
            </div>
            <span className="alt-badge">+ $64</span>
          </div>
        )}
        <Button onClick={onApprove}>Approve &amp; book</Button>
        <VisaButton
          className="text-button"
          colorScheme="tertiary"
          onClick={() => setAlternatives(!alternatives)}
          type="button"
        >
          {alternatives ? "Hide alternatives" : "View 2 alternatives"}
        </VisaButton>
      </main>
    </div>
  )
}

function WhySheet({ onClose }: { onClose: () => void }) {
  const reasons = [
    [
      "clock",
      "Arrives 12+ hours before meeting",
      "Adds buffer for delays and preparation.",
    ],
    [
      "policy",
      "In policy",
      "Economy flight and hotel under the company’s $220/night limit.",
    ],
    ["person", "Matches your preferences", "United, Marriott, and aisle seat."],
    [
      "expense",
      "$64 lower than the next recommended compliant option",
      "Lower cost than the next recommended compliant option.",
    ],
  ] as const

  return (
    <div
      className="sheet-layer"
      role="dialog"
      aria-modal="true"
      aria-label="Why this trip"
    >
      <VisaButton
        className="sheet-scrim"
        colorScheme="tertiary"
        onClick={onClose}
        subtle
        type="button"
        aria-label="Close explanation"
      />
      <Panel className="bottom-sheet">
        <div className="sheet-scroll">
          <div className="sheet-header">
            <div>
              <div className="overline">WHY THIS TRIP</div>
              <div className="sheet-title" role="heading" aria-level={2}>
                Why this trip?
              </div>
            </div>
            <VisaButton
              className="icon-button"
              colorScheme="tertiary"
              iconButton
              onClick={onClose}
              type="button"
              aria-label="Close"
            >
              <Icon name="close" size={20} />
            </VisaButton>
          </div>
          <p className="sheet-intro">
            TripPilot ranked the options that met your company rules, then
            prioritized your meeting time and saved preferences.
          </p>
          <div className="reason-list">
            {reasons.map(([icon, title, copy]) => (
              <div className="reason-row" key={title}>
                <span className="reason-icon">
                  <Icon name={icon} size={18} />
                </span>
                <span className="reason-copy">
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </span>
                <span className="reason-check">
                  <Icon name="check" size={16} />
                </span>
              </div>
            ))}
          </div>
          <div className="insight-note">
            <Icon name="spark" size={16} /> Compared with other policy-compliant
            options.
          </div>
        </div>
        <div className="sheet-footer">
          <Button onClick={onClose}>Got it</Button>
        </div>
      </Panel>
    </div>
  )
}

function SummaryCard() {
  return (
    <section className="summary-card">
      <div className="summary-head">
        <div>
          <div className="overline">CHICAGO · JUN 16–19</div>
          <div className="card-title">3 nights · Round trip</div>
        </div>
        <strong>$907</strong>
      </div>
      <div className="summary-row">
        <span className="summary-icon">
          <Icon name="flight" size={16} />
        </span>
        <span>
          <strong>United round trip</strong>
          <small>Mon 6:40 PM · Thu 6:15 PM</small>
        </span>
        <b>$328</b>
      </div>
      <div className="summary-row">
        <span className="summary-icon lodging-monogram">M</span>
        <span>
          <strong>Marriott Downtown</strong>
          <small>3 nights · King room</small>
        </span>
        <b>$579</b>
      </div>
    </section>
  )
}

function ReviewScreen({
  onBack,
  onBooked,
}: {
  onBack: () => void
  onBooked: () => void
}) {
  const [booked, setBooked] = useState(false)

  if (booked) {
    return (
      <div className="screen confirmation-screen">
        <AppHeader title="Trip booked" subtitle="Chicago · Jun 16–19" />
        <main className="content confirmation-content">
          <SectionMessage className="booking-success" messageType="success">
            <Icon name="check" size={22} />
            <div>
              <Typography tag="div" variant="body-2-bold">
                Trip booked
              </Typography>
              <Typography tag="div" variant="body-2">
                You’re all set for Chicago. Your itinerary is ready in
                TripPilot.
              </Typography>
            </div>
          </SectionMessage>
          <div className="confirmation-ticket">
            <div className="ticket-route">
              <span>SFO</span>
              <span className="ticket-plane">
                <Icon name="flight" size={17} />
              </span>
              <span>ORD</span>
            </div>
            <div className="ticket-dates">
              MON, JUN 16 <span /> THU, JUN 19
            </div>
            <div className="ticket-footer">
              <span>United · Marriott</span>
              <strong>$907</strong>
            </div>
          </div>
          <Button onClick={onBooked}>View my itinerary</Button>
          <div className="secure-note">
            <Icon name="lock" size={16} /> Paid with Corporate Visa ••4821
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="screen">
      <AppHeader
        title="Review & book"
        subtitle="Final approval"
        onBack={onBack}
      />
      <main className="content review-content">
        <div className="page-title compact-title" role="heading" aria-level={2}>
          One last look
        </div>
        <p className="page-subtitle">Nothing is purchased until you approve.</p>
        <div className="review-section-label">
          <Icon name="flight" size={16} />
          <span>Trip</span>
        </div>
        <SummaryCard />
        <div className="review-section-label">
          <Icon name="card" size={16} />
          <span>Payment</span>
        </div>
        <section className="payment-card">
          <div className="payment-top">
            <div className="visa-chip">VISA</div>
            <span className="approved-badge">
              <Icon name="check" size={16} /> Approved
            </span>
          </div>
          <div className="payment-label">Corporate Visa</div>
          <div className="payment-number">•••• •••• •••• 4821</div>
          <div className="payment-bottom">
            <span>MAYA CHEN</span>
            <span>SECURE PAYMENT</span>
          </div>
        </section>
        <div className="review-section-label">
          <Icon name="check" size={16} />
          <span>Approval</span>
        </div>
        <div className="assurance-list">
          <div>
            <Icon name="check" size={15} />
            <span>Trip meets company travel policy</span>
          </div>
          <div>
            <Icon name="check" size={15} />
            <span>Loyalty numbers applied</span>
          </div>
          <div>
            <Icon name="lock" size={15} />
            <span>Payment will use Corporate Visa ••4821</span>
          </div>
        </div>
      </main>
      <div className="sticky-action">
        <div className="price-line">
          <span>Trip total</span>
          <strong>$907</strong>
        </div>
        <Button onClick={() => setBooked(true)}>Approve $907 &amp; book</Button>
      </div>
    </div>
  )
}

function TimelineItem({
  time,
  title,
  detail,
  icon,
  active = false,
  last = false,
}: {
  time: string
  title: string
  detail: string
  icon: IconName
  active?: boolean
  last?: boolean
}) {
  return (
    <div
      className={`timeline-item ${active ? "current" : ""} ${last ? "last" : ""
        }`}
    >
      <div className="timeline-time">{time}</div>
      <div className="timeline-track">
        <span>
          <Icon name={icon} size={15} />
        </span>
      </div>
      <div className="timeline-copy">
        <strong>{title}</strong>
        <small>{detail}</small>
        {active && <em>ON TRACK</em>}
      </div>
    </div>
  )
}

function FutureBadge() {
  return (
    <Badge badgeType="subtle" className="future-badge" clear>
      Future experience
    </Badge>
  )
}

function ActiveScreen({
  onAlert,
  onBack,
}: {
  onAlert: () => void
  onBack: () => void
}) {
  return (
    <div className="screen">
      <AppHeader
        title="Chicago"
        subtitle="Active trip · Jun 16–19"
        onBack={onBack}
      />
      <main className="content active-content">
        <FutureBadge />
        <SectionMessage className="on-track" messageType="success">
          <span className="track-check">
            <Icon name="check" size={20} />
          </span>
          <div>
            <small>TRIP STATUS</small>
            <strong>Everything on track</strong>
          </div>
        </SectionMessage>
        <div className="section-heading itinerary-heading">
          <div>
            <div className="overline">YOUR ITINERARY</div>
            <div className="section-title">Chicago timeline</div>
          </div>
          <span className="weather">72° · Sunny</span>
        </div>

        <section className="day-block">
          <div className="day-label">
            <strong>MON</strong>
            <span>JUN 16</span>
          </div>
          <TimelineItem
            time="6:40 PM"
            title="Flight to Chicago"
            detail="UA 211 · SFO → ORD"
            icon="flight"
          />
          <TimelineItem
            time="9:15 PM"
            title="Check in"
            detail="Marriott Downtown · 3 nights"
            icon="lodging"
            last
          />
        </section>
        <section className="day-block">
          <div className="day-label">
            <strong>TUE</strong>
            <span>JUN 17</span>
          </div>
          <TimelineItem
            time="10:00 AM"
            title="Client strategy meeting"
            detail="Aon Center · 200 E Randolph St"
            icon="calendar"
            active
            last
          />
        </section>
        <section className="day-block">
          <div className="day-label">
            <strong>THU</strong>
            <span>JUN 19</span>
          </div>
          <TimelineItem
            time="12:00 PM"
            title="Hotel checkout"
            detail="Receipt linked to trip"
            icon="lodging"
          />
          <TimelineItem
            time="6:15 PM"
            title="Return to San Francisco"
            detail="UA 672 · ORD → SFO"
            icon="flight"
            last
          />
        </section>

        <VisaButton
          className="scenario-card"
          colorScheme="tertiary"
          onClick={onAlert}
          type="button"
        >
          <span className="scenario-icon">
            <Icon name="notification" size={18} />
          </span>
          <span className="scenario-copy">
            <strong>View disruption scenario</strong>
            <small>See how TripPilot helps when plans change</small>
          </span>
          <Icon name="chevron" size={18} />
        </VisaButton>
      </main>
      <BottomNav active="trips" />
    </div>
  )
}

function DisruptionScreen({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: () => void
}) {
  const [approved, setApproved] = useState(false)

  return (
    <div className="screen">
      <AppHeader
        title="Travel alert"
        subtitle="Chicago · Return flight"
        onBack={onBack}
      />
      <main className="content disruption-content">
        <FutureBadge />
        <SectionMessage className="disruption-message" messageType="warning">
          <span className="disruption-message-icon">
            <Icon name="warning" size={22} />
          </span>
          <div>
            <Typography tag="div" variant="body-2-bold">
              Your Thursday flight was canceled.
            </Typography>
            <Typography tag="div" variant="body-2">
              I found a replacement that still gets you home Thursday and stays
              in policy.
            </Typography>
          </div>
        </SectionMessage>

        <Surface className="swap-card">
          <div className="old-flight">
            <span>ORIGINAL · CANCELED</span>
            <div>
              <strong>UA 672 · 6:15 PM</strong>
              <small>ORD → SFO</small>
            </div>
          </div>
          <div className="swap-divider">
            <span>Recommended replacement</span>
          </div>
          <div className="new-flight">
            <div className="new-flight-head">
              <div className="brand-tile">UA</div>
              <span className="best-badge">
                <Icon name="spark" size={16} /> RECOMMENDED
              </span>
            </div>
            <div className="replacement-times">
              <div>
                <small>DEPARTS</small>
                <strong>7:10 PM</strong>
              </div>
              <span className="flight-line" />
              <div>
                <small>ARRIVES</small>
                <strong>9:44 PM</strong>
              </div>
            </div>
            <div className="new-meta">
              <span>UA 729 · Nonstop</span>
              <strong>+$47</strong>
            </div>
          </div>
        </Surface>

        <Surface className="impact-card">
          <div className="overline">WHAT CHANGES</div>
          <div>
            <span>
              <Icon name="clock" size={16} /> Arrival
            </span>
            <strong>52 min later</strong>
          </div>
          <div>
            <span>
              <Icon name="lodging" size={16} /> Hotel
            </span>
            <strong>Unchanged</strong>
          </div>
          <div>
            <span>
              <Icon name="policy" size={16} /> Policy
            </span>
            <strong className="positive">Within policy</strong>
          </div>
          <div>
            <span>
              <Icon name="person" size={16} /> Seat
            </span>
            <strong className="positive">Aisle available</strong>
          </div>
        </Surface>

        {!approved ? (
          <>
            <Button onClick={() => setApproved(true)}>Approve change</Button>
            <div className="nothing-note">
              <Icon name="lock" size={16} /> Nothing changes until you approve.
            </div>
          </>
        ) : (
          <SectionMessage className="change-confirmed" messageType="success">
            <span>
              <Icon name="check" size={18} />
            </span>
            <div>
              <strong>Change confirmed</strong>
              <small>UA 729 is now in your itinerary.</small>
            </div>
            <Button onClick={onComplete} secondary compact>
              Continue
            </Button>
          </SectionMessage>
        )}
      </main>
    </div>
  )
}

function CompleteScreen({ onHome }: { onHome: () => void }) {
  const [sent, setSent] = useState(false)

  return (
    <div className="screen">
      <AppHeader title="Trip complete" subtitle="Chicago · Jun 16–19" />
      <main className="content complete-content">
        <FutureBadge />
        <section className="expense-hero">
          <div className="expense-hero-header">
            <div className="expense-hero-icon">
              <Icon name="transactions" size={32} />
            </div>
            <div>
              <div className="overline">EXPENSE READY</div>
              <div
                className="page-title compact-title"
                role="heading"
                aria-level={2}
              >
                Almost done, Maya.
              </div>
            </div>
          </div>
          <p>TripPilot matched your trip charges. One needs a note.</p>
          <div className="match-meter">
            <span>
              <i />
            </span>
            <strong>3 of 4 ready</strong>
          </div>
        </section>

        <section className="expense-list">
          <div className="expense-row">
            <span className="expense-row-icon">
              <Icon name="flight" size={17} />
            </span>
            <span>
              <strong>United Airlines</strong>
              <small>Jun 16 · Flight</small>
            </span>
            <span className="expense-row-meta">
              <b>$328</b>
              <em>
                <Icon name="check" size={16} /> Matched
              </em>
            </span>
          </div>
          <div className="expense-row">
            <span className="expense-row-icon">
              <Icon name="lodging" size={17} />
            </span>
            <span>
              <strong>Marriott Downtown</strong>
              <small>Jun 19 · Lodging</small>
            </span>
            <span className="expense-row-meta">
              <b>$579</b>
              <em>
                <Icon name="check" size={16} /> Matched
              </em>
            </span>
          </div>
          <div className="expense-row">
            <span className="expense-row-icon">
              <Icon name="location" size={17} />
            </span>
            <span>
              <strong>Airport ride</strong>
              <small>Jun 19 · Ground transport</small>
            </span>
            <span className="expense-row-meta">
              <b>$42</b>
              <em>
                <Icon name="check" size={16} /> Matched
              </em>
            </span>
          </div>
          <div className="expense-row needs-note">
            <span className="expense-row-icon">
              <Icon name="expense" size={17} />
            </span>
            <span>
              <strong>Avec Chicago</strong>
              <small>Jun 18 · Dinner</small>
            </span>
            <span className="expense-row-meta">
              <b>$38</b>
              <em>Needs purpose</em>
            </span>
            <VisaButton
              className="purpose-button"
              colorScheme="secondary"
              type="button"
            >
              Add business purpose <Icon name="chevron" size={16} />
            </VisaButton>
          </div>
        </section>

        <div className="expense-total">
          <span>Total trip spend</span>
          <strong>$987</strong>
        </div>
        {!sent ? (
          <Button onClick={() => setSent(true)}>Send to expense system</Button>
        ) : (
          <SectionMessage className="sent-card" messageType="success">
            <span>
              <Icon name="check" size={19} />
            </span>
            <div>
              <strong>Expenses sent</strong>
              <small>Sent to your company’s expense system.</small>
            </div>
            <VisaButton colorScheme="tertiary" onClick={onHome} type="button">
              Done
            </VisaButton>
          </SectionMessage>
        )}
        <div className="action-caption">
          {sent
            ? "You can complete final review there."
            : "You can add the dinner purpose in your expense system."}
        </div>
      </main>
      <BottomNav active="expenses" />
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [showWhy, setShowWhy] = useState(false)

  return (
    <div className="prototype-stage">
      <div className="prototype-label">
        <span>VISA TRIPPILOT</span>
        <strong>Mobile prototype</strong>
        <small>Secure and guided business travel from trip request to expense management</small>
        <p className="prototype-disclaimer">
          Illustrative prototype. Trip details, prices, names, and figures are
          fictional and shown for case-study purposes only.
        </p>
      </div>
      <div className="phone-shell">
        {screen === "home" && (
          <HomeScreen onStart={() => setScreen("intent")} />
        )}
        {screen === "intent" && (
          <IntentScreen
            onBack={() => setScreen("home")}
            onFind={() => setScreen("recommended")}
          />
        )}
        {screen === "recommended" && (
          <RecommendationScreen
            onBack={() => setScreen("intent")}
            onApprove={() => setScreen("review")}
            onWhy={() => setShowWhy(true)}
          />
        )}
        {screen === "review" && (
          <ReviewScreen
            onBack={() => setScreen("recommended")}
            onBooked={() => setScreen("active")}
          />
        )}
        {screen === "active" && (
          <ActiveScreen
            onBack={() => setScreen("home")}
            onAlert={() => setScreen("disruption")}
          />
        )}
        {screen === "disruption" && (
          <DisruptionScreen
            onBack={() => setScreen("active")}
            onComplete={() => setScreen("complete")}
          />
        )}
        {screen === "complete" && (
          <CompleteScreen onHome={() => setScreen("home")} />
        )}
        {showWhy && <WhySheet onClose={() => setShowWhy(false)} />}
      </div>
    </div>
  )
}
