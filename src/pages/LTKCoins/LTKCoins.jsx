import React, { useState } from "react";
import "./LTKCoins.css";

const LTKCoins = () => {
  const [copied, setCopied] = useState(false);
  const userCoins = 150;
  const referralCode = "LTK2024KUMAR";

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const packages = [
    { price: 1, coins: 10, color: "green" },
    { price: 2, coins: 20, color: "blue" },
    { price: 10, coins: 100, color: "purple" },
    { price: 20, coins: 200, color: "red" },
  ];

  const benefits = [
    { icon: "🎮", title: "PLAY MORE", desc: "Get more tickets" },
    { icon: "🎫", title: "MORE TICKETS", desc: "Bigger rewards" },
    { icon: "💰", title: "RECEIVE MORE COINS", desc: "Grow your balance" },
    { icon: "📈", title: "HOLD LONGER HIGHER VALUE", desc: "Increase worth" },
    { icon: "💎", title: "BIGGER OPPORTUNITIES", desc: "Win more" },
  ];

  return (
    <div className="ltk-page">
      {/* Header */}
      <header className="ltk-header">
        <h1>LTK AIRDROP PROGRAM</h1>
        <p>TOKEN DISTRIBUTION</p>
      </header>

      {/* Current Balance */}
      <section className="ltk-balance-card">
        <div className="ltk-logo">
          <div className="ltk-badge"></div>
        </div>
        <div className="balance-info">
          <p>Your LTK Balance</p>
          <h2>{userCoins} Coins</h2>
          <span className="coin-value">Coin Price: $0.01</span>
        </div>
      </section>

      {/* Tagline */}
      <div className="ltk-tagline">
        <p>PLAY • PARTICIPATE • GET FREE COINS</p>
        <h3>More Tickets, More Coins, <span>Bigger Rewards!</span></h3>
      </div>

      {/* Packages */}
      <section className="ltk-packages">
        <h3>Buy Tickets & Earn Coins</h3>
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.price} className={`package-card package-${pkg.color}`}>
              <div className="package-price">${pkg.price}</div>
              <p>or 1 Ticket</p>
              <div className="ltk-coin-icon">
                <span>👑</span>
                <span>LTK</span>
              </div>
              <div className="package-coins">{pkg.coins} Coins</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="ltk-benefits">
        <h3>Why Hold LTK Coins?</h3>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <span className="benefit-icon">{benefit.icon}</span>
              <h4>{benefit.title}</h4>
              <p>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Holding Info */}
      <section className="ltk-holding-info">
        <div className="holding-card">
          <span className="holding-icon">🎁</span>
          <div>
            <h4>FREE COIN AIRDROP</h4>
            <p>Participate in draws to earn free coins</p>
          </div>
        </div>
        <div className="holding-card">
          <span className="holding-icon">🕐</span>
          <div>
            <h4>HOLDING PERIOD</h4>
            <p>365 DAYS - Long term rewards</p>
          </div>
        </div>
      </section>

      {/* Referral */}
      <section className="ltk-referral">
        <h3>Invite Friends & Earn More</h3>
        <p>Share your referral code</p>
        <div className="referral-code-box">
          <span className="ref-code">{referralCode}</span>
          <button onClick={copyReferralCode} className="copy-btn">
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        </div>
      </section>

      {/* Footer Note */}
      <div className="ltk-footer-note">
        <p>💡 The more you play, the more coins you earn!</p>
        <p>🎯 Hold longer for higher value opportunities</p>
      </div>
    </div>
  );
};

export default LTKCoins;
