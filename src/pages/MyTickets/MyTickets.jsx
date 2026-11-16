import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyTickets.css";

// SVG Icons
const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" />
    <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" />
    <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2" />
  </svg>
);

const CrownIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 20h20v-4H2v4zm2-18l4 5 4-5 4 5 4-5v11H4V2z" />
  </svg>
);

const BoltIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const TicketIconSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CalendarDetailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const CoinsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const getIcon = (name) => {
  if (name.includes("Daily"))   return <CalendarIcon />;
  if (name.includes("Weekly"))  return <CrownIcon />;
  if (name.includes("Monthly")) return <BoltIcon />;
  return <TicketIconSVG />;
};

const getTheme = (name) => {
  if (name.includes("Daily"))   return "daily";
  if (name.includes("Weekly"))  return "weekly";
  if (name.includes("Monthly")) return "monthly";
  return "mega";
};

function MyTickets() {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("myPurchases");
    if (!saved) return;
    const purchases = JSON.parse(saved);
    const mapped = purchases.map((p) => ({
      id: p.id,
      packageName: p.packageName,
      ticketCount: p.quantity,
      amount: p.totalAmount,
      price: p.price,
      status: (p.status || "Active").toUpperCase(),
      purchasedAt: p.purchaseDate?.split(",")[0] || "",
      purchaseTime: p.purchaseDate?.split(",")[1]?.trim() || "",
      drawDate: p.drawDate || "",
      chosenNumber: p.chosenNumber || null,
      splitNumbers: p.splitNumbers || null,
      icon: getIcon(p.packageName),
      theme: getTheme(p.packageName),
    }));
    setTickets(mapped);
  }, []);

  const goBack = () => {
    if (selectedTicket) { setSelectedTicket(null); return; }
    navigate("/home");
  };

  /* ---- MOBILE HEADER ---- */
  const renderHeader = () => (
    <div className="mytickets-mobile-back">
      <div className="mytickets-mobile-header-content">
        <button className="mytickets-back-button" onClick={goBack} aria-label="Go back">
          <ChevronLeftIcon />
        </button>
        <div className="mytickets-header-title-section">
          <h1 className="mytickets-mobile-header-title">
            {selectedTicket ? selectedTicket.packageName : "My Tickets"}
          </h1>
          {!selectedTicket && tickets.length > 0 && (
            <p className="mytickets-header-subtitle">
              {tickets.length} {tickets.length === 1 ? "Package" : "Packages"} Purchased
            </p>
          )}
        </div>
      </div>
    </div>
  );

  /* ---- TICKET LIST ---- */
  const renderTicketList = () => {
    if (tickets.length === 0) {
      return (
        <>
          <div className="mytickets-page-heading">
            <div>
              <h1>My Tickets</h1>
              <p>View your purchased packages and ticket numbers.</p>
            </div>
          </div>
          <section className="mytickets-empty-state">
            <div className="mytickets-empty-icon"><TicketIconSVG /></div>
            <h2>No Tickets Yet</h2>
            <p>You haven't purchased any lottery tickets yet.</p>
            <button className="mytickets-buy-button" onClick={() => navigate("/tickets")}>
              Buy Tickets Now
            </button>
          </section>
        </>
      );
    }

    return (
      <section className="mytickets-list-section">
        <div className="mytickets-page-heading">
          <div>
            <h1>My Tickets</h1>
            <p>{tickets.length} {tickets.length === 1 ? "package" : "packages"} purchased</p>
          </div>
          <button className="mytickets-buy-button small" onClick={() => navigate("/tickets")}>
            + Buy More
          </button>
        </div>
        <div className="mytickets-list">
          {tickets.map((ticket) => (
            <article className="myticket-card" key={ticket.id}>
              <div className={`myticket-icon ${ticket.theme}`}>{ticket.icon}</div>
              <div className="myticket-information">
                <h3>{ticket.packageName}</h3>
                <p className="myticket-purchase-info">
                  {ticket.ticketCount} {ticket.ticketCount === 1 ? "Ticket" : "Tickets"}
                  <span className="myticket-dot">•</span>
                  {ticket.purchasedAt}
                </p>
                {/* Show split numbers or single number */}
                {ticket.splitNumbers && ticket.splitNumbers.length > 1 ? (
                  <div className="myticket-split-row">
                    {ticket.splitNumbers.map((s, i) => (
                      <div key={i} className="myticket-split-item">
                        <span className="myticket-split-count">{s.count}×</span>
                        {s.number.split("").map((d, j) => (
                          <span key={j} className="myticket-num-badge">{d}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : ticket.chosenNumber ? (
                  <div className="myticket-number-row">
                    {ticket.chosenNumber.split("").map((d, i) => (
                      <span key={i} className="myticket-num-badge">{d}</span>
                    ))}
                  </div>
                ) : null}
                <div className="myticket-bottom-row">
                  <span className={`myticket-status ${ticket.status === "ACTIVE" ? "status-active" : "status-expired"}`}>
                    {ticket.status}
                  </span>
                  <strong className="myticket-price">${ticket.amount.toFixed(2)}</strong>
                </div>
              </div>
              <button
                className="myticket-arrow"
                onClick={() => setSelectedTicket(ticket)}
                aria-label={`View ${ticket.packageName}`}
              >›</button>
            </article>
          ))}
        </div>
      </section>
    );
  };

  /* ---- TICKET DETAIL ---- */
  const renderTicketDetails = () => {
    const t = selectedTicket;
    return (
      <>
        <div className="mytickets-detail-heading">
          <div>
            <h1>{t.packageName}</h1>
            <p>{t.ticketCount} Tickets • {t.purchasedAt}</p>
          </div>
          <span className={`myticket-status ${t.status === "ACTIVE" ? "status-active" : "status-expired"}`}>
            {t.status}
          </span>
        </div>

        <section className="myticket-detail-card">
          {/* Summary */}
          <div className="myticket-detail-summary">
            <div className={`myticket-icon detail-icon ${t.theme}`}>{t.icon}</div>
            <div className="myticket-detail-summary-text">
              <h2>{t.packageName}</h2>
              <p>{t.ticketCount} Tickets</p>
              <p>{t.purchasedAt}{t.purchaseTime ? `, ${t.purchaseTime}` : ""}</p>
            </div>
            <strong className="myticket-detail-price">${t.amount.toFixed(2)}</strong>
          </div>

          {/* Chosen Number / Split Numbers */}
          {t.splitNumbers && t.splitNumbers.length > 1 ? (
            <div className="myticket-chosen-number">
              <span className="myticket-chosen-label">Your Ticket Numbers</span>
              {t.splitNumbers.map((s, i) => (
                <div key={i} className="myticket-split-detail-row">
                  <span className="myticket-split-detail-count">{s.count} tickets</span>
                  <div className="myticket-chosen-digits">
                    {s.number.split("").map((d, j) => (
                      <span key={j} className="myticket-chosen-digit">{d}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : t.chosenNumber ? (
            <div className="myticket-chosen-number">
              <span className="myticket-chosen-label">Your Lucky Number</span>
              <div className="myticket-chosen-digits">
                {t.chosenNumber.split("").map((d, i) => (
                  <span key={i} className="myticket-chosen-digit">{d}</span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Info rows */}
          <div className="myticket-purchase-details">
            <div className="myticket-detail-row">
              <div className="myticket-detail-symbol calendar-symbol"><CalendarDetailIcon /></div>
              <div>
                <span>Purchase Date</span>
                <strong>{t.purchasedAt}{t.purchaseTime ? `, ${t.purchaseTime}` : ""}</strong>
              </div>
            </div>
            <div className="myticket-detail-row">
              <div className="myticket-detail-symbol ticket-symbol">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div>
                <span>Total Tickets</span>
                <strong>{t.ticketCount}</strong>
              </div>
            </div>
            <div className="myticket-detail-row">
              <div className="myticket-detail-symbol amount-symbol"><CoinsIcon /></div>
              <div>
                <span>Total Amount</span>
                <strong>${t.amount.toFixed(2)}</strong>
              </div>
            </div>
            <div className="myticket-detail-row">
              <div className="myticket-detail-symbol draw-symbol"><ClockIcon /></div>
              <div>
                <span>Draw Date</span>
                <strong>{t.drawDate}</strong>
              </div>
            </div>
          </div>

          {/* Status notice */}
          {t.status === "ACTIVE" ? (
            <div className="myticket-active-notice">
              <span>✓</span>
              <div>
                <strong>Your package is active</strong>
                <p>Good luck! Draw results will be announced soon.</p>
              </div>
            </div>
          ) : (
            <div className="myticket-expired-notice">
              <span>ⓘ</span>
              <div>
                <strong>This package has expired</strong>
                <p>This package is no longer active.</p>
              </div>
            </div>
          )}

          <button className="myticket-back-list-button" onClick={() => setSelectedTicket(null)}>
            ← Back to My Tickets
          </button>
        </section>
      </>
    );
  };

  return (
    <div className="mytickets-page">
      {renderHeader()}
      {selectedTicket ? renderTicketDetails() : renderTicketList()}
      <footer className="lotto-footer mytickets-footer">
        <p>© {new Date().getFullYear()} LOTTO LINK. Play Responsibly.</p>
      </footer>
    </div>
  );
}

export default MyTickets;
