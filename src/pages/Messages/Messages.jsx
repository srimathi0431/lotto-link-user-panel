import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Messages.css";

const MESSAGES = [
  {
    id: 1,
    sender: "LottoLink",
    avatar: "LL",
    color: "purple",
    subject: "Your ticket purchase was successful!",
    preview: "Thank you for purchasing 5 tickets for the Mega Draw #LL-1258...",
    time: "2 mins ago",
    unread: true,
  },
  {
    id: 2,
    sender: "Support Team",
    avatar: "ST",
    color: "blue",
    subject: "Welcome to LottoLink!",
    preview: "Hi Kumar! We're excited to have you on board. Here's how to get started...",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    sender: "Draw Results",
    avatar: "DR",
    color: "green",
    subject: "Daily Draw #LL-1255 Results",
    preview: "The winning number for today's draw was 3729. Check if you won...",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    sender: "Wallet",
    avatar: "W",
    color: "orange",
    subject: "Deposit Confirmed - $50.00",
    preview: "Your wallet has been credited with $50.00. Your new balance is $125.00...",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 5,
    sender: "LottoLink",
    avatar: "LL",
    color: "purple",
    subject: "Special Offer: Buy 10 get 2 free!",
    preview: "Limited time offer! Buy 10 tickets and get 2 absolutely free on any draw...",
    time: "3 days ago",
    unread: false,
  },
];

export default function Messages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(MESSAGES);
  const [selected, setSelected] = useState(null);

  const handleOpen = (msg) => {
    setSelected(msg);
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, unread: false } : m))
    );
  };

  const unreadCount = messages.filter((m) => m.unread).length;

  if (selected) {
    return (
      <div className="messages-page">
        <div className="msg-detail-header">
          <button className="msg-back-btn" onClick={() => setSelected(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        </div>
        <div className="msg-detail-card">
          <div className="msg-detail-top">
            <div className={`msg-avatar ${selected.color}`}>{selected.avatar}</div>
            <div>
              <h3>{selected.sender}</h3>
              <span>{selected.time}</span>
            </div>
          </div>
          <h2>{selected.subject}</h2>
          <p>{selected.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <div className="msg-header">
        <button className="msg-back-btn" onClick={() => navigate("/home")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <div className="msg-title-row">
          <h1>Messages</h1>
          {unreadCount > 0 && (
            <span className="msg-unread-badge">{unreadCount} new</span>
          )}
        </div>
      </div>

      <div className="msg-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`msg-item ${msg.unread ? "unread" : ""}`}
            onClick={() => handleOpen(msg)}
          >
            <div className={`msg-avatar ${msg.color}`}>{msg.avatar}</div>
            <div className="msg-content">
              <div className="msg-top-row">
                <strong>{msg.sender}</strong>
                <span className="msg-time">{msg.time}</span>
              </div>
              <div className="msg-subject">{msg.subject}</div>
              <div className="msg-preview">{msg.preview}</div>
            </div>
            {msg.unread && <span className="msg-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}
