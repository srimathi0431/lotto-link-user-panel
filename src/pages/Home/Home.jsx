import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// SVG Icon Components
const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const MessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const WalletCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const TicketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const MyTicketsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <path d="M16 3h4v4M8 3H4v4M16 21h4v-4M8 21H4v-4" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0l1.5 6.5L20 8l-6.5 1.5L12 16l-1.5-6.5L4 8l6.5-1.5L12 0z" />
    <path d="M19 14l.75 3.25L23 18l-3.25.75L19 22l-.75-3.25L15 18l3.25-.75L19 14z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const GiftIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const MoreVerticalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const services = [
  { icon: <TicketIcon />, name: "Buy Tickets", color: "pink" },
  { icon: <MyTicketsIcon />, name: "My Tickets", color: "purple" },
  { icon: <TrophyIcon />, name: "Winners", color: "orange" },
  { icon: <WalletIcon />, name: "Wallet", color: "green" },
];

const menuItems = [
  { icon: <HomeIcon />, name: "Home", href: "/", active: true },
  { icon: <MyTicketsIcon />, name: "My Tickets", href: "/tickets" },
  { icon: <TargetIcon />, name: "Draws", href: "/draws" },
  { icon: <TrophyIcon />, name: "Rewards", href: "/rewards" },
  { icon: <WalletIcon />, name: "Wallet", href: "/wallet" },
  { icon: <UserIcon />, name: "Profile", href: "/profile" },
];

const draws = [
  {
    id: 1,
    name: "Daily Draw",
    status: "LIVE",
    prize: "$10,000",
    hours: "02",
    minutes: "18",
    seconds: "45",
  },
  {
    id: 2,
    name: "Weekly Draw",
    status: "SOON",
    prize: "$50,000",
    hours: "05",
    minutes: "30",
    seconds: "20",
  },
];

