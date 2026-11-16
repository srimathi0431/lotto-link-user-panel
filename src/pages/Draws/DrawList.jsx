import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DrawList.css";

// Prize calculation helper
const calcPrizes = (totalPool) => ({
  first:   (totalPool * 0.40).toFixed(2),
  second:  (totalPool * 0.20).toFixed(2),
  third:   (totalPool * 0.15).toFixed(2),
  fourth:  (totalPool * 0.10).toFixed(2),
  admin:   (totalPool * 0.10).toFixed(2),
  royalty: (totalPool * 0.05).toFixed(2),
});

const DRAW_DATA = [
  {
    id: "LL-1258",
    name: "Mega Draw #LL-1258",
    date: "10 November 2026",
    time: "08:00 PM",
    ticketPrice: 1,
    status: "live",
    featured: true,
    participants: 2847,
    entries: 8942,
  },
  {
    id: "LL-1257",
    name: "Weekly Draw #LL-1257",
    date: "09 November 2026",
    time: "06:00 PM",
    ticketPrice: 3,
    status: "upcoming",
    featured: false,
    participants: 1923,
    entries: 5847,
  },
  {
    id: "LL-1256",
    name: "Super Draw #LL-1256",
    date: "08 November 2026",
    time: "09:00 PM",
    ticketPrice: 12,
    status: "upcoming",
    featured: true,
    participants: 4521,
    entries: 12483,
  },
  {
    id: "LL-1255",
    name: "Daily Draw #LL-1255",
    date: "07 November 2026",
    time: "07:00 PM",
    ticketPrice: 1,
    status: "completed",
    featured: false,
    participants: 1245,
    entries: 3928,
    winningNumber: "3729",
  },
  {
    id: "LL-1254",
    name: "Evening Draw #LL-1254",
    date: "06 November 2026",
    time: "08:30 PM",
    ticketPrice: 3,
    status: "completed",
    featured: false,
    participants: 1876,
    entries: 4652,
    winningNumber: "8154",
  },
];

