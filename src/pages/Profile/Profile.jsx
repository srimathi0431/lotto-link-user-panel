import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const initialProfile = {
  name: "Ragavendar S",
  email: "ragavendar@gmail.com",
  phone: "+91 98765 43210",
  memberId: "LLK123456",
  dob: "2003-05-09",
  gender: "Male",
  address: "Salem, Tamil Nadu, India",
};

const stats = [
  {
    title: "My Tickets",
    value: "12",
    subtitle: "Total Tickets",
    icon: "🎟️",
    className: "tickets",
  },
  {
    title: "Winnings",
    value: "$5,000",
    subtitle: "Total Won",
    icon: "🏆",
    className: "winnings",
  },
  {
    title: "Transactions",
    value: "28",
    subtitle: "Total Records",
    icon: "⇄",
    className: "transactions",
  },
  {
    title: "Referral",
    value: "5",
    subtitle: "Total Referrals",
    icon: "👥",
    className: "referral",
  },
  {
    title: "Royalty Income",
    value: "$3,500",
    subtitle: "Quarterly Earnings",
    icon: "👑",
    className: "royalty",
  },
  {
    title: "Prize Distribution",
    value: "View",
    subtitle: "Prize Info",
    icon: "🏅",
    className: "prizes",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [modal, setModal] = useState(null);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(1250);
  const [twoFactor, setTwoFactor] = useState(false);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [expanded, setExpanded] = useState({
    personal: true,
    security: true,
  });
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Demo Wallet Credit",
      amount: 1250,
      type: "credit",
      date: "Today",
    },
  ]);

  // Demo Winnings History
  const [winnings] = useState([
    {
      id: 1,
      drawDate: "15 Nov 2026",
      drawName: "Evening Draw #145",
      ticketNumber: "3729",
      prize: "1st Prize",
      prizeAmount: 2500,
      position: 1
    },
    {
      id: 2,
      drawDate: "10 Nov 2026",
      drawName: "Morning Draw #142",
      ticketNumber: "856",
      prize: "2nd Prize",
      prizeAmount: 1500,
      position: 2
    },
    {
      id: 3,
      drawDate: "5 Nov 2026",
      drawName: "Evening Draw #139",
      ticketNumber: "42",
      prize: "3rd Prize",
      prizeAmount: 800,
      position: 3
    },
    {
      id: 4,
      drawDate: "1 Nov 2026",
      drawName: "Morning Draw #136",
      ticketNumber: "7",
      prize: "4th Prize",
      prizeAmount: 200,
      position: 4
    }
  ]);

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  const showMessage = (text) => {
    setMessage(text);
    window.clearTimeout(window.profileMessageTimer);
    window.profileMessageTimer = window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const openEdit = () => {
    setForm({ ...profile });
    setEditing(true);
    setModal("edit");
  };

  const saveProfile = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      showMessage("Please fill in all required fields.");
      return;
    }
    setProfile({ ...form });
    setEditing(false);
    setModal(null);
    showMessage("Profile updated successfully!");
  };

  const openWallet = (type) => {
    // Navigate to Wallet page with state
    if (type === "add") {
      navigate("/wallet", { state: { action: "deposit" } });
    } else if (type === "withdraw") {
      navigate("/wallet", { state: { action: "send" } });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target.result);
    reader.readAsDataURL(file);
    // Reset file input so same file can be selected again
    e.target.value = "";
  };

  const handleSaveImage = () => {
    setProfileImage(previewImage);
    setPreviewImage(null);
  };

  const handleCancelImage = () => {
    setPreviewImage(null);
  };

  const handleWalletAction = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      showMessage("Enter a valid amount.");
      return;
    }
    if (value > 100000) {
      showMessage("Maximum demo transaction is $100,000.");
      return;
    }
    if (modal === "withdraw" && value > balance) {
      showMessage("Insufficient demo wallet balance.");
      return;
    }
    if (modal === "add") {
      setBalance((prev) => prev + value);
      setTransactions((prev) => [
        {
          id: Date.now(),
          title: "Demo Money Added",
          amount: value,
          type: "credit",
          date: new Date().toLocaleDateString("en-IN"),
        },
        ...prev,
      ]);
      setModal(null);
      showMessage("Demo balance updated successfully!");
    }
    if (modal === "withdraw") {
      setBalance((prev) => prev - value);
      setTransactions((prev) => [
        {
          id: Date.now(),
          title: "Demo Withdrawal",
          amount: value,
          type: "debit",
          date: new Date().toLocaleDateString("en-IN"),
        },
        ...prev,
      ]);
      setModal(null);
      showMessage("Demo withdrawal completed.");
    }
  };

  const handleStatClick = (title) => {
    if (title === "My Tickets") {
      navigate("/my-tickets");
    } else if (title === "Winnings") {
      setModal("winnings");
    } else if (title === "Transactions") {
      navigate("/wallet");
    } else if (title === "Referral") {
      navigate("/referral");
    } else if (title === "Royalty Income") {
      navigate("/royalty");
    } else if (title === "Prize Distribution") {
      setModal("prize-distribution");
    }
  };

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const closeModal = () => {
    setModal(null);
    setEditing(false);
    setPassword("");
    setAmount("");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      showMessage("Password must contain at least 8 characters.");
      return;
    }
    setModal(null);
    setPassword("");
    showMessage("Demo password validation successful.");
  };

  const handleDeleteAccount = () => {
    setModal(null);
    showMessage("Demo only: no account has been deleted.");
  };

  return (
    <main className="lotto-home ll-profile">

      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div className="profile-img-modal-overlay" onClick={handleCancelImage}>
          <div className="profile-img-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Set Profile Photo</h3>
            <p>Does this look good?</p>
            <div className="profile-img-preview">
              <img src={previewImage} alt="Preview" />
            </div>
            <div className="profile-img-modal-actions">
              <button className="profile-img-save" onClick={handleSaveImage}>
                ✓ Save Photo
              </button>
              <button className="profile-img-cancel" onClick={handleCancelImage}>
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <section className="ll-profile-banner">
        <div className="ll-banner-content">
          <div className="ll-brand">
            <span className="ll-brand-crown">♛</span>
            <h2>LOTTO LINK</h2>
            <p>PLAY TODAY WIN TOMORROW</p>
          </div>
          <div className="ll-banner-text">
            <span className="ll-eyebrow">YOUR ACCOUNT</span>
            <h1>My Profile</h1>
            <p>Manage your account, personal details and security settings.</p>
          </div>
        </div>
        <div className="ll-lottery-art" aria-hidden="true">
          <span className="ll-ball ll-ball-three">3</span>
          <span className="ll-ball ll-ball-seven">7</span>
          <span className="ll-ball ll-ball-nine">9</span>
          <span className="ll-sparkle">✦</span>
          <span className="ll-sparkle ll-sparkle-two">✧</span>
        </div>
      </section>

      {/* Profile and Wallet */}
      <section className="ll-main-grid">
        <article className="ll-profile-card ll-card">
          <div className="ll-avatar-wrap">
            <div
              className="ll-avatar"
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: "pointer", overflow: "hidden", position: "relative" }}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              )}
            </div>
            <span
              className="ll-avatar-status"
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: "pointer", fontSize: "14px" }}
              title="Change photo"
            >
              📷
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className="ll-profile-details">
            <div className="ll-name-line">
              <h2>{profile.name}</h2>
              <span className="ll-verified">✓ Verified</span>
            </div>
            <p className="ll-contact">
              <span>✉</span>
              <span>{profile.email}</span>
            </p>
            <p className="ll-contact">
              <span>☎</span>
              <span>{profile.phone}</span>
            </p>
            <p className="ll-contact">
              <span>▣</span>
              <span>Member ID: {profile.memberId}</span>
              <button
                type="button"
                className="ll-copy-btn"
                aria-label="Copy member ID"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(profile.memberId);
                    showMessage("Member ID copied!");
                  } catch {
                    showMessage(`Your Member ID is ${profile.memberId}`);
                  }
                }}
              >
                ▢
              </button>
            </p>
            <p className="ll-contact">
              <span>▦</span>
              <span>Joined on: 28 Oct 2026</span>
            </p>
          </div>
          <div className="ll-profile-action">
            <button type="button" className="ll-btn ll-btn-outline" onClick={openEdit}>
              <span>✎</span> Edit Profile
            </button>
          </div>
        </article>

        {/* Wallet */}
        <article className="ll-wallet-card">
          <div className="ll-wallet-top">
            <div>
              <div className="ll-wallet-heading">
                <span className="ll-wallet-icon">▣</span>
                <h3>Wallet Balance</h3>
              </div>
              <h2>{formatMoney(balance)}</h2>
              <p>Available demo balance</p>
            </div>
            <div className="ll-wallet-art" aria-hidden="true">
              💰
            </div>
          </div>
          <div className="ll-wallet-actions">
            <button type="button" className="ll-btn ll-btn-gold" onClick={() => openWallet("add")}>
              ＋ Add Money
            </button>
            <button
              type="button"
              className="ll-btn ll-btn-white"
              onClick={() => openWallet("withdraw")}
            >
              ↗ Withdraw
            </button>
          </div>
        </article>
      </section>

      {/* Statistics */}
      <section className="ll-stats-grid">
        {stats.map((stat) => (
          <button
            type="button"
            key={stat.title}
            className={`ll-stat-card ${stat.className}`}
            onClick={() => handleStatClick(stat.title)}
          >
            <div className="ll-stat-icon">{stat.icon}</div>
            <div className="ll-stat-info">
              <h3>{stat.title}</h3>
              <strong>
                {stat.title === "Transactions" ? transactions.length + 27 : stat.value}
              </strong>
              <p>{stat.subtitle}</p>
            </div>
            <span className="ll-stat-arrow">›</span>
          </button>
        ))}
      </section>

      {/* Bottom Information Sections */}
      <section className="ll-information-grid">
        {/* Personal Information */}
        <article className="ll-info-card ll-card">
          <button
            type="button"
            className="ll-section-heading"
            onClick={() => toggleSection("personal")}
            aria-expanded={expanded.personal}
          >
            <span className="ll-heading-icon ll-blue">♟</span>
            <span className="ll-heading-title">Personal Information</span>
            <span className="ll-heading-line" />
            <span className="ll-chevron">{expanded.personal ? "−" : "+"}</span>
          </button>
          {expanded.personal && (
            <div className="ll-information-list">
              <div className="ll-info-row">
                <span className="ll-row-icon">♟</span>
                <span className="ll-row-label">Full Name</span>
                <span className="ll-row-value">{profile.name}</span>
              </div>
              <div className="ll-info-row">
                <span className="ll-row-icon">✉</span>
                <span className="ll-row-label">Email Address</span>
                <span className="ll-row-value">{profile.email}</span>
              </div>
              <div className="ll-info-row">
                <span className="ll-row-icon">☎</span>
                <span className="ll-row-label">Mobile Number</span>
                <span className="ll-row-value">{profile.phone}</span>
              </div>
              <div className="ll-info-row">
                <span className="ll-row-icon">▦</span>
                <span className="ll-row-label">Date of Birth</span>
                <span className="ll-row-value">
                  {profile.dob
                    ? new Date(`${profile.dob}T00:00:00`).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Not provided"}
                </span>
              </div>
              <div className="ll-info-row">
                <span className="ll-row-icon">♙</span>
                <span className="ll-row-label">Gender</span>
                <span className="ll-row-value">{profile.gender}</span>
              </div>
              <div className="ll-info-row">
                <span className="ll-row-icon">⌖</span>
                <span className="ll-row-label">Address</span>
                <span className="ll-row-value">{profile.address}</span>
              </div>
            </div>
          )}
        </article>

        {/* Account Security */}
        <article className="ll-info-card ll-card">
          <button
            type="button"
            className="ll-section-heading"
            onClick={() => toggleSection("security")}
            aria-expanded={expanded.security}
          >
            <span className="ll-heading-icon ll-purple">◈</span>
            <span className="ll-heading-title">Account Security</span>
            <span className="ll-heading-line" />
            <span className="ll-chevron">{expanded.security ? "−" : "+"}</span>
          </button>
          {expanded.security && (
            <div className="ll-security-list">
              <button
                type="button"
                className="ll-security-row"
                onClick={() => setModal("password")}
              >
                <span className="ll-security-icon">🔒</span>
                <span className="ll-security-text">
                  <strong>Change Password</strong>
                  <small>Update your account password</small>
                </span>
                <span className="ll-security-arrow">›</span>
              </button>
              <div className="ll-security-row">
                <span className="ll-security-icon">🛡️</span>
                <span className="ll-security-text">
                  <strong>Two-Factor Authentication</strong>
                  <small>
                    {twoFactor ? "Extra security is enabled" : "Enable 2FA for more security"}
                  </small>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={twoFactor}
                  aria-label="Toggle two-factor authentication"
                  className={`ll-toggle ${twoFactor ? "active" : ""}`}
                  onClick={() => {
                    setTwoFactor((prev) => !prev);
                    showMessage(twoFactor ? "2FA disabled in demo." : "2FA enabled in demo.");
                  }}
                >
                  <span />
                </button>
              </div>
              <button
                type="button"
                className="ll-security-row"
                onClick={() => setModal("devices")}
              >
                <span className="ll-security-icon">▣</span>
                <span className="ll-security-text">
                  <strong>Linked Devices</strong>
                  <small>Manage your active sessions</small>
                </span>
                <span className="ll-security-arrow">›</span>
              </button>
              <button
                type="button"
                className="ll-security-row ll-delete-row"
                onClick={() => setModal("delete")}
              >
                <span className="ll-security-icon">♲</span>
                <span className="ll-security-text">
                  <strong>Delete Account</strong>
                  <small>Permanently delete your account</small>
                </span>
                <span className="ll-security-arrow">›</span>
              </button>
            </div>
          )}
        </article>
      </section>

      {/* Toast Notification */}
      {message && (
        <div className="ll-toast" role="status">
          <span>✓</span>
          {message}
          <button type="button" onClick={() => setMessage("")} aria-label="Close notification">
            ×
          </button>
        </div>
      )}

      {/* Interactive Modals */}
      {modal && (
        <div
          className="ll-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="ll-modal" role="dialog" aria-modal="true" aria-labelledby="ll-modal-title">
            <div className="ll-modal-header">
              <h2 id="ll-modal-title">
                {modal === "edit" && "Edit Profile"}
                {modal === "add" && "Add Money"}
                {modal === "withdraw" && "Withdraw Money"}
                {modal === "password" && "Change Password"}
                {modal === "devices" && "Linked Devices"}
                {modal === "delete" && "Delete Account"}
                {modal === "tickets" && "My Tickets"}
                {modal === "winnings" && "Winnings"}
                {modal === "transactions" && "Transactions"}
                {modal === "referral" && "Referral"}
                {modal === "prize-distribution" && "Prize Distribution"}
              </h2>
              <button type="button" className="ll-modal-close" onClick={closeModal} aria-label="Close">
                ×
              </button>
            </div>

            {/* Edit Profile Form */}
            {modal === "edit" && (
              <form onSubmit={saveProfile}>
                <div className="ll-form-grid">
                  <label>
                    Full Name *
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Email Address *
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Mobile Number *
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Date of Birth
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          dob: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Gender
                    <select
                      value={form.gender}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  </label>
                  <label className="ll-full-width">
                    Address
                    <textarea
                      rows="3"
                      value={form.address}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="ll-modal-actions">
                  <button type="button" className="ll-btn ll-cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="ll-btn ll-primary-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* Wallet Actions */}
            {(modal === "add" || modal === "withdraw") && (
              <form onSubmit={handleWalletAction}>
                <div className="ll-balance-preview">
                  <span>Available Balance</span>
                  <strong>{formatMoney(balance)}</strong>
                </div>
                <label className="ll-amount-label">
                  Enter Amount ($)
                  <input
                    type="number"
                    min="1"
                    max="100000"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </label>
                <p className="ll-demo-note">Demo only. No real money will be transferred.</p>
                <div className="ll-modal-actions">
                  <button type="button" className="ll-btn ll-cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="ll-btn ll-primary-btn">
                    {modal === "add" ? "Add Money" : "Confirm Withdrawal"}
                  </button>
                </div>
              </form>
            )}

            {/* Password */}
            {modal === "password" && (
              <form onSubmit={handlePasswordChange}>
                <label className="ll-amount-label">
                  New Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    placeholder="Minimum 8 characters"
                    required
                  />
                </label>
                <p className="ll-demo-note">
                  Demo validation only. Connect your backend to securely change the actual password.
                </p>
                <div className="ll-modal-actions">
                  <button type="button" className="ll-btn ll-cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="ll-btn ll-primary-btn">
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {/* Linked Devices */}
            {modal === "devices" && (
              <div className="ll-detail-content">
                <div className="ll-device-item">
                  <span>💻</span>
                  <div>
                    <strong>Current Browser</strong>
                    <p>Current session · Active</p>
                  </div>
                  <span className="ll-device-active">Active</span>
                </div>
                <p className="ll-demo-note">
                  Demo device information. Real sessions require backend authentication.
                </p>
              </div>
            )}

            {/* Delete Confirmation */}
            {modal === "delete" && (
              <div className="ll-detail-content">
                <div className="ll-warning-icon">!</div>
                <p>
                  Are you sure you want to continue? This demo will not delete your actual account.
                </p>
                <div className="ll-modal-actions">
                  <button type="button" className="ll-btn ll-cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="button" className="ll-btn ll-danger-btn" onClick={handleDeleteAccount}>
                    Confirm Demo
                  </button>
                </div>
              </div>
            )}

            {/* Statistics Details */}
            {["tickets", "winnings", "transactions", "referral"].includes(modal) && (
              <div className="ll-detail-content">
                {modal === "tickets" && (
                  <>
                    <div className="ll-detail-highlight">
                      <span>🎟️</span>
                      <div>
                        <strong>12 Tickets</strong>
                        <p>Total demo tickets</p>
                      </div>
                    </div>
                    <p>Your ticket history can be displayed here.</p>
                    <button
                      type="button"
                      className="ll-btn ll-primary-btn ll-wide-btn"
                      onClick={() => {
                        closeModal();
                        showMessage("Connect your ticket page to view actual tickets.");
                      }}
                    >
                      View Ticket History
                    </button>
                  </>
                )}
                {modal === "winnings" && (
                  <>
                    <div className="ll-detail-highlight">
                      <span>🏆</span>
                      <div>
                        <strong>${winnings.reduce((sum, w) => sum + w.prizeAmount, 0).toLocaleString('en-US')}</strong>
                        <p>Total Winnings from {winnings.length} prizes</p>
                      </div>
                    </div>
                    
                    <div className="ll-winnings-list">
                      {winnings.map((win) => (
                        <div className="ll-winning-card" key={win.id}>
                          <div className="ll-winning-header">
                            <div className="ll-winning-prize-badge">
                              <span className="ll-prize-icon">
                                {win.position === 1 ? "🥇" : win.position === 2 ? "🥈" : win.position === 3 ? "🥉" : "🎖️"}
                              </span>
                              <span className="ll-prize-label">{win.prize}</span>
                            </div>
                            <div className="ll-winning-amount">{formatMoney(win.prizeAmount)}</div>
                          </div>
                          <div className="ll-winning-details">
                            <div className="ll-winning-row">
                              <span className="ll-detail-label">🎫 Ticket Number:</span>
                              <span className="ll-ticket-number">{win.ticketNumber}</span>
                            </div>
                            <div className="ll-winning-row">
                              <span className="ll-detail-label">📅 Draw:</span>
                              <span>{win.drawName}</span>
                            </div>
                            <div className="ll-winning-row">
                              <span className="ll-detail-label">📆 Date:</span>
                              <span>{win.drawDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {modal === "transactions" && (
                  <div className="ll-transaction-list">
                    {transactions.map((item) => (
                      <div className="ll-transaction-item" key={item.id}>
                        <span>{item.type === "credit" ? "↙" : "↗"}</span>
                        <div>
                          <strong>{item.title}</strong>
                          <small>{item.date}</small>
                        </div>
                        <strong className={item.type === "credit" ? "ll-credit" : "ll-debit"}>
                          {item.type === "credit" ? "+" : "-"}
                          {formatMoney(item.amount)}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
                {modal === "referral" && (
                  <>
                    <div className="ll-detail-highlight">
                      <span>👥</span>
                      <div>
                        <strong>5 Referrals</strong>
                        <p>Total demo referrals</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ll-btn ll-primary-btn ll-wide-btn"
                      onClick={() => {
                        showMessage("Referral feature requires a referral URL.");
                      }}
                    >
                      View Referral Details
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Prize Distribution */}
            {modal === "prize-distribution" && (
              <div className="pd-modal-content">
                {/* Hero Section */}
                <div className="pd-hero">
                  <div className="pd-hero-icon">🏆</div>
                  <span className="pd-eyebrow">TRANSPARENT & FAIR</span>
                  <h1>
                    Prize <span>Distribution</span>
                  </h1>
                  <p className="pd-hero-description">
                    Every ticket contributes to multiple prize pools. See exactly how prizes are
                    allocated across daily, weekly, monthly, and mega draws.
                  </p>
                </div>

                {/* Prize Pool Cards */}
                <div className="pd-pool-grid">
                  <div className="pd-pool-card">
                    <h3>Daily Draw Pool</h3>
                    <div className="pd-pool-price">
                      $10,000 <small>/ day</small>
                    </div>
                    <div className="pd-pool-detail">
                      <span>Draw Time</span>
                      <strong>Every Day 8:00 PM</strong>
                    </div>
                  </div>

                  <div className="pd-pool-card">
                    <h3>Weekly Draw Pool</h3>
                    <div className="pd-pool-price">
                      $50,000 <small>/ week</small>
                    </div>
                    <div className="pd-pool-detail">
                      <span>Draw Time</span>
                      <strong>Every Sunday 9:00 PM</strong>
                    </div>
                  </div>

                  <div className="pd-pool-card">
                    <h3>Monthly Mega Pool</h3>
                    <div className="pd-pool-price">
                      $2,00,000 <small>/ month</small>
                    </div>
                    <div className="pd-pool-detail">
                      <span>Draw Time</span>
                      <strong>Last Day of Month</strong>
                    </div>
                  </div>

                  <div className="pd-pool-card">
                    <h3>Jackpot Pool</h3>
                    <div className="pd-pool-price">
                      $10,00,000 <small>growing</small>
                    </div>
                    <div className="pd-pool-detail">
                      <span>Draw Time</span>
                      <strong>Quarterly or Rollover</strong>
                    </div>
                  </div>
                </div>

                {/* Distribution Table */}
                <div className="pd-table-wrapper">
                  <table className="pd-table">
                    <thead>
                      <tr>
                        <th>Tier</th>
                        <th>Match</th>
                        <th>Pool %</th>
                        <th>Payout</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jackpot</td>
                        <td>6/6</td>
                        <td>
                          <span className="pd-percent-badge">50%</span>
                        </td>
                        <td>$5,00,000+</td>
                      </tr>
                      <tr>
                        <td>2nd Prize</td>
                        <td>5/6</td>
                        <td>
                          <span className="pd-percent-badge">25%</span>
                        </td>
                        <td>$50K–$1L</td>
                      </tr>
                      <tr>
                        <td>3rd Prize</td>
                        <td>4/6</td>
                        <td>
                          <span className="pd-percent-badge">15%</span>
                        </td>
                        <td>$10K–$25K</td>
                      </tr>
                      <tr>
                        <td>4th Prize</td>
                        <td>3/6</td>
                        <td>
                          <span className="pd-percent-badge">8%</span>
                        </td>
                        <td>$1K–$5K</td>
                      </tr>
                      <tr>
                        <td>Consolation</td>
                        <td>2/6</td>
                        <td>
                          <span className="pd-percent-badge">2%</span>
                        </td>
                        <td>$100–$500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer Note */}
                <div className="pd-note">
                  <strong>Note:</strong> Prize amounts vary based on total ticket sales and number
                  of winners per tier. All distributions are verified and transparent. Unclaimed
                  prizes roll over to the next corresponding draw pool.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