function Home() {
  const navigate = useNavigate();
  const referralCode = "KUMAR2024";
  const referralLink = `https://lottolink.app/ref/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied! 🎉");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join LOTTO LINK",
          text: `Play lottery with me on LOTTO LINK! Use my referral code ${referralCode} and get $50 bonus!`,
          url: referralLink,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <main className="lotto-home">

      {/* ==================================
          DESKTOP LEFT SIDEBAR
      ================================== */}

      {/* ==================================
          MAIN CONTENT
      ================================== */}

      <div className="lotto-main-content">

        {/* HEADER */}

        <header className="lotto-header">

          <div className="lotto-brand">
            <span className="lotto-brand-icon">
              <TargetIcon />
            </span>

            <div>
              <h2>
                LOTTO<span>LINK</span>
              </h2>

              <p>Play Today, Win Tomorrow</p>
            </div>
          </div>

          {/* Desktop Search */}

          <div className="lotto-search">
            <span><SearchIcon /></span>

            <input
              type="search"
              placeholder="Search draws, tickets..."
              aria-label="Search draws and tickets"
            />
          </div>

          <div className="lotto-header-actions">

            <button
              type="button"
              className="icon-button"
              aria-label="Messages"
              onClick={() => navigate("/messages")}
            >
              <MessageIcon />
              <span className="notification-dot" />
            </button>

            <button
              type="button"
              className="icon-button"
              aria-label="Notifications"
              onClick={() => navigate("/notifications")}
            >
              <BellIcon />
              <span className="notification-dot" />
            </button>

            <div
              className="profile-avatar"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
              role="button"
              aria-label="Go to profile"
            >
              HK
            </div>

          </div>

        </header>

        {/* WELCOME */}

        <section className="lotto-welcome">

          <div className="welcome-avatar">
            <UserIcon />
          </div>

          <div className="welcome-text">
            <h3>Hi, Kumar 👋</h3>

            <p>
              Let's Play & Win Together
            </p>
          </div>

          <a
            href="/profile"
            className="profile-button"
          >
            My Profile ↗
          </a>

        </section>

        {/* WALLET */}

        <section className="lotto-wallet">

          <div className="wallet-information">

            <span>
              <span className="wallet-card-icon">
                <WalletCardIcon />
              </span>
              Wallet Balance
            </span>

            <h2>$ 125.00</h2>

          </div>

          <a
            href="/wallet"
            className="deposit-button"
          >
            Deposit
          </a>

        </section>

        {/* SERVICES */}

        <section className="lotto-services">

          {services.map((service) => (
            <a
              href={
                service.name === "Buy Tickets"
                  ? "/tickets"
                  : service.name === "My Tickets"
                  ? "/my-tickets"
                  : service.name === "Winners"
                  ? "/draws"
                  : "/wallet"
              }
              className="service-item"
              key={service.name}
            >
              <span
                className={`service-icon ${service.color}`}
              >
                {service.icon}
              </span>

              <span>{service.name}</span>
            </a>
          ))}

        </section>

        {/* PROMOTIONAL BANNER */}

        <section className="lotto-banner">

          <div className="banner-balls">
            <span>7</span>
            <span>3</span>
            <span>9</span>
            <span>5</span>
          </div>

          <div className="banner-content">

            <span className="banner-eyebrow">
              YOUR LUCKY MOMENT
            </span>

            <h2>Big Dreams</h2>

            <h3>Brighter Tomorrows</h3>

            <p>
              Your Lucky Number Could Change Everything!
            </p>

          </div>

          <div className="banner-sparkle">
            <StarIcon />
          </div>

          <div className="banner-decoration">
            <SparklesIcon />
          </div>

        </section>

        {/* ACTIVE DRAWS */}

        <section className="lotto-draws">

          <div className="section-heading">

            <div>
              <h3>Active Draws</h3>

              <p>
                Don't miss your chance to win!
              </p>
            </div>

            <a
              href="/draws"
              className="view-all"
            >
              View All →
            </a>

          </div>

          <div className="draw-list">

            {draws.map((draw) => (
              <article
                className="draw-card"
                key={draw.id}
              >
                <div className="draw-icon">
                  <TicketIcon />
                </div>

                <div className="draw-info-left">
                  <div className="draw-title">
                    <h4>{draw.name}</h4>
                    <span className={`draw-status ${draw.status === "LIVE" ? "live" : "soon"}`}>
                      {draw.status}
                    </span>
                  </div>
                  <p><strong>{draw.prize}</strong></p>
                </div>

                <div className="draw-timer">
                  <div><strong>{draw.hours}</strong><span>Hrs</span></div>
                  <div><strong>{draw.minutes}</strong><span>Min</span></div>
                  <div><strong>{draw.seconds}</strong><span>Sec</span></div>
                </div>

                <a href="/draws" className="draw-arrow" aria-label={`View ${draw.name}`}>→</a>

              </article>
            ))}

          </div>

        </section>

        {/* REFERRAL SECTION */}

        <section className="lotto-referral">

          <div className="referral-header">

            <div className="referral-icon">
              <GiftIcon />
            </div>

            <div>
              <h3>Invite Friends & Earn</h3>
              <p>Share your referral link and get $50 for each friend!</p>
            </div>

          </div>

          <div className="referral-stats">

            <div className="referral-stat">
              <strong>5</strong>
              <span>Friends Joined</span>
            </div>

            <div className="referral-divider"></div>

            <div className="referral-stat">
              <strong>$250</strong>
              <span>Total Earned</span>
            </div>

          </div>

          <div className="referral-code-box">

            <div className="referral-code-label">Your Referral Code</div>

            <div className="referral-code-display">
              <code>{referralCode}</code>
            </div>

          </div>

          <div className="referral-link-box">

            <input
              type="text"
              value={referralLink}
              readOnly
              className="referral-link-input"
              aria-label="Referral link"
            />

            <button
              type="button"
              className="copy-button"
              onClick={handleCopyLink}
              aria-label="Copy referral link"
            >
              <CopyIcon />
            </button>

          </div>

          <button
            type="button"
            className="share-button"
            onClick={handleShare}
          >
            <ShareIcon />
            Share with Friends
          </button>

        </section>

        {/* RECENT WINNERS */}

        <section className="lotto-winners">

          <div className="section-heading">

            <div>
              <h3>Recent Winners <TrophyIcon /></h3>

              <p>
                Celebrating lucky moments
              </p>
            </div>

            <a
              href="/draws"
              className="view-all"
            >
              View All →
            </a>

          </div>

          {/* Draw Group Winner Card */}
          <div className="winner-draw-group">
            
            <div className="winner-draw-header">
              <h4>LLT 005</h4>
              <span className="draw-date">Dec 15, 2024</span>
            </div>

            {/* Winners List */}
            <div className="winner-list">
              <div className="winner-item">
                <div className="winner-rank">
                  <span className="rank-badge">🥇</span>
                  <span className="rank-text">Winner #1</span>
                </div>
                <div className="winner-details">
                  <span className="ticket-number">Ticket: 1234</span>
                  <span className="winner-amount">$5,000</span>
                </div>
              </div>

              <div className="winner-item">
                <div className="winner-rank">
                  <span className="rank-badge">🥈</span>
                  <span className="rank-text">Winner #2</span>
                </div>
                <div className="winner-details">
                  <span className="ticket-number">Ticket: 5678</span>
                  <span className="winner-amount">$2,500</span>
                </div>
              </div>

              <div className="winner-item">
                <div className="winner-rank">
                  <span className="rank-badge">🥉</span>
                  <span className="rank-text">Winner #3</span>
                </div>
                <div className="winner-details">
                  <span className="ticket-number">Ticket: 9012</span>
                  <span className="winner-amount">$1,000</span>
                </div>
              </div>
            </div>

            {/* Admin Section */}
            <div className="winner-admin-section">
              <div className="admin-info">
                <span className="admin-label">Admin Fee</span>
                <span className="admin-value">$500</span>
              </div>
            </div>

            {/* Pool Details */}
            <div className="winner-pool-details">
              <div className="pool-row">
                <span className="pool-label">Next Pool Amount</span>
                <span className="pool-value">$12,000</span>
              </div>
              <div className="pool-row">
                <span className="pool-label">Total Participation</span>
                <span className="pool-value">$15,000</span>
              </div>
              <div className="pool-row">
                <span className="pool-label">Tickets Sold</span>
                <span className="pool-value">150</span>
              </div>
            </div>

          </div>

        </section>

        {/* LTK COINS */}

        <section className="lotto-ltk-coins" onClick={() => navigate("/ltk-coins")} style={{ cursor: "pointer" }}>

          <div className="ltk-coins-content">

            <div className="ltk-icon">
              <GiftIcon />
            </div>

            <div className="ltk-info">
              <span className="ltk-label">LTK Coins</span>
              <h3 className="ltk-balance">150 Coins</h3>
              <p className="ltk-subtitle">Tap to view airdrop details</p>
            </div>

          </div>

          <div className="ltk-arrow">→</div>

        </section>

        {/* FOOTER */}

        <footer className="lotto-footer">
          <p>
            © {new Date().getFullYear()} LOTTO LINK.
            Play Responsibly.
          </p>
        </footer>

      </div>

      {/* ==================================
          MOBILE BOTTOM NAVIGATION
      ================================== */}

    </main>
  );
}

export default Home;
