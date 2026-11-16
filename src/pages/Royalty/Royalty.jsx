import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Royalty.css";

const Royalty = () => {
  const navigate = useNavigate();
  const [withdrawnAmount, setWithdrawnAmount] = useState(1200.00);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Demo royalty data
  const royaltyStats = {
    totalMembers: 31,
    stage1Members: 1,
    stage2Members: 5,
    stage3Members: 25,
    totalRoyaltyIncome: 3500.00,
    nextPayout: "15 Feb 2027",
    ticketsMaintained: 4,
    requiredTickets: 4,
    qualificationStatus: "Qualified",
    isDirector: false, // Will be true when 500+ members
    directorMembers: 31 // Count for director level
  };

  const availableToWithdraw = royaltyStats.totalRoyaltyIncome - withdrawnAmount;

  // Stage members data
  const stageMembers = {
    stage1: [
      { id: 1, name: "Kumar R", userId: "LLK123457", joinDate: "1 Nov 2026", tickets: 6, status: "Active" }
    ],
    stage2: [
      { id: 1, name: "Priya S", userId: "LLK123458", joinDate: "3 Nov 2026", tickets: 5, status: "Active" },
      { id: 2, name: "Arun M", userId: "LLK123459", joinDate: "5 Nov 2026", tickets: 4, status: "Active" },
      { id: 3, name: "Divya K", userId: "LLK123460", joinDate: "7 Nov 2026", tickets: 7, status: "Active" },
      { id: 4, name: "Ravi P", userId: "LLK123461", joinDate: "9 Nov 2026", tickets: 4, status: "Active" },
      { id: 5, name: "Meena V", userId: "LLK123462", joinDate: "11 Nov 2026", tickets: 5, status: "Active" }
    ],
    stage3: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Member ${i + 1}`,
      userId: `LLK1234${63 + i}`,
      joinDate: `${12 + Math.floor(i / 2)} Nov 2026`,
      tickets: 4 + (i % 4),
      status: "Active"
    }))
  };

  const [expandedStage, setExpandedStage] = useState(null);

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  const toggleStage = (stage) => {
    setExpandedStage(expandedStage === stage ? null : stage);
  };

  const handleWithdraw = () => {
    if (availableToWithdraw <= 0) return;
    
    setIsWithdrawing(true);
    // Simulate withdrawal process
    setTimeout(() => {
      setIsWithdrawing(false);
      setShowSuccessModal(true);
      // Update withdrawn amount
      setWithdrawnAmount(royaltyStats.totalRoyaltyIncome);
    }, 3000);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <main className="lotto-home ll-royalty">
      {/* Page Title */}
      <section className="royalty-page-header">
        <h1>Royalty Income</h1>
      </section>

      {/* Total Royalty Income Banner */}
      <section className="royalty-income-banner">
        <div className="income-banner-content">
          <div className="income-icon-large">👑</div>
          <div className="income-amount-large">{formatMoney(royaltyStats.totalRoyaltyIncome)}</div>
          <div className="income-status">
            <span className="status-badge qualified">✓ {royaltyStats.qualificationStatus}</span>
            <span className="next-payout">Next Payout: {royaltyStats.nextPayout}</span>
          </div>
        </div>
      </section>

      {/* Withdrawal Section */}
      <section className="withdrawal-section">
        <div className="withdrawal-box">
          <div className="withdrawal-row">
            <span className="withdrawal-label">Already Withdrawn:</span>
            <span className="withdrawal-amount withdrawn">{formatMoney(withdrawnAmount)}</span>
          </div>
          <div className="withdrawal-row">
            <span className="withdrawal-label">Available to Withdraw:</span>
            <span className="withdrawal-amount available">{formatMoney(availableToWithdraw)}</span>
          </div>
          <button 
            className={`withdraw-btn ${isWithdrawing ? 'loading' : ''} ${availableToWithdraw <= 0 ? 'disabled' : ''}`}
            onClick={handleWithdraw}
            disabled={isWithdrawing || availableToWithdraw <= 0}
          >
            {isWithdrawing ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>Withdraw to Wallet</>
            )}
          </button>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={closeSuccessModal}>
          <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">✓</div>
            <h2>Withdrawal Successful!</h2>
            <p>Amount has been credited to your wallet</p>
            <div className="success-amount">{formatMoney(availableToWithdraw)}</div>
            <button className="modal-btn" onClick={closeSuccessModal}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Royalty Members Section - Click to navigate */}
      <section 
        className="royalty-section clickable-section members-section"
        onClick={() => navigate('/royalty/members')}
      >
        <div className="section-content">
          <div className="section-left">
            <span className="section-icon">👥</span>
            <div className="section-info">
              <h2>Royalty Members</h2>
              <p>View your network tree structure</p>
            </div>
          </div>
          <div className="section-right">
            <div className="section-stats">
              <span className="stat-value">{royaltyStats.totalMembers} Members</span>
              <span className="stat-label">Stage 1-3 Network</span>
            </div>
            <span className="arrow-icon">→</span>
          </div>
        </div>
      </section>

      {/* Royalty Director Section - Click to navigate */}
      <section 
        className="royalty-section clickable-section director-section"
        onClick={() => navigate('/royalty/director')}
      >
        <div className="section-content">
          <div className="section-left">
            <span className="section-icon">👑</span>
            <div className="section-info">
              <h2>Royalty Director</h2>
              <p>Build 500 members network</p>
            </div>
          </div>
          <div className="section-right">
            <div className="section-stats">
              <span className="stat-value">{royaltyStats.directorMembers} / {royaltyStats.directorTarget}</span>
              <span className="stat-label">Director Progress</span>
            </div>
            <span className="arrow-icon">→</span>
          </div>
        </div>
      </section>

      {/* Qualification Status */}
      <section className="royalty-section qualification-section">
        <div className="section-header">
          <h2>📊 Your Qualification Status</h2>
        </div>
        <div className="qualification-grid">
          <div className="qual-card">
            <div className="qual-icon">🎫</div>
            <div className="qual-info">
              <span className="qual-label">Tickets Maintained</span>
              <span className="qual-value">{royaltyStats.ticketsMaintained} / {royaltyStats.requiredTickets}</span>
            </div>
            <div className="qual-badge success">✓</div>
          </div>
          <div className="qual-card">
            <div className="qual-icon">👥</div>
            <div className="qual-info">
              <span className="qual-label">Total Members</span>
              <span className="qual-value">{royaltyStats.totalMembers}</span>
            </div>
            <div className="qual-badge success">✓</div>
          </div>
          <div className="qual-card">
            <div className="qual-icon">📅</div>
            <div className="qual-info">
              <span className="qual-label">Payout Cycle</span>
              <span className="qual-value">Every 3 Months</span>
            </div>
            <div className="qual-badge info">ℹ</div>
          </div>
        </div>
      </section>

      {/* Program Info */}
      <section className="royalty-section program-info-section">
        <div className="section-header">
          <h2>ℹ️ Program Information</h2>
        </div>
        <div className="info-cards-grid">
          <div className="info-card">
            <div className="info-icon">💰</div>
            <h3>Payout Cycle</h3>
            <p className="info-value">Every 3 Months</p>
            <p className="info-desc">Royalty paid quarterly to qualified members</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🎫</div>
            <h3>Maintenance Required</h3>
            <p className="info-value">4 Ticket Purchase</p>
            <p className="info-desc">Maintain minimum 4 tickets every quarter</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Royalty;
