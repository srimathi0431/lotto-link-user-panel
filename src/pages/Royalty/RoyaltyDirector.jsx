import React from "react";
import { useNavigate } from "react-router-dom";
import "./Royalty.css";

const RoyaltyDirector = () => {
  const navigate = useNavigate();

  // Generate 31 + 15 = 46 filled members
  const filledMembers = [
    { id: 1, name: "Kumar R", userId: "LLK123457" },
    { id: 2, name: "Priya S", userId: "LLK123458" },
    { id: 3, name: "Arun M", userId: "LLK123459" },
    { id: 4, name: "Divya K", userId: "LLK123460" },
    { id: 5, name: "Ravi P", userId: "LLK123461" },
    { id: 6, name: "Meena V", userId: "LLK123462" },
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 7,
      name: `Member ${i + 1}`,
      userId: `LLK1234${63 + i}`
    })),
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 32,
      name: `Extra ${i + 1}`,
      userId: `LLK1234${88 + i}`
    }))
  ];

  const totalSlots = 500;
  const emptySlots = totalSlots - filledMembers.length;

  return (
    <main className="lotto-home ll-royalty-director">
      {/* Page Header with Back Button */}
      <div className="page-header-inline">
        <button className="back-button" onClick={() => navigate('/royalty')}>
          ← Back
        </button>
        <div className="header-content">
          <h1>Royalty Director</h1>
          <p>{filledMembers.length} / {totalSlots} Members</p>
        </div>
      </div>

      {/* Progress Info */}
      <section className="director-progress-section">
        <div className="progress-stats">
          <div className="stat-box filled-stat">
            <span className="stat-icon">✓</span>
            <div className="stat-info">
              <span className="stat-label">Filled</span>
              <span className="stat-value">{filledMembers.length}</span>
            </div>
          </div>
          <div className="stat-box empty-stat">
            <span className="stat-icon">○</span>
            <div className="stat-info">
              <span className="stat-label">Remaining</span>
              <span className="stat-value">{emptySlots}</span>
            </div>
          </div>
          <div className="stat-box target-stat">
            <span className="stat-icon">🎯</span>
            <div className="stat-info">
              <span className="stat-label">Target</span>
              <span className="stat-value">{totalSlots}</span>
            </div>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${(filledMembers.length / totalSlots) * 100}%` }}>
            <span className="progress-text">{Math.round((filledMembers.length / totalSlots) * 100)}%</span>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="director-members-grid">
        {/* Filled Members */}
        {filledMembers.map(member => (
          <div key={member.id} className="director-member-box filled">
            <div className="member-avatar-small">
              {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="member-info-compact">
              <span className="member-name-small">{member.name}</span>
              <span className="member-id-small">{member.userId}</span>
            </div>
          </div>
        ))}

        {/* Empty Slots */}
        {Array.from({ length: emptySlots }, (_, i) => (
          <div key={`empty-${i}`} className="director-member-box empty">
            <div className="empty-icon">○</div>
            <span className="empty-label">Empty</span>
          </div>
        ))}
      </section>
    </main>
  );
};

export default RoyaltyDirector;
