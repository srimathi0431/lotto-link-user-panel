import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Home/Home.css";
import "./MyTickets.css";

// SVG Icons
const ChevronLeftIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6" />
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

const TicketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// Generate random 6-digit lottery numbers
const generateLotteryNumbers = (count, seed) => {
  const numbers = [];
  // Use seed for consistent generation per purchase ID
  let random = parseInt(seed.replace(/[^0-9]/g, '')) || 12345;
  
  for (let i = 0; i < count; i++) {
    random = (random * 9301 + 49297) % 233280;
    const num = 100000 + (random % 900000);
    numbers.push(num.toString());
  }
  return numbers;
};

function TicketDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    // Load purchases and find the specific one
    const savedPurchases = localStorage.getItem('myPurchases');
    if (savedPurchases) {
      const purchases = JSON.parse(savedPurchases);
      const foundTicket = purchases.find(p => p.id === id);
      
      if (foundTicket) {
        // Generate lottery numbers for this ticket
        foundTicket.numbers = generateLotteryNumbers(foundTicket.quantity, foundTicket.id);
        setTicket(foundTicket);
      }
    }
  }, [id]);

  const handleBack = () => {
    navigate("/my-tickets");
  };

  const handleShare = async () => {
    if (!ticket) return;
    
    const ticketText = `My LOTTO LINK Tickets (${ticket.packageName}):\n${ticket.numbers.join(", ")}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Lottery Tickets",
          text: ticketText,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(ticketText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!ticket) {
    return (
      <div className="lotto-home my-tickets-page">
        <div className="lotto-main-content my-tickets-main">
          <header className="my-tickets-header">
            <button
              type="button"
              className="ticket-back-button"
              onClick={handleBack}
              aria-label="Go back"
            >
              <ChevronLeftIcon />
            </button>
            <h1>Ticket Details</h1>
          </header>
          <p className="ticket-not-found">Ticket not found</p>
        </div>
      </div>
    );
  }

  return (
    <main className="lotto-home my-tickets-page">
      <div className="lotto-main-content my-tickets-main">
        
        {/* Header with Back Button */}
        <header className="my-tickets-header">
          <button
            type="button"
            className="ticket-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ChevronLeftIcon />
          </button>
          <h1>Ticket Details</h1>
        </header>

        {/* Ticket Info Card */}
        <section className="my-ticket-info-card">
          <div className="my-ticket-header">
            <div className="my-ticket-icon">
              <TicketIcon />
            </div>
            <div className="my-ticket-title">
              <h2>{ticket.packageName}</h2>
              <p className="my-ticket-status">{ticket.status}</p>
            </div>
          </div>

          <div className="my-ticket-details">
            <div className="my-ticket-detail-row">
              <span>Tickets Purchased</span>
              <strong>{ticket.quantity} Tickets</strong>
            </div>
            <div className="my-ticket-detail-row">
              <span>Total Amount</span>
              <strong>${ticket.totalAmount.toFixed(2)}</strong>
            </div>
            <div className="my-ticket-detail-row">
              <span>Purchase Date</span>
              <strong>{ticket.purchaseDate}</strong>
            </div>
            <div className="my-ticket-detail-row">
              <span>Draw Date</span>
              <strong className="draw-highlight">{ticket.drawDate}</strong>
            </div>
            <div className="my-ticket-detail-row">
              <span>Transaction ID</span>
              <strong className="transaction-id">{ticket.id}</strong>
            </div>
          </div>
        </section>

        {/* Lottery Numbers Section */}
        <section className="my-ticket-numbers-section">
          <div className="numbers-section-header">
            <h3>
              <span className="numbers-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="1" y="1" width="10" height="10" rx="2" />
                  <rect x="13" y="1" width="10" height="10" rx="2" />
                  <rect x="1" y="13" width="10" height="10" rx="2" />
                  <rect x="13" y="13" width="10" height="10" rx="2" />
                  <circle cx="6" cy="6" r="1.5" fill="white" />
                  <circle cx="18" cy="6" r="1.5" fill="white" />
                  <circle cx="15" cy="6" r="1.5" fill="white" />
                  <circle cx="6" cy="18" r="1.5" fill="white" />
                  <circle cx="9" cy="18" r="1.5" fill="white" />
                  <circle cx="18" cy="15" r="1.5" fill="white" />
                  <circle cx="18" cy="18" r="1.5" fill="white" />
                  <circle cx="18" cy="21" r="1.5" fill="white" />
                </svg>
              </span>
              Your Ticket Numbers
            </h3>
            <p>Machine-generated lottery numbers for your tickets</p>
          </div>

          <div className="lottery-numbers-grid">
            {ticket.numbers.map((number, index) => (
              <div key={index} className="lottery-number-card">
                <span className="lottery-number-label">#{index + 1}</span>
                <div className="lottery-number">{number}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Share Button */}
        <button
          type="button"
          className="share-tickets-button"
          onClick={handleShare}
        >
          <ShareIcon />
          {copied ? "Copied!" : "Share Tickets"}
        </button>

        {/* Info Note */}
        <div className="my-ticket-note">
          <p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px'}}>
              <path d="M12 2C10.69 2 9.58 2.89 9.17 4.1C7.47 4.5 6 5.94 6 7.76V12.24C6 14.06 7.47 15.5 9.17 15.9C9.58 17.11 10.69 18 12 18C13.31 18 14.42 17.11 14.83 15.9C16.53 15.5 18 14.06 18 12.24V7.76C18 5.94 16.53 4.5 14.83 4.1C14.42 2.89 13.31 2 12 2M12 4C12.55 4 13 4.45 13 5C13 5.55 12.55 6 12 6C11.45 6 11 5.55 11 5C11 4.45 11.45 4 12 4M8 8H9V10H8V8M15 8H16V10H15V8M12 9C12.55 9 13 9.45 13 10C13 10.55 12.55 11 12 11C11.45 11 11 10.55 11 10C11 9.45 11.45 9 12 9M8 12H9V14H8V12M15 12H16V14H15V12Z" />
            </svg>
            Good luck! Draw results will be announced at {ticket.drawDate}.
          </p>
        </div>

        {/* Footer */}
        <footer className="lotto-footer">
          <p>© {new Date().getFullYear()} LOTTO LINK. Play Responsibly.</p>
        </footer>
      </div>
    </main>
  );
}

export default TicketDetail;
