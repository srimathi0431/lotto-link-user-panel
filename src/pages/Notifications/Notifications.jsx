import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "draw",
    icon: "🎰",
    title: "Draw Starting Soon!",
    body: "Mega Draw #LL-1258 starts in 30 minutes. Don't miss it!",
    time: "5 mins ago",
    unread: true,
    action: "/draws/LL-1258",
  },
  {
    id: 2,
    type: "ticket",
    icon: "🎟️",
    title: "Ticket Purchase Confirmed",
    body: "5 tickets purchased for Mega Draw #LL-1258. Good luck!",
    time: "20 mins ago",
    unread: true,
    action: "/my-tickets",
  },
  {
    id: 3,
    type: "wallet",
    icon: "💰",
    title: "Deposit Successful",
    body: "₹500 has been added to your wallet. Balance: ₹1,250",
    time: "1 hour ago",
    unread: true,
    action: "/wallet",
  },
  {
    id: 4,
    type: "result",
    icon: "🏆",
    title: "Draw Results Available",
    body: "Daily Draw #LL-1255 results are out. Winning number: 3729",
    time: "Yesterday",
    unread: false,
    action: "/draws/LL-1255/results",
  },
  {
    id: 5,
    type: "offer",
    icon: "🎁",
    title: "Special Offer for You!",
    body: "Buy 10 tickets and get 2 free. Offer valid until midnight!",
    time: "2 days ago",
    unread: false,
    action: "/tickets",
  },
  {
    id: 6,
    type: "referral",
    icon: "👥",
    title: "Referral Bonus Earned!",
    body: "Your friend joined using your code. You earned $50 bonus!",
    time: "3 days ago",
    unread: false,
    action: "/wallet",
  },
];

const TYPE_COLORS = {
  draw: "purple",
  ticket: "blue",
  wallet: "green",
  result: "gold",
  offer: "pink",
  referral: "cyan",
};

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleClick = (notif) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
    navigate(notif.action);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="notifications-page">
      <div className="notif-header">
        <button className="notif-back-btn" onClick={() => navigate("/home")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <div className="notif-title-row">
          <div>
            <h1>Notifications</h1>
            {unreadCount > 0 && (
              <span className="notif-unread-badge">{unreadCount} unread</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button className="notif-mark-all" onClick={markAllRead}>
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="notif-list">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notif-item ${notif.unread ? "unread" : ""} ${TYPE_COLORS[notif.type]}`}
            onClick={() => handleClick(notif)}
          >
            <div className={`notif-icon-wrap ${TYPE_COLORS[notif.type]}`}>
              <span>{notif.icon}</span>
            </div>
            <div className="notif-content">
              <div className="notif-top-row">
                <strong>{notif.title}</strong>
                <span className="notif-time">{notif.time}</span>
              </div>
              <p>{notif.body}</p>
            </div>
            {notif.unread && <span className="notif-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}
