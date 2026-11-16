import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";
import "./Tickets.css";

// SVG Icons
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

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0l1.5 6.5L20 8l-6.5 1.5L12 16l-1.5-6.5L4 8l6.5-1.5L12 0z" />
    <path d="M19 14l.75 3.25L23 18l-3.25.75L19 22l-.75-3.25L15 18l3.25-.75L19 14z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const GiftIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const categories = ["Daily", "Weekly", "Monthly", "Mega"];

const packages = {
  Daily: [
    {
      id: 1,
      name: "Daily Package",
      price: 1,
      coins: 10,
      prize: "$10,000",
      subtitle: "Win 10 - Max Unlimited",
      draw: "Draw Time: 5:30 PM UTC",
      icon: <GiftIcon />,
      color: "pink",
    },
  ],
  Weekly: [
    {
      id: 2,
      name: "Weekly Package",
      price: 3,
      coins: 20,
      prize: "$50,000",
      subtitle: "Win 10 - Max Unlimited",
      draw: "Draw Every Saturday",
      icon: <GiftIcon />,
      color: "purple",
    },
  ],
  Monthly: [
    {
      id: 3,
      name: "Monthly Package",
      price: 12,
      coins: 100,
      prize: "$100,000",
      subtitle: "Win 10 - Max Unlimited",
      draw: "Draw Every Month",
      icon: <TrophyIcon />,
      color: "orange",
    },
  ],
  Mega: [
    {
      id: 4,
      name: "Mega Package",
      price: 25,
      coins: 200,
      prize: "$500,000",
      subtitle: "Win 10 - Max Unlimited",
      draw: "Draw Special Event",
      icon: <GiftIcon />,
      color: "red",
    },
  ],
};

const paymentMethods = [
  {
    id: "wallet",
    title: "Wallet Balance",
    subtitle: "Balance: $125.00",
    icon: <WalletIcon />,
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    subtitle: "Visa, Mastercard",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "crypto",
    title: "Crypto (USDT)",
    subtitle: "USDT, BTC, etc.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M9 9h6M9 15h6" />
      </svg>
    ),
  },
];

const navigationItems = [
  { label: "Home", icon: <HomeIcon />, href: "/home" },
  { label: "Draws", icon: <TargetIcon />, href: "/draws" },
  { label: "Tickets", icon: <TicketIcon />, href: "/tickets" },
  { label: "Rewards", icon: <TrophyIcon />, href: "/rewards" },
  { label: "Profile", icon: <UserIcon />, href: "/profile" },
];

