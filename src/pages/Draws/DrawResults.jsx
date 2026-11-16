import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DrawResults.css";

// Match logic: last N digits of winning number
const getMatchLevel = (ticketNum, winningNum) => {
  for (let n = 4; n >= 1; n--) {
    const wSuffix = winningNum.slice(4 - n);
    const tSuffix = ticketNum.slice(4 - n);
    if (wSuffix === tSuffix) return n;
  }
  return 0;
};

const getPrizes = (entries, price) => {
  const pool = entries * price;
  return {
    pool,
    first:   +(pool * 0.40).toFixed(2),
    second:  +(pool * 0.20).toFixed(2),
    third:   +(pool * 0.15).toFixed(2),
    fourth:  +(pool * 0.10).toFixed(2),
    admin:   +(pool * 0.10).toFixed(2),
    royalty: +(pool * 0.05).toFixed(2),
  };
};

const DRAW_RESULTS = {
  "LL-1258": {
    drawName: "Mega Draw #LL-1258",
    date: "10 November 2026",
    time: "08:00 PM",
    ticketPrice: 1,
    entries: 8942,
    winningNumber: "3729",
    winners: [
      { id: 1, rank: "gold",   matchLevel: 4, position: "1st Winner", name: "R. Suresh Kumar", initials: "RS", ticketNumber: "3729", prize: "$3,576.80", ticket: "TK-00482", location: "Chennai, TN" },
      { id: 2, rank: "silver", matchLevel: 3, position: "2nd Winner", name: "M. Priya",         initials: "MP", ticketNumber: "5729", prize: "$1,788.40", ticket: "TK-01247", location: "Coimbatore, TN" },
      { id: 3, rank: "bronze", matchLevel: 2, position: "3rd Winner", name: "K. Karthik",       initials: "KK", ticketNumber: "1129", prize: "$1,341.30", ticket: "TK-00935", location: "Madurai, TN" },
      { id: 4, rank: "fourth", matchLevel: 1, position: "4th Winner", name: "S. Ravi",           initials: "SR", ticketNumber: "8889", prize: "$447.10",   ticket: "TK-00621", location: "Salem, TN" },
    ],
  },
  "LL-1255": {
    drawName: "Daily Draw #LL-1255",
    date: "07 November 2026",
    time: "07:00 PM",
    ticketPrice: 1,
    entries: 3928,
    winningNumber: "3729",
    winners: [
      { id: 1, rank: "gold",   matchLevel: 4, position: "1st Winner", name: "A. Rajan",    initials: "AR", ticketNumber: "3729", prize: "$1,571.20", ticket: "TK-00211", location: "Salem, TN" },
      { id: 2, rank: "silver", matchLevel: 3, position: "2nd Winner", name: "P. Kavitha",  initials: "PK", ticketNumber: "1729", prize: "$785.60",   ticket: "TK-00744", location: "Trichy, TN" },
      { id: 3, rank: "bronze", matchLevel: 2, position: "3rd Winner", name: "S. Murugan",  initials: "SM", ticketNumber: "4429", prize: "$589.20",   ticket: "TK-01102", location: "Tirunelveli, TN" },
      { id: 4, rank: "fourth", matchLevel: 1, position: "4th Winner", name: "T. Velmurugan", initials: "TV", ticketNumber: "5559", prize: "$196.40", ticket: "TK-00889", location: "Erode, TN" },
    ],
  },
  "LL-1254": {
    drawName: "Evening Draw #LL-1254",
    date: "06 November 2026",
    time: "08:30 PM",
    ticketPrice: 3,
    entries: 4652,
    winningNumber: "8154",
    winners: [
      { id: 1, rank: "gold",   matchLevel: 4, position: "1st Winner", name: "V. Anand",  initials: "VA", ticketNumber: "8154", prize: "$5,582.40", ticket: "TK-00388", location: "Erode, TN" },
      { id: 2, rank: "silver", matchLevel: 3, position: "2nd Winner", name: "L. Deepa",  initials: "LD", ticketNumber: "2154", prize: "$2,791.20", ticket: "TK-00622", location: "Vellore, TN" },
      { id: 3, rank: "bronze", matchLevel: 2, position: "3rd Winner", name: "R. Balu",   initials: "RB", ticketNumber: "3354", prize: "$2,093.40", ticket: "TK-00891", location: "Thanjavur, TN" },
      { id: 4, rank: "fourth", matchLevel: 1, position: "4th Winner", name: "M. Ganesh", initials: "MG", ticketNumber: "7774", prize: "$697.80",   ticket: "TK-01055", location: "Madurai, TN" },
    ],
  },
};