export default function DrawList() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filterDraws = () => {
    switch (activeTab) {
      case "live":
        return DRAW_DATA.filter((d) => d.status === "live");
      case "upcoming":
        return DRAW_DATA.filter((d) => d.status === "upcoming");
      case "completed":
        return DRAW_DATA.filter((d) => d.status === "completed");
      default:
        return DRAW_DATA;
    }
  };

  const filteredDraws = filterDraws();

  const handleDrawClick = (draw) => {
    if (draw.status === "completed") {
      navigate(`/draws/${draw.id}/results`);
    } else {
      navigate(`/draws/${draw.id}`);
    }
  };

  return (
    <div className="draw-list-page">
      {/* HEADER */}
      <div className="draw-list-header">
        <div>
          <h1>Live Draws</h1>
          <p>Participate in exciting draws and win amazing prizes</p>
        </div>
        <div className="draw-list-stats">
          <div className="stat-item">
            <span className="stat-value">$73,200</span>
            <span className="stat-label">Total Prize Pool</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">12,412</span>
            <span className="stat-label">Active Participants</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="draw-tabs">
        <button
          className={`draw-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M3 9h18M3 15h18M15 3v18" />
          </svg>
          All Draws
          <span className="tab-count">{DRAW_DATA.length}</span>
        </button>
        <button
          className={`draw-tab ${activeTab === "live" ? "active" : ""}`}
          onClick={() => setActiveTab("live")}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" fill="white" />
          </svg>
          Live Now
          <span className="tab-count live">
            {DRAW_DATA.filter((d) => d.status === "live").length}
          </span>
        </button>
        <button
          className={`draw-tab ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Upcoming
          <span className="tab-count">
            {DRAW_DATA.filter((d) => d.status === "upcoming").length}
          </span>
        </button>
        <button
          className={`draw-tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Completed
          <span className="tab-count">
            {DRAW_DATA.filter((d) => d.status === "completed").length}
          </span>
        </button>
      </div>

      {/* DRAW CARDS */}
      <div className="draw-cards-grid">
        {filteredDraws.map((draw, index) => (
          <div
            key={draw.id}
            className={`draw-card ${draw.status} ${
              draw.featured ? "featured" : ""
            } ${index === 0 && activeTab === "all" ? "first-card" : ""}`}
            onClick={() => handleDrawClick(draw)}
          >
            {/* FEATURED RIBBON */}
            {draw.featured && (
              <div className="featured-ribbon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Featured
              </div>
            )}

            {/* STATUS BADGE */}
            <div className={`draw-status-badge ${draw.status}`}>
              {draw.status === "live" && (
                <>
                  <span className="live-dot" />
                  LIVE NOW
                </>
              )}
              {draw.status === "upcoming" && (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  UPCOMING
                </>
              )}
              {draw.status === "completed" && (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  COMPLETED
                </>
              )}
            </div>

            {/* CARD CONTENT */}
            <div className="draw-card-content">
              <h3>{draw.name}</h3>
              <div className="draw-info-row">
                <div className="draw-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {draw.date}
                </div>
                <div className="draw-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {draw.time}
                </div>
              </div>

              {/* WINNING NUMBER (for completed draws) */}
              {draw.status === "completed" && draw.winningNumber && (
                <div className="winning-number-display">
                  <span className="winning-label">Winning Number</span>
                  <div className="winning-digits">
                    {draw.winningNumber.split("").map((digit, i) => (
                      <span key={i} className="winning-digit">
                        {digit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* PRIZE BOX */}
              <div className="draw-prize-box">
                <span className="prize-label">Total Prize Pool</span>
                <span className="prize-value">${(draw.entries * draw.ticketPrice).toLocaleString()}</span>
              </div>

              {/* PRIZE BREAKDOWN */}
              <div className="draw-prize-breakdown">
                <div className="prize-tier first">
                  <span className="prize-tier-label">1st</span>
                  <div className="prize-tier-boxes">
                    {["","","",""].map((_, i) => (
                      <span key={i} className="prize-box filled">?</span>
                    ))}
                  </div>
                  <span className="prize-tier-pct">40%</span>
                  <span className="prize-tier-amt">${(draw.entries * draw.ticketPrice * 0.40).toLocaleString()}</span>
                </div>
                <div className="prize-tier second">
                  <span className="prize-tier-label">2nd</span>
                  <div className="prize-tier-boxes">
                    <span className="prize-box empty">—</span>
                    {["","",""].map((_, i) => (
                      <span key={i} className="prize-box filled">?</span>
                    ))}
                  </div>
                  <span className="prize-tier-pct">20%</span>
                  <span className="prize-tier-amt">${(draw.entries * draw.ticketPrice * 0.20).toLocaleString()}</span>
                </div>
                <div className="prize-tier third">
                  <span className="prize-tier-label">3rd</span>
                  <div className="prize-tier-boxes">
                    <span className="prize-box empty">—</span>
                    <span className="prize-box empty">—</span>
                    {["",""].map((_, i) => (
                      <span key={i} className="prize-box filled">?</span>
                    ))}
                  </div>
                  <span className="prize-tier-pct">15%</span>
                  <span className="prize-tier-amt">${(draw.entries * draw.ticketPrice * 0.15).toLocaleString()}</span>
                </div>
                <div className="prize-tier fourth">
                  <span className="prize-tier-label">4th</span>
                  <div className="prize-tier-boxes">
                    <span className="prize-box empty">—</span>
                    <span className="prize-box empty">—</span>
                    <span className="prize-box empty">—</span>
                    <span className="prize-box filled">?</span>
                  </div>
                  <span className="prize-tier-pct">10%</span>
                  <span className="prize-tier-amt">${(draw.entries * draw.ticketPrice * 0.10).toLocaleString()}</span>
                </div>
                <div className="prize-tier admin-tier">
                  <span className="prize-tier-label">Admin</span>
                  <span className="prize-tier-pct">10%</span>
                  <span className="prize-tier-amt muted">${(draw.entries * draw.ticketPrice * 0.10).toLocaleString()}</span>
                </div>
                <div className="prize-tier royalty-tier">
                  <span className="prize-tier-label">Next Pool</span>
                  <span className="prize-tier-pct">5%</span>
                  <span className="prize-tier-amt muted">${(draw.entries * draw.ticketPrice * 0.05).toLocaleString()}</span>
                </div>
              </div>

              {/* STATS */}
              <div className="draw-stats-row">
                <div className="stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{draw.participants.toLocaleString()} participants</span>
                </div>
                <div className="stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>{draw.entries.toLocaleString()} entries</span>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                className={`draw-action-btn ${draw.status}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (draw.status === "completed") {
                    navigate(`/draws/${draw.id}/results`);
                  } else {
                    navigate(`/draws/${draw.id}`);
                  }
                }}
              >
                {draw.status === "live" && "Join Live Draw →"}
                {draw.status === "upcoming" && "Buy Tickets →"}
                {draw.status === "completed" && "View Results →"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredDraws.length === 0 && (
        <div className="draw-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
          </svg>
          <h3>No {activeTab} draws found</h3>
          <p>Check back later for more exciting draws</p>
        </div>
      )}
    </div>
  );
}