function Tickets() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Daily");
  const [currentStep, setCurrentStep] = useState("packages");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(10);
  const [selectedPayment, setSelectedPayment] = useState("wallet");
  const [paymentError, setPaymentError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [purchasedCount, setPurchasedCount] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Number selection
  const [numberMode, setNumberMode] = useState(null); // "auto" | "manual"
  const [chosenNumber, setChosenNumber] = useState(["", "", "", ""]);
  const [autoNumber, setAutoNumber] = useState(null);

  // Split mode
  const [splitMode, setSplitMode] = useState(null); // "same" | "split"
  const [splitCount, setSplitCount] = useState(1);
  const [splitNumbers, setSplitNumbers] = useState([]); // [{count, number}]
  const [splitStep, setSplitStep] = useState(0); // which split group we're picking for

  const currentPackages = packages[activeCategory];
  const totalAmount = selectedTicket ? selectedTicket.price * ticketCount : 0;
  const coinsPerTicket = selectedTicket?.coins || 0;
  const totalCoins = coinsPerTicket * ticketCount;
  const currentLtkCoins = parseInt(localStorage.getItem("ltk_coins") || "0");

  // Generate random 4-digit number
  const generateAutoNumber = () => {
    const num = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
    setAutoNumber(num);
    setChosenNumber(num.map(String));
  };

  // Final chosen number string
  const finalNumber = chosenNumber.join("");

  // Select package → go to conditions
  const handleBuyNow = (ticket) => {
    setSelectedTicket(ticket);
    setTicketCount(10);
    setSelectedPayment("wallet");
    setPaymentError("");
    setAgreedToTerms(false);
    setNumberMode(null);
    setChosenNumber(["", "", "", ""]);
    setAutoNumber(null);
    setSplitMode(null);
    setSplitCount(1);
    setSplitNumbers([]);
    setSplitStep(0);
    setCurrentStep("conditions");  };

  const decreaseCount = () => {
    setTicketCount((previous) => Math.max(1, previous - 1));
    setPaymentError("");
  };

  const increaseCount = () => {
    setTicketCount((previous) => Math.min(500, previous + 1));
    setPaymentError("");
  };

  const handleContinueToPayment = () => {
    setPaymentError("");
    setCurrentStep("payment");
  };

  // Demo payment only
  const handlePayNow = () => {
    setPaymentError("");
    if (!selectedTicket) { setPaymentError("Please select a package first."); return; }
    if (ticketCount < 1) { setPaymentError("Please select at least one ticket."); return; }
    if (!selectedPayment) { setPaymentError("Please select a payment method."); return; }

    setPurchasedCount(ticketCount);
    const txnId = `DEMO${Date.now().toString().slice(-10)}`;
    setTransactionId(txnId);

    const purchaseData = {
      id: txnId,
      packageName: selectedTicket.name,
      price: selectedTicket.price,
      quantity: ticketCount,
      totalAmount: totalAmount,
      chosenNumber: finalNumber,
      splitNumbers: splitNumbers.length === ticketCount && ticketCount > 0
        ? Object.entries(
            splitNumbers.reduce((acc, t) => {
              const num = t.number || "";
              acc[num] = (acc[num] || 0) + 1;
              return acc;
            }, {})
          ).map(([number, count]) => ({ count, number }))
        : [{ count: ticketCount, number: finalNumber }],
      purchaseDate: new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: true
      }),
      drawDate: selectedTicket.draw,
      status: "Active",
    };

    const existingPurchases = JSON.parse(localStorage.getItem('myPurchases') || '[]');
    existingPurchases.unshift(purchaseData);
    localStorage.setItem('myPurchases', JSON.stringify(existingPurchases));

    // Save LTK coins
    const earnedCoins = totalCoins;
    const newCoinBalance = currentLtkCoins + earnedCoins;
    localStorage.setItem("ltk_coins", newCoinBalance.toString());

    setCurrentStep("success");
  };

  // Back navigation
  const handleBack = () => {
    setPaymentError("");
    if (currentStep === "conditions") {
      setCurrentStep("packages");
    } else if (currentStep === "numbers") {
      setCurrentStep("conditions");
    } else if (currentStep === "split") {
      setCurrentStep("conditions");
    } else if (currentStep === "payment") {
      setCurrentStep("split");
    } else if (currentStep === "success") {
      setCurrentStep("packages");
      setSelectedTicket(null);
    } else {
      navigate("/home");
    }
  };

  const handleViewTickets = () => {
    window.location.href = "/my-tickets";
  };

  const renderSidebar = () => (
    <aside className="lotto-sidebar ticket-sidebar">
      <a href="/home" className="sidebar-brand">
        <span className="sidebar-logo">
          <TargetIcon />
        </span>
        <div className="sidebar-brand-text">
          <h2>
            LOTTO<span>LINK</span>
          </h2>
          <p>Play Today, Win Tomorrow</p>
        </div>
      </a>

      <div className="sidebar-section-title">MAIN MENU</div>

      <nav className="sidebar-menu">
        <a href="/home" className="sidebar-link">
          <span className="sidebar-menu-icon"><HomeIcon /></span>
          <span>Home</span>
        </a>
        <a href="/tickets" className="sidebar-link active" aria-current="page">
          <span className="sidebar-menu-icon"><MyTicketsIcon /></span>
          <span>Tickets</span>
          <span className="sidebar-active-indicator" />
        </a>
        <a href="/draws" className="sidebar-link">
          <span className="sidebar-menu-icon"><TargetIcon /></span>
          <span>Draws</span>
        </a>
        <a href="/rewards" className="sidebar-link">
          <span className="sidebar-menu-icon"><TrophyIcon /></span>
          <span>Rewards</span>
        </a>
        <a href="/wallet" className="sidebar-link">
          <span className="sidebar-menu-icon"><WalletIcon /></span>
          <span>Wallet</span>
        </a>
        <a href="/profile" className="sidebar-link">
          <span className="sidebar-menu-icon"><UserIcon /></span>
          <span>Profile</span>
        </a>
      </nav>

      <div className="sidebar-promo">
        <div className="sidebar-promo-icon">
          <SparklesIcon />
        </div>
        <h3>Dream Big!</h3>
        <p>Your next lucky moment could be just around the corner.</p>
        <a href="/draws">Explore Draws →</a>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-avatar">HK</div>
        <div className="sidebar-footer-info">
          <strong>Kumar</strong>
          <span>Player Account</span>
        </div>
      </div>
    </aside>
  );

  // Mobile Gradient Header with Title
  const renderMobileHeader = () => {
    let title = "Buy Tickets";
    let subtitle = "";
    
    if (currentStep === "packages") {
      title = "Select Package";
      subtitle = "Choose your favourite package";
    } else if (currentStep === "conditions") {
      title = selectedTicket?.name || "Terms & Conditions";
      subtitle = "Please read before continuing";
    } else if (currentStep === "numbers") {
      title = "Choose Your Number";
      subtitle = "Pick manually or auto-generate";
    } else if (currentStep === "split") {
      title = "Choose Numbers";
      subtitle = "Set numbers for each ticket";
    } else if (currentStep === "payment") {
      title = "Payment";
      subtitle = "Complete your purchase";
    } else if (currentStep === "success") {
      title = "Success!";
      subtitle = "Your tickets are ready";
    }
    
    return (
      <div className="ticket-mobile-header">
        <div className="ticket-mobile-header-content">
          <button
            type="button"
            className="ticket-mobile-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ChevronLeftIcon />
          </button>
          <div className="ticket-header-title-section">
            <h1 className="ticket-mobile-header-title">{title}</h1>
            {subtitle && <p className="ticket-header-subtitle">{subtitle}</p>}
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => (
    <header className="lotto-header ticket-header">
      <button
        type="button"
        className="ticket-back-button"
        onClick={handleBack}
        aria-label="Go back"
      >
        <ChevronLeftIcon />
      </button>
      <a href="/home" className="lotto-brand ticket-brand">
        <span className="lotto-brand-icon">
          <TargetIcon />
        </span>
        <div>
          <h2>
            LOTTO<span>LINK</span>
          </h2>
          <p>Play Today, Win Tomorrow</p>
        </div>
      </a>
      <div className="lotto-search ticket-search">
        <span><SearchIcon /></span>
        <input
          type="search"
          placeholder="Search tickets..."
          aria-label="Search tickets"
        />
      </div>
      <div className="lotto-header-actions">
        <button type="button" className="icon-button" aria-label="Messages">
          <MessageIcon />
          <span className="notification-dot" />
        </button>
        <button type="button" className="icon-button" aria-label="Notifications">
          <BellIcon />
          <span className="notification-dot" />
        </button>
        <div className="profile-avatar">HK</div>
      </div>
    </header>
  );

  // Bottom nav removed - now in App.jsx

  // STEP 1: PACKAGE SELECTION
  const renderPackages = () => (
    <>
      <section className="ticket-page-heading">
        <div>
          <span className="ticket-eyebrow">YOUR LUCK STARTS HERE</span>
          <h1>Select Package</h1>
          <p>Choose your favourite package to continue.</p>
        </div>
        <div className="ticket-heading-icon">
          <TicketIcon />
        </div>
      </section>

      <div className="ticket-category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`ticket-category-tab ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="ticket-package-list">
        {currentPackages.map((ticket) => (
          <article className="ticket-package-card" key={ticket.id}>
            <div className={`ticket-package-icon ${ticket.color}`}>
              {ticket.icon}
            </div>
            <div className="ticket-package-info">
              <h2>{ticket.name}</h2>
              <p className="ticket-price">
                <strong>${ticket.price} Per Ticket</strong>
              </p>
              <div className="ticket-coin-badge">
                🪙 {ticket.coins} LTK coins per ticket
              </div>
              <p className="ticket-subtitle">{ticket.subtitle}</p>
              <p className="ticket-draw-time">
                <span><ClockIcon /></span>
                {ticket.draw}
              </p>
            </div>
            <button
              type="button"
              className="ticket-buy-button"
              onClick={() => handleBuyNow(ticket)}
            >
              Buy Now
            </button>
          </article>
        ))}
      </section>
    </>
  );

  // STEP 2: CONDITIONS
  const renderConditions = () => (
    <section className="conditions-section">
      <div className="conditions-header">
        <div className={`conditions-icon ${selectedTicket?.color}`}>
          {selectedTicket?.icon}
        </div>
        <h2>{selectedTicket?.name}</h2>
        <p className="conditions-subtitle">Please read the terms before purchasing</p>
      </div>

      <div className="conditions-box">
        <div className="condition-item">
          <span className="condition-icon">🪙</span>
          <div>
            <strong>LTK Coin Reward</strong>
            <span>Earn {selectedTicket?.coins} LTK coins per ticket purchased!</span>
          </div>
        </div>
        <div className="condition-item">
          <span className="condition-icon">📅</span>
          <div>
            <strong>Draw Date & Time</strong>
            <span>{selectedTicket?.draw}</span>
          </div>
        </div>
        <div className="condition-item">
          <span className="condition-icon">💰</span>
          <div>
            <strong>Ticket Price</strong>
            <span>${selectedTicket?.price} per ticket</span>
          </div>
        </div>
        <div className="condition-item">
          <span className="condition-icon">🏆</span>
          <div>
            <strong>Prize Pool</strong>
            <span>Up to $50,000 total prize</span>
          </div>
        </div>
        <div className="condition-item">
          <span className="condition-icon">🎯</span>
          <div>
            <strong>How to Win</strong>
            <span>Your 4-digit number must match the winning draw number</span>
          </div>
        </div>
        <div className="condition-item">
          <span className="condition-icon">📋</span>
          <div>
            <strong>Eligibility</strong>
            <span>Must be 18+ years old to participate</span>
          </div>
        </div>
        <div className="condition-item">
          <span className="condition-icon">⚠️</span>
          <div>
            <strong>Important</strong>
            <span>Tickets are non-refundable after purchase. Play responsibly.</span>
          </div>
        </div>
      </div>

      <label className="conditions-agree-row">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
        />
        <span>I have read and agree to the terms & conditions</span>
      </label>

      <button
        className="purchase-primary-button conditions-continue-btn"
        onClick={() => { setSplitNumbers([]); setCurrentStep("split"); }}
        disabled={!agreedToTerms}
        style={{ opacity: agreedToTerms ? 1 : 0.5 }}
      >
        I Agree, Continue →
      </button>
    </section>
  );

  // STEP 3: CHOOSE NUMBER
  const renderNumbers = () => (
    <section className="numbers-section">
      {/* SELECTED TICKET SUMMARY */}
      <div className="numbers-ticket-summary">
        <div className={`numbers-ticket-icon ${selectedTicket?.color}`}>
          {selectedTicket?.icon}
        </div>
        <div className="numbers-ticket-info">
          <strong>{selectedTicket?.name}</strong>
          <span>${selectedTicket?.price} per ticket</span>
        </div>
        <div className="numbers-ticket-draw">
          <span>Draw</span>
          <strong>{selectedTicket?.draw}</strong>
        </div>
      </div>

      {/* QUANTITY SELECTOR */}
      <div className="numbers-qty-box">
        <div className="numbers-qty-label">
          <span>How many tickets?</span>
          <span className="numbers-qty-total">
            Total: <strong>${(selectedTicket?.price * ticketCount).toFixed(2)}</strong>
          </span>
        </div>
        <div className="numbers-qty-row">
          <button
            className="qty-btn"
            onClick={decreaseCount}
            disabled={ticketCount <= 1}
          >−</button>
          <input
            type="number"
            className="qty-input"
            value={ticketCount}
            min={1}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val >= 1) setTicketCount(val);
            }}
          />
          <button
            className="qty-btn"
            onClick={increaseCount}
          >+</button>
        </div>
        <div className="numbers-qty-presets">
          {[1, 5, 10, 25, 50, 100].map((n) => (
            <button
              key={n}
              className={`qty-preset ${ticketCount === n ? "active" : ""}`}
              onClick={() => setTicketCount(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="numbers-header">
        <h2>Choose Your Lucky Number</h2>
        <p>Pick a 4-digit number for your ticket</p>
      </div>

      {!numberMode && (
        <div className="number-mode-options">
          <button
            className="number-mode-card auto"
            onClick={() => { setNumberMode("auto"); generateAutoNumber(); }}
          >
            <span className="mode-emoji">🎲</span>
            <strong>Auto Pick</strong>
            <span>System randomly picks 4 digits for you</span>
          </button>

          <button
            className="number-mode-card manual"
            onClick={() => { setNumberMode("manual"); setChosenNumber(["", "", "", ""]); }}
          >
            <span className="mode-emoji">✏️</span>
            <strong>Manual Pick</strong>
            <span>Choose your own lucky 4-digit number</span>
          </button>
        </div>
      )}

      {numberMode === "auto" && (
        <div className="number-result">
          <p className="number-result-label">Your Lucky Number</p>
          <div className="number-boxes">
            {autoNumber?.map((digit, i) => (
              <div key={i} className="number-box auto-box">{digit}</div>
            ))}
          </div>
          <button className="number-regenerate" onClick={generateAutoNumber}>
            🔄 Regenerate
          </button>
          <div className="number-actions">
            <button className="number-change" onClick={() => { setNumberMode(null); setAutoNumber(null); }}>
              ← Change Mode
            </button>
            <button
              className="purchase-primary-button"
              onClick={() => { setSplitMode(null); setCurrentStep("split"); }}
            >
              Use This Number →
            </button>
          </div>
        </div>
      )}

      {numberMode === "manual" && (
        <div className="number-result">
          <p className="number-result-label">Enter Your 4-Digit Number</p>
          <div className="number-boxes">
            {chosenNumber.map((digit, i) => (
              <input
                key={i}
                id={`digit-${i}`}
                type="number"
                min="0"
                max="9"
                maxLength={1}
                className="number-box manual-input"
                value={digit}
                onChange={(e) => {
                  const val = e.target.value.slice(-1);
                  if (!/^[0-9]?$/.test(val)) return;
                  const updated = [...chosenNumber];
                  updated[i] = val;
                  setChosenNumber(updated);
                  if (val && i < 3) {
                    document.getElementById(`digit-${i + 1}`)?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !chosenNumber[i] && i > 0) {
                    document.getElementById(`digit-${i - 1}`)?.focus();
                  }
                }}
              />
            ))}
          </div>
          <div className="number-actions">
            <button className="number-change" onClick={() => { setNumberMode(null); setChosenNumber(["", "", "", ""]); }}>
              ← Change Mode
            </button>
            <button
              className="purchase-primary-button"
              onClick={() => { setSplitMode(null); setCurrentStep("split"); }}
              disabled={chosenNumber.some(d => d === "")}
              style={{ opacity: chosenNumber.some(d => d === "") ? 0.5 : 1 }}
            >
              Use This Number →
            </button>
          </div>
        </div>
      )}
    </section>
  );

  // Which ticket row is in edit mode
  const [editingRow, setEditingRow] = useState(null);
  const [editDigits, setEditDigits] = useState(["","","",""]);

  // STEP 4: PER-TICKET NUMBER ASSIGNMENT
  const renderSplit = () => {
    const initTickets = () => {
      const init = Array.from({ length: ticketCount }, () => ({
        number: Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("")
      }));
      setSplitNumbers(init);
    };

    if (splitNumbers.length !== ticketCount) {
      initTickets();
      return null;
    }

    const autoOne = (index) => {
      const rand = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("");
      const updated = [...splitNumbers];
      updated[index] = { number: rand };
      setSplitNumbers(updated);
      if (editingRow === index) setEditingRow(null);
    };

    const startEdit = (index) => {
      setEditingRow(index);
      setEditDigits(splitNumbers[index].number.split(""));
      setTimeout(() => document.getElementById(`edit-0-${index}`)?.focus(), 50);
    };

    const confirmEdit = (index) => {
      if (editDigits.some(d => d === "")) return;
      const updated = [...splitNumbers];
      updated[index] = { number: editDigits.join("") };
      setSplitNumbers(updated);
      setEditingRow(null);
    };

    const autoFillAll = () => {
      const updated = Array.from({ length: ticketCount }, () => ({
        number: Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("")
      }));
      setSplitNumbers(updated);
      setEditingRow(null);
    };

    const allValid = splitNumbers.every(t => t.number && t.number.length === 4);

    return (
      <section className="spread-section">
        <div className="spread-header">
          <h2>Assign Numbers ({ticketCount} Tickets)</h2>
          <p>Auto-generated — tap Edit to change any</p>
        </div>

        {/* Quantity selector inline */}
        <div className="numbers-qty-box" style={{ marginBottom: 12 }}>
          <div className="numbers-qty-label">
            <span>How many tickets?</span>
            <span className="numbers-qty-total">
              Total: <strong>${(selectedTicket?.price * ticketCount).toFixed(2)}</strong>
            </span>
          </div>
          <div className="numbers-qty-row">
            <button className="qty-btn" onClick={decreaseCount} disabled={ticketCount <= 1}>−</button>
            <input
              type="number"
              className="qty-input"
              value={ticketCount}
              min={1}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 1) {
                  setTicketCount(val);
                  setSplitNumbers([]);
                }
              }}
            />
            <button className="qty-btn" onClick={() => { increaseCount(); setSplitNumbers([]); }}>+</button>
          </div>
          <div className="numbers-qty-presets">
            {[1, 5, 10, 25, 50, 100].map((n) => (
              <button
                key={n}
                className={`qty-preset ${ticketCount === n ? "active" : ""}`}
                onClick={() => { setTicketCount(n); setSplitNumbers([]); }}
              >{n}</button>
            ))}
          </div>
        </div>

        <button className="spread-quick-btn accent full-width" onClick={autoFillAll}>
          🎲 Regenerate All
        </button>

        <div className="spread-ticket-list">
          {splitNumbers.map((t, index) => (
            <div key={index} className={`spread-ticket-row ${editingRow === index ? "editing" : ""}`}>
              <span className="spread-ticket-label">#{index + 1}</span>

              {editingRow === index ? (
                /* Edit mode - show inputs */
                <div className="spread-edit-row">
                  <div className="spread-number-inputs">
                    {editDigits.map((digit, di) => (
                      <input
                        key={di}
                        id={`edit-${di}-${index}`}
                        type="number"
                        min="0" max="9"
                        className="spread-digit-input"
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value.slice(-1);
                          if (!/^[0-9]?$/.test(val)) return;
                          const updated = [...editDigits];
                          updated[di] = val;
                          setEditDigits(updated);
                          if (val && di < 3) document.getElementById(`edit-${di + 1}-${index}`)?.focus();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !editDigits[di] && di > 0)
                            document.getElementById(`edit-${di - 1}-${index}`)?.focus();
                          if (e.key === "Enter") confirmEdit(index);
                        }}
                      />
                    ))}
                  </div>
                  <div className="spread-edit-actions">
                    <button
                      className="spread-action-btn confirm-btn"
                      onClick={() => confirmEdit(index)}
                      disabled={editDigits.some(d => d === "")}
                    >✓</button>
                    <button
                      className="spread-action-btn cancel-btn"
                      onClick={() => setEditingRow(null)}
                    >✕</button>
                  </div>
                </div>
              ) : (
                /* Display mode - show number + buttons */
                <>
                  <div className="spread-number-display">
                    {t.number.split("").map((d, di) => (
                      <span key={di} className="spread-digit-badge">{d}</span>
                    ))}
                  </div>
                  <div className="spread-row-actions">
                    <button className="spread-action-btn auto-btn" onClick={() => autoOne(index)} title="Random">
                      🎲
                    </button>
                    <button className="spread-action-btn edit-btn" onClick={() => startEdit(index)} title="Edit">
                      ✏️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          className="purchase-primary-button spread-confirm"
          disabled={!allValid || editingRow !== null}
          style={{ opacity: allValid && editingRow === null ? 1 : 0.5 }}
          onClick={() => setCurrentStep("payment")}
        >
          Confirm All Numbers →
        </button>
      </section>
    );
  };

  // STEP 5: PACKAGE DETAILS (kept for reference, now skipped)
  const renderDetails = () => (
    <>
      <section className="purchase-page-heading">
        <div>
          <span className="ticket-eyebrow">LOTTO LINK</span>
          <h1>Daily Package</h1>
          <p>Choose the number of tickets you want.</p>
        </div>
      </section>

      <section className="purchase-detail-card">
        <div className="purchase-product-hero">
          <div className="purchase-product-icon">
            <GiftIcon />
          </div>
          <h2>{selectedTicket?.name}</h2>
          <div className="purchase-unit-price">
            ${selectedTicket?.price} <span>Per Ticket</span>
          </div>
        </div>

        <div className="purchase-package-info">
          <h3>Package Benefits</h3>
          <ul>
            <li>
              <span>✓</span>
              Minimum Tickets: 10
            </li>
            <li>
              <span>✓</span>
              Maximum Tickets: Unlimited*
            </li>
            <li>
              <span>✓</span>
              {selectedTicket?.draw}
            </li>
          </ul>
        </div>

        <div className="purchase-ticket-selector">
          <h3>Select Number of Tickets</h3>
          <div className="ticket-quantity-control">
            <button
              type="button"
              onClick={decreaseCount}
              disabled={ticketCount <= 1}
              aria-label="Decrease ticket count"
            >
              −
            </button>
            <output aria-live="polite">{ticketCount}</output>
            <button
              type="button"
              onClick={increaseCount}
              disabled={ticketCount >= 500}
              aria-label="Increase ticket count"
            >
              +
            </button>
          </div>
          <div className="ticket-quantity-presets">
            {[10, 50, 100, 500].map((count) => (
              <button
                key={count}
                type="button"
                className={ticketCount === count ? "active" : ""}
                onClick={() => setTicketCount(count)}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="purchase-total-row">
          <span>Total Amount</span>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>

        <button
          type="button"
          className="purchase-primary-button"
          onClick={handleContinueToPayment}
        >
          Buy Tickets
          <span>→</span>
        </button>

        <p className="purchase-disclaimer">
          *Ticket limits are subject to the actual package rules.
        </p>
      </section>
    </>
  );

  // STEP 3: PAYMENT DETAILS
  const renderPayment = () => (
    <>
      <section className="purchase-page-heading">
        <div>
          <span className="ticket-eyebrow">SECURE CHECKOUT</span>
          <h1>Payment Details</h1>
          <p>Review your order and select a payment method.</p>
        </div>
      </section>

      <section className="purchase-detail-card payment-detail-card">
        <div className="payment-order-summary">
          <div className="payment-order-icon">
            <TicketIcon />
          </div>
          <div className="payment-order-info">
            <h2>{selectedTicket?.name}</h2>
            <p>{ticketCount} Tickets</p>
            {splitNumbers.length === ticketCount && ticketCount > 0 ? (
              <div className="payment-split-display">
                {/* Group same numbers for compact display */}
                {Object.entries(
                  splitNumbers.reduce((acc, t) => {
                    const num = t.number || "";
                    acc[num] = (acc[num] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([num, count], i) => (
                  <div key={i} className="payment-split-row">
                    <span>{count}×</span>
                    <div className="payment-split-num">
                      {num.split("").map((d, j) => (
                        <span key={j} className="payment-number-digit">{d}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : finalNumber ? (
              <div className="payment-number-display">
                <span>Your Number: </span>
                {finalNumber.split("").map((d, i) => (
                  <span key={i} className="payment-number-digit">{d}</span>
                ))}
              </div>
            ) : null}
          </div>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>

        <h3 className="payment-section-title">Select Payment Method</h3>

        <div className="payment-method-list">
          {paymentMethods.map((method) => (
            <button
              type="button"
              key={method.id}
              className={`payment-method ${
                selectedPayment === method.id ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedPayment(method.id);
                setPaymentError("");
              }}
              aria-pressed={selectedPayment === method.id}
            >
              <span className="payment-method-icon">{method.icon}</span>
              <span className="payment-method-text">
                <strong>{method.title}</strong>
                <small>{method.subtitle}</small>
              </span>
              <span className="payment-radio">
                {selectedPayment === method.id ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>

        <div className="payment-total-row">
          <span>Total Amount</span>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>

        {paymentError && (
          <div className="payment-error" role="alert">
            {paymentError}
          </div>
        )}

        <button
          type="button"
          className="purchase-primary-button payment-pay-button"
          onClick={handlePayNow}
        >
          Pay Now · ${totalAmount.toFixed(2)}
        </button>

        <p className="payment-demo-notice">
          Demo mode: this action does not charge money or initiate a real payment.
        </p>
      </section>
    </>
  );

  // STEP 4: SUCCESS
  const renderSuccess = () => (
    <section className="payment-success-card">
      <div className="success-confetti">
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
      </div>

      <div className="success-checkmark">✓</div>

      <span className="success-eyebrow">PAYMENT DETAILS</span>
      <h1>Payment Successful!</h1>
      <p className="success-subtitle">{purchasedCount} Tickets Purchased</p>

      <div className="success-amount-row">
        <span>Amount Paid</span>
        <strong>${totalAmount.toFixed(2)}</strong>
      </div>

      <div className="success-transaction-row">
        <span>Transaction ID</span>
        <strong>{transactionId}</strong>
      </div>

      {/* LTK COINS EARNED */}
      <div className="success-coins-box">
        <div className="success-coins-icon">🪙</div>
        <div className="success-coins-text">
          <strong>+{totalCoins} LTK Coins Earned!</strong>
          <span>{coinsPerTicket} coins × {purchasedCount} tickets</span>
        </div>
        <div className="success-coins-balance">
          <span>Your Balance</span>
          <strong>{currentLtkCoins + totalCoins} LTK</strong>
        </div>
      </div>

      <div className="success-demo-badge">DEMO TRANSACTION — NO MONEY CHARGED</div>

      <button
        type="button"
        className="purchase-primary-button"
        onClick={handleViewTickets}
      >
        View My Tickets
        <span>→</span>
      </button>

      <a href="/home" className="success-home-button">
        Back to Home
      </a>

      <p className="success-footer-note">
        Thank you for trying the LOTTO LINK demo.
      </p>
    </section>
  );

  return (
    <main className="lotto-home ticket-page">
      {renderSidebar()}
      <div className="lotto-main-content ticket-main">
        {renderMobileHeader()}
        {renderHeader()}
        {currentStep === "packages" && renderPackages()}
        {currentStep === "conditions" && renderConditions()}
        {currentStep === "split" && renderSplit()}
        {currentStep === "details" && renderDetails()}
        {currentStep === "payment" && renderPayment()}
        {currentStep === "success" && renderSuccess()}
        <footer className="lotto-footer ticket-footer">
          <p>
            © {new Date().getFullYear()} LOTTO LINK. Play Responsibly.
          </p>
        </footer>
      </div>
    </main>
  );
}

export default Tickets;
