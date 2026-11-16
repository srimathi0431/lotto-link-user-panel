import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Referral.css";

const Referral = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0); // Track withdrawn amount

  // Demo referral earnings data
  const referralStats = {
    totalReferrals: 24,
    activeReferrals: 18,
    totalEarnings: 2450.50,
    joiningEarnings: 1200.00,
    winningEarnings: 1250.50,
    pendingEarnings: 0 // No longer needed, we calculate available
  };

  // Calculate available to withdraw
  const availableToWithdraw = referralStats.totalEarnings - withdrawnAmount;

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  const handleWithdraw = () => {
    if (availableToWithdraw > 0) {
      // Show loading
      setIsLoading(true);
      
      // After 3 seconds, show success
      setTimeout(() => {
        setIsLoading(false);
        setWithdrawnAmount(referralStats.totalEarnings); // Mark all as withdrawn
        setShowSuccessModal(true);
        
        // Hide success modal after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 3000);
      }, 3000);
    }
  };

  return (
    <div className="referral-page">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="withdraw-success-modal">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>Withdrawal Successful!</h2>
            <p>Your commission has been transferred to your wallet</p>
            <div className="success-amount">{formatMoney(availableToWithdraw)}</div>
          </div>
        </div>
      )}

      {/* Total Earnings - Simple Box at Top */}
      <section className="total-earnings-banner">
        <div className="earnings-simple-content">
          <div className="earnings-icon-large">💰</div>
          <h1>Total Earnings in My Referral</h1>
          <div className="earnings-amount-large">{formatMoney(referralStats.totalEarnings)}</div>
        </div>
      </section>

      {/* Withdraw Section */}
      <section className="withdraw-section-compact">
        <div className="withdraw-card-compact">
          <h3>💵 Available to Withdraw</h3>
          <div className="withdraw-amount-compact">
            {formatMoney(availableToWithdraw)}
          </div>
          {availableToWithdraw > 0 ? (
            <button 
              className="withdraw-button-compact" 
              onClick={handleWithdraw}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  <span className="button-icon">↗</span>
                  Withdraw to Wallet
                </>
              )}
            </button>
          ) : (
            <div className="no-balance-message-compact">
              ✓ All Withdrawn
            </div>
          )}
        </div>
      </section>

      {/* Joining Commission Section - Click to navigate */}
      <section 
        className="referral-section clickable-section joining-section"
        onClick={() => navigate('/referral/joining-commission')}
      >
        <div className="section-content">
          <div className="section-left">
            <span className="section-icon">🎯</span>
            <div className="section-info">
              <h2>Joining Commission</h2>
              <p>See your referral network hierarchy</p>
            </div>
          </div>
          <div className="section-right">
            <div className="section-stats">
              <span className="stat-value">{formatMoney(referralStats.joiningEarnings)}</span>
              <span className="stat-label">{referralStats.totalReferrals} Referrals</span>
            </div>
            <span className="arrow-icon">→</span>
          </div>
        </div>
      </section>

      {/* Winning Commission Section - Click to navigate */}
      <section 
        className="referral-section clickable-section winning-section"
        onClick={() => navigate('/referral/winning-commission')}
      >
        <div className="section-content">
          <div className="section-left">
            <span className="section-icon">🏆</span>
            <div className="section-info">
              <h2>Winning Commission</h2>
              <p>Commission from referral wins</p>
            </div>
          </div>
          <div className="section-right">
            <div className="section-stats">
              <span className="stat-value">{formatMoney(referralStats.winningEarnings)}</span>
              <span className="stat-label">From 5 Draws</span>
            </div>
            <span className="arrow-icon">→</span>
          </div>
        </div>
      </section>

      {/* Commission Table */}
      <section className="referral-section commission-table-section">
        <div className="table-header">
          <h2>💎 Commission Structure</h2>
          <p>Earning percentage based on level and program</p>
        </div>

        <div className="commission-table-container">
          <table className="commission-table">
            <thead>
              <tr>
                <th className="level-column">
                  <div className="th-content">
                    <span className="th-icon">👥</span>
                    <span>Level</span>
                  </div>
                </th>
                <th className="program-column program1">$1 Program</th>
                <th className="program-column program2">$2 Program</th>
                <th className="program-column program5">$5 Program</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="level-cell">1</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
              <tr><td className="level-cell">2</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
              <tr><td className="level-cell">3</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
              <tr><td className="level-cell">4</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
              <tr><td className="level-cell">5</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
              <tr><td className="level-cell">6</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
              <tr><td className="level-cell">7</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
              <tr><td className="level-cell">8</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
              <tr><td className="level-cell">9</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
              <tr><td className="level-cell">10</td><td className="program-cell">$0.10</td><td className="program-cell">$0.20</td><td className="program-cell">$0.50</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Winning Commission Details */}
      <section className="referral-section winning-details-section">
        <div className="table-header">
          <h2>🎯 Winning Commission Breakdown</h2>
          <p>How you earn from referral wins</p>
        </div>

        <div className="winning-cards">
          <div className="winning-detail-card">
            <div className="card-number">1</div>
            <div className="card-content">
              <h3>Direct Commission (Level 1)</h3>
              <p>Earn 5% from direct referral wins</p>
            </div>
            <div className="card-percentage">5%</div>
          </div>

          <div className="winning-detail-card">
            <div className="card-number">2</div>
            <div className="card-content">
              <h3>Level Commission (Level 1 – 10)</h3>
              <p>0.5% from each level × 10 levels</p>
            </div>
            <div className="card-percentage">5%</div>
          </div>
        </div>

        <div className="total-commission-box">
          <div className="total-icon">🏆</div>
          <div className="total-info">
            <span className="total-label">Total Winning Commission</span>
            <span className="total-percentage">10%</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Referral;