const RANK_ICONS = {
  gold: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  silver: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  bronze: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

export default function DrawResults() {
  const { id } = useParams();
  const navigate = useNavigate();

  const result = DRAW_RESULTS[id];
  const prizes = result ? getPrizes(result.entries, result.ticketPrice) : null;

  if (!result) {
    return (
      <div className="draw-results-page">
        <div className="dr-not-found">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
          </svg>
          <h2>Results not found</h2>
          <p>No results available for this draw.</p>
          <button className="dr-back-btn" onClick={() => navigate("/draws")}>
            ← Back to Draws
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="draw-results-page">

      {/* BACK BUTTON */}
      <button className="dr-back-btn" onClick={() => navigate("/draws")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Draws
      </button>

      {/* HEADER */}
      <div className="dr-header">
        <div className="dr-trophy">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 3H17V7C17 11 15 14 12 15C9 14 7 11 7 7V3Z" />
            <path d="M7 5H3V8C3 11 5 12 8 12M17 5H21V8C21 11 19 12 16 12" />
            <path d="M10 15H14V19H10ZM7 21H17V23H7Z" />
          </svg>
        </div>
        <div className="dr-header-label">OFFICIAL RESULTS</div>
        <h1>{result.drawName}</h1>
        <div className="dr-header-meta">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {result.date}
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
            {result.time}
          </span>
        </div>
      </div>

      {/* WINNING NUMBER */}
      <div className="dr-winning-number">
        <div className="dr-wn-label">WINNING NUMBER</div>
        <div className="dr-wn-digits">
          {result.winningNumber.split("").map((digit, i) => (
            <span key={i} className="dr-wn-digit">{digit}</span>
          ))}
        </div>
        <div className="dr-wn-prize">Total Prize Pool: <strong>${prizes.pool.toLocaleString()}</strong></div>
      </div>

      {/* WINNERS SUMMARY SECTION */}
      <div className="dr-winners-summary">
        <div className="dr-summary-header">
          <h3>{result.drawName.split('#')[1]} Results</h3>
          <span className="dr-summary-date">{result.date}</span>
        </div>

        {/* Winners List */}
        <div className="dr-summary-winners">
          <div className="dr-summary-section-title">🏆 Winners</div>
          <div className="dr-summary-winner-row">
            <div className="dr-summary-winner-left">
              <span className="dr-summary-rank gold">🥇</span>
              <span className="dr-summary-winner-label">Winner #1</span>
            </div>
            <div className="dr-summary-winner-right">
              <span className="dr-summary-ticket">Number: {result.winningNumber}</span>
              <span className="dr-summary-amount">${prizes.first.toLocaleString()}</span>
            </div>
          </div>
          <div className="dr-summary-winner-row">
            <div className="dr-summary-winner-left">
              <span className="dr-summary-rank silver">🥈</span>
              <span className="dr-summary-winner-label">Winner #2</span>
            </div>
            <div className="dr-summary-winner-right">
              <span className="dr-summary-ticket">Number: {result.winningNumber.slice(1)}</span>
              <span className="dr-summary-amount">${prizes.second.toLocaleString()}</span>
            </div>
          </div>
          <div className="dr-summary-winner-row">
            <div className="dr-summary-winner-left">
              <span className="dr-summary-rank bronze">🥉</span>
              <span className="dr-summary-winner-label">Winner #3</span>
            </div>
            <div className="dr-summary-winner-right">
              <span className="dr-summary-ticket">Number: {result.winningNumber.slice(2)}</span>
              <span className="dr-summary-amount">${prizes.third.toLocaleString()}</span>
            </div>
          </div>
          <div className="dr-summary-winner-row">
            <div className="dr-summary-winner-left">
              <span className="dr-summary-rank fourth">🎖️</span>
              <span className="dr-summary-winner-label">Winner #4</span>
            </div>
            <div className="dr-summary-winner-right">
              <span className="dr-summary-ticket">Number: {result.winningNumber.slice(3)}</span>
              <span className="dr-summary-amount">${prizes.fourth.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Admin Section */}
        <div className="dr-summary-admin">
          <div className="dr-summary-section-title">⚙️ Admin</div>
          <div className="dr-summary-row">
            <span className="dr-summary-label">Admin Fee (10%)</span>
            <span className="dr-summary-value">${prizes.admin.toLocaleString()}</span>
          </div>
        </div>

        {/* Pool Details */}
        <div className="dr-summary-pool">
          <div className="dr-summary-section-title">💰 Pool Details</div>
          <div className="dr-summary-row">
            <span className="dr-summary-label">Next Pool Amount (5%)</span>
            <span className="dr-summary-value highlight">${prizes.royalty.toLocaleString()}</span>
          </div>
          <div className="dr-summary-row">
            <span className="dr-summary-label">Total Participation Collection</span>
            <span className="dr-summary-value">${prizes.pool.toLocaleString()}</span>
          </div>
          <div className="dr-summary-row">
            <span className="dr-summary-label">Tickets Sold</span>
            <span className="dr-summary-value">{result.entries.toLocaleString()}</span>
          </div>
          <div className="dr-summary-row">
            <span className="dr-summary-label">Ticket Price</span>
            <span className="dr-summary-value">${result.ticketPrice}</span>
          </div>
        </div>
      </div>



      {/* FOOTER ACTIONS */}
      <div className="dr-actions">
        <button className="dr-primary-btn" onClick={() => navigate("/draws")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
          </svg>
          View All Draws
        </button>
        <button className="dr-secondary-btn" onClick={() => navigate("/tickets")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Buy Tickets
        </button>
      </div>

    </div>
  );
}
