import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Wallet.css";

/* ==========================================
   LOTTO LINK - SVG ICONS
========================================== */
const Icon = ({ name, size = 22, strokeWidth = 1.8 }) => {
  const icons = {
    wallet: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="3" />
        <path d="M3 9h18" />
        <path d="M16 14h2" />
        <path d="M7 5V3h10v2" />
      </>
    ),
    deposit: (
      <>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M4 16v4h16v-4" />
      </>
    ),
    withdraw: (
      <>
        <path d="M12 4v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M4 17v3h16v-3" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    history: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
        <path d="M3 4v4h4" />
      </>
    ),
    ticket: (
      <>
        <path d="M4 5h16v5a2 2 0 0 0 0 4v5H4v-5a2 2 0 0 0 0-4Z" />
        <path d="M14 8v2M14 14v2" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    gift: (
      <>
        <rect x="3" y="9" width="18" height="12" rx="2" />
        <path d="M2 5h20v4H2z" />
        <path d="M12 5v16" />
        <path d="M12 5H8a2 2 0 1 1 2-2c0 1.2 2 2 2 2Z" />
        <path d="M12 5h4a2 2 0 1 0-2-2c0 1.2-2 2-2 2Z" />
      </>
    ),
    crown: (
      <>
        <path d="m2 8 5 4 5-8 5 8 5-4-2 12H4Z" />
        <path d="M4 23h16" />
        <circle cx="2" cy="7" r="1" />
        <circle cx="12" cy="3" r="1" />
        <circle cx="22" cy="7" r="1" />
      </>
    ),
    headset: (
      <>
        <path d="M3 13v-2a9 9 0 0 1 18 0v2" />
        <rect x="3" y="12" width="4" height="7" rx="2" />
        <rect x="17" y="12" width="4" height="7" rx="2" />
        <path d="M17 19a5 5 0 0 1-5 3h-1" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    copy: (
      <>
        <rect x="8" y="8" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 3 6-7" />
      </>
    ),
    coins: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v5c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 10v5c0 1.7 3.6 3 8 3 1 0 2-.1 3-.3" />
        <path d="M4 15v4c0 1.7 3.6 3 8 3" />
        <circle cx="19" cy="18" r="3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2Z" />
        <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2Z" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name] || icons.wallet}
    </svg>
  );
};

/* ==========================================
   DUMMY DATA
========================================== */
const transactions = [
  {
    id: 1,
    title: "Ticket Purchase",
    date: "29 Oct 2026 · 10:32 AM",
    amount: "-$10.00",
    type: "debit",
    icon: "ticket",
    status: "Completed",
  },
  {
    id: 2,
    title: "Referral Commission",
    date: "29 Oct 2026 · 09:15 AM",
    amount: "+$5.00",
    type: "credit",
    icon: "users",
    status: "Completed",
  },
  {
    id: 3,
    title: "Successful Deposit",
    date: "28 Oct 2026 · 04:45 PM",
    amount: "+$50.00",
    type: "credit",
    icon: "deposit",
    status: "Completed",
  },
  {
    id: 4,
    title: "Prize Won",
    date: "27 Oct 2026 · 02:20 PM",
    amount: "+$20.00",
    type: "credit",
    icon: "gift",
    status: "Completed",
  },
  {
    id: 5,
    title: "Wallet Deposit",
    date: "26 Oct 2026 · 11:05 AM",
    amount: "+$25.00",
    type: "credit",
    icon: "deposit",
    status: "Completed",
  },
];

const quickActions = [
  {
    title: "Add Money",
    subtitle: "Deposit to wallet",
    icon: "wallet",
    color: "blue",
    action: "deposit",
  },
  {
    title: "Send Money",
    subtitle: "Transfer to user",
    icon: "send",
    color: "purple",
    action: "send",
  },
  {
    title: "Transaction History",
    subtitle: "View all activity",
    icon: "history",
    color: "orange",
    action: "history",
  },
  {
    title: "Help & Support",
    subtitle: "Get assistance",
    icon: "headset",
    color: "pink",
    action: "support",
  },
];

/* ==========================================
   WALLET COMPONENT
   Navbar is intentionally not included.
========================================== */
export default function Wallet() {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState("dashboard");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [flowData, setFlowData] = useState(null);
  const [toast, setToast] = useState("");
  
  // Check if redirected from Profile page with action
  useEffect(() => {
    console.log("Wallet useEffect - location.state:", location.state);
    if (location.state?.action) {
      const action = location.state.action;
      console.log("Action found:", action);
      if (action === "deposit") {
        console.log("Setting page to add-money");
        setPage("add-money");
      } else if (action === "send") {
        console.log("Setting page to send-money");
        setPage("send-money");
      }
      // Clear the state
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);
  
  const walletData = {
    balance: 125.0,
    totalDeposits: 500.0,
    totalWithdrawals: 150.0,
    totalWinnings: 200.0,
    referralLink: "https://lottolink.com/ref/12345",
    directCommission: "5%",
    levelCommission: "0.5%",
    totalRoyaltyMembers: 200,
    payoutCycle: "Every 3 Months",
    royaltyStatus: "Not Qualified",
  };

  const handleAction = (action) => {
    switch (action) {
      case "deposit":
        setAmount("");
        setFlowData(null);
        setPage("add-money");
        break;
      case "send":
        setAmount("");
        setRecipient("");
        setNote("");
        setFlowData(null);
        setPage("send-money");
        break;
      case "history":
        setPage("history");
        break;
      case "support":
        setPage("support");
        break;
      case "tickets":
        navigate("/my-tickets");
        break;
      case "royalty":
        setPage("royalty");
        break;
      default:
        break;
    }
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(walletData.referralLink);
      window.alert("Referral link copied successfully!");
    } catch {
      window.prompt("Copy your referral link:", walletData.referralLink);
    }
  };

  const pageTitle = {
    "add-money": "Add Money",
    "send-money": "Send Money",
    "send-review": "Review Transfer",
    "deposit-review": "Review Deposit",
    success: "Transaction Successful",
    history: "Transaction History",
    support: "Help & Support",
    "my-tickets": "My Tickets",
    royalty: "Royalty Membership",
  };

  const pageShell = { maxWidth: 760, margin: "28px auto", padding: "0 18px 40px", color: "#17234d" };
  const panel = { background: "#fff", border: "1px solid #e5ebfa", borderRadius: 20, padding: 24, boxShadow: "0 12px 32px rgba(34,65,130,.07)" };
  const field = { display: "block", width: "100%", boxSizing: "border-box", marginTop: 8, padding: "13px 14px", border: "1px solid #dce5f8", borderRadius: 11, background: "#fbfcff", color: "#17234d", fontSize: 15, outlineColor: "#477bff" };
  const primaryButton = { display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 8, width: "100%", minHeight: 48, marginTop: 18, padding: "12px 16px", border: 0, borderRadius: 12, background: "linear-gradient(135deg,#1769f5,#7955ef)", color: "white", fontWeight: 800, fontSize: 14, cursor: "pointer" };
  const secondaryButton = { ...primaryButton, marginTop: 10, background: "#f0f4ff", color: "#315bc4", border: "1px solid #dce5ff" };
  const labelStyle = { display: "block", marginTop: 16, color: "#53658b", fontWeight: 750, fontSize: 13 };

  const backToWallet = () => { setPage("dashboard"); setFlowData(null); };

  const submitSend = (event) => {
    event.preventDefault();
    const value = Number(amount);
    if (!recipient.trim()) { window.alert("Please enter the recipient's user ID or phone number."); return; }
    if (!Number.isFinite(value) || value <= 0) { window.alert("Please enter a valid amount."); return; }
    if (value > walletData.balance) { window.alert("Insufficient demo wallet balance."); return; }
    setFlowData({ type: "send", amount: value, recipient: recipient.trim(), note: note.trim(), reference: `LL${Date.now().toString().slice(-8)}` });
    setPage("send-review");
  };

  const submitDeposit = (event) => {
    event.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 1) { window.alert("Please enter an amount of at least $1.00."); return; }
    setFlowData({ type: "deposit", amount: value, paymentMethod, reference: `LL${Date.now().toString().slice(-8)}` });
    setPage("deposit-review");
  };

  if (page !== "dashboard") {
    const isSuccess = page === "success";
    return (
      <main className="lotto-home wallet-page">
        <div style={pageShell}>
          <button type="button" onClick={backToWallet} style={{ border: 0, background: "transparent", color: "#4166c9", fontWeight: 800, cursor: "pointer", padding: "8px 0 18px" }}>← Back to Wallet</button>
          <header style={{ borderRadius: 20, padding: "24px 26px", marginBottom: 20, color: "white", background: "linear-gradient(135deg,#1769f5,#8b5cf6 65%,#ec4899)" }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, opacity: .85 }}>LOTTO LINK WALLET</span>
            <h1 style={{ margin: "7px 0", fontSize: 28 }}>{pageTitle[page] || "Wallet"}</h1>
            <p style={{ margin: 0, opacity: .9, fontSize: 14 }}>{isSuccess ? "Your demo transaction has been completed." : "Follow the steps below to continue."}</p>
          </header>

          {page === "add-money" && <section style={panel}>
            <h2 style={{ marginTop: 0 }}>Add funds to your wallet</h2>
            <p style={{ color: "#7b89a8", fontSize: 14 }}>Choose an amount and a demo payment method.</p>
            <form onSubmit={submitDeposit}>
              <label style={labelStyle}>Amount (USD)<input style={field} type="number" min="1" step="0.01" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} required /></label>
              <label style={labelStyle}>Payment method<select style={field} value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}><option>UPI</option><option>Debit / Credit Card</option><option>Net Banking</option><option>Wallet</option></select></label>
              <button type="submit" style={primaryButton}>Continue to Review →</button>
            </form>
          </section>}

          {page === "send-money" && <section style={panel}>
            <h2 style={{ marginTop: 0 }}>Transfer to another user</h2>
            <p style={{ color: "#7b89a8", fontSize: 14 }}>Enter the recipient details. This is a front-end demo flow only.</p>
            <form onSubmit={submitSend}>
              <label style={labelStyle}>Recipient user ID / phone<input style={field} value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="e.g. LL10245 or phone number" required /></label>
              <label style={labelStyle}>Amount (USD)<input style={field} type="number" min="0.01" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" required /></label>
              <label style={labelStyle}>Note (optional)<input style={field} value={note} onChange={e => setNote(e.target.value)} placeholder="What is this transfer for?" /></label>
              <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: "#f3f7ff", color: "#52648a", fontSize: 13 }}>Available demo balance: <strong style={{ color: "#1769f5" }}>${walletData.balance.toFixed(2)}</strong></div>
              <button type="submit" style={primaryButton}>Continue to Review →</button>
            </form>
          </section>}

          {(page === "send-review" || page === "deposit-review") && flowData && <section style={panel}>
            <div style={{ width: 54, height: 54, display: "grid", placeItems: "center", borderRadius: 16, background: "#eaf1ff", color: "#1769f5", fontSize: 26, marginBottom: 16 }}>{flowData.type === "send" ? "↗" : "＋"}</div>
            <h2 style={{ margin: "0 0 6px" }}>Confirm {flowData.type === "send" ? "transfer" : "deposit"}</h2>
            <p style={{ color: "#7b89a8", fontSize: 14 }}>Check the details before confirming.</p>
            <div style={{ background: "#f7f9ff", borderRadius: 14, padding: 16, marginTop: 18 }}>
              {[["Transaction type", flowData.type === "send" ? "Send Money" : "Add Money"], ["Amount", `$${flowData.amount.toFixed(2)}`], ...(flowData.type === "send" ? [["Recipient", flowData.recipient], ["Note", flowData.note || "—"]] : [["Payment method", flowData.paymentMethod]]), ["Reference", flowData.reference]].map(([label, value]) => <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 18, padding: "11px 0", borderBottom: "1px solid #e7ecf8", fontSize: 13 }}><span style={{ color: "#7785a4" }}>{label}</span><strong style={{ textAlign: "right", overflowWrap: "anywhere" }}>{value}</strong></div>)}
            </div>
            <button type="button" style={primaryButton} onClick={() => setPage("success")}>Confirm &amp; {flowData.type === "send" ? "Send Money" : "Add Money"} ✓</button>
            <button type="button" style={secondaryButton} onClick={() => setPage(flowData.type === "send" ? "send-money" : "add-money")}>← Edit Details</button>
          </section>}

          {page === "success" && flowData && <section style={{ ...panel, textAlign: "center" }}>
            <div style={{ width: 82, height: 82, display: "grid", placeItems: "center", margin: "4px auto 18px", borderRadius: "50%", background: "#e4fbef", color: "#16a267", fontSize: 42, fontWeight: 900 }}>✓</div>
            <h2 style={{ margin: "0 0 8px", color: "#138a58" }}>{flowData.type === "send" ? "Money Sent Successfully!" : "Money Added Successfully!"}</h2>
            <p style={{ color: "#7b89a8", fontSize: 14 }}>Demo transaction completed successfully.</p>
            <div style={{ margin: "22px 0", padding: 20, borderRadius: 14, background: "#f4fbf7" }}><div style={{ color: "#7187a0", fontSize: 13 }}>Transaction Amount</div><strong style={{ display: "block", marginTop: 6, fontSize: 34, color: "#138a58" }}>${flowData.amount.toFixed(2)}</strong><div style={{ marginTop: 12, fontSize: 12, color: "#7187a0" }}>Reference: {flowData.reference}</div>{flowData.type === "send" && <div style={{ marginTop: 6, fontSize: 12, color: "#7187a0" }}>Recipient: {flowData.recipient}</div>}</div>
            <button type="button" style={primaryButton} onClick={backToWallet}>Back to Wallet</button>
            <button type="button" style={secondaryButton} onClick={() => { setFlowData(null); setAmount(""); setPage(flowData.type === "send" ? "send-money" : "add-money"); }}>Make Another Transaction</button>
          </section>}

          {page === "history" && <section style={panel}>
            <h2 style={{ marginTop: 0 }}>Recent activity</h2>
            {transactions.map(tx => <div key={tx.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "15px 0", borderBottom: "1px solid #edf1fa" }}><div><strong style={{ display: "block", fontSize: 14 }}>{tx.title}</strong><small style={{ display: "block", marginTop: 5, color: "#8491b0" }}>{tx.date}</small><small style={{ color: "#169b67" }}>✓ {tx.status}</small></div><strong style={{ color: tx.type === "credit" ? "#139966" : "#e05b68", whiteSpace: "nowrap" }}>{tx.amount}</strong></div>)}
            <button type="button" style={primaryButton} onClick={backToWallet}>Done</button>
          </section>}

          {page === "support" && <section style={panel}><h2 style={{ marginTop: 0 }}>How can we help?</h2><p style={{ color: "#7b89a8", fontSize: 14 }}>Choose a support option. These are demo interactions; no support ticket is sent to a server.</p><button style={secondaryButton} type="button" onClick={() => setToast("Email support: support@lottolink.example")}>✉ Email Support</button><button style={secondaryButton} type="button" onClick={() => setToast("Please include your transaction reference when asking for help.")}>ⓘ Transaction Help</button>{toast && <p role="status" style={{ marginTop: 14, padding: 12, borderRadius: 10, background: "#f1f6ff", color: "#315bc4" }}>{toast}</p>}<button style={primaryButton} type="button" onClick={backToWallet}>Back to Wallet</button></section>}

          {page === "my-tickets" && <section style={panel}><h2 style={{ marginTop: 0 }}>My Tickets</h2><p style={{ color: "#7b89a8", fontSize: 14 }}>Demo ticket list.</p>{[{id:"LL-240183",numbers:"04 · 12 · 18 · 27 · 35 · 42",status:"Active"},{id:"LL-240164",numbers:"06 · 11 · 19 · 24 · 33 · 48",status:"Draw completed"},{id:"LL-240121",numbers:"03 · 09 · 17 · 26 · 38 · 45",status:"Draw completed"}].map(t => <div key={t.id} style={{ padding: 16, marginTop: 12, border: "1px solid #e5ebfa", borderRadius: 14 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><strong>{t.id}</strong><span style={{ color: "#1769f5", fontSize: 12, fontWeight: 800 }}>{t.status}</span></div><p style={{ marginBottom: 0, letterSpacing: 1, fontWeight: 800 }}>{t.numbers}</p></div>)}<button type="button" style={primaryButton} onClick={backToWallet}>Back to Wallet</button></section>}

          {page === "royalty" && <section style={panel}><h2 style={{ marginTop: 0 }}>Royalty Membership</h2><p style={{ color: "#7b89a8", fontSize: 14 }}>Your current demo membership summary.</p><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginTop: 18 }}><div style={{ padding: 16, borderRadius: 12, background: "#f4f7ff" }}><small>Total members</small><strong style={{ display: "block", fontSize: 24, marginTop: 8 }}>{walletData.totalRoyaltyMembers}</strong></div><div style={{ padding: 16, borderRadius: 12, background: "#fff8e4" }}><small>Payout cycle</small><strong style={{ display: "block", fontSize: 17, marginTop: 8 }}>{walletData.payoutCycle}</strong></div></div><p style={{ marginTop: 18 }}>Eligibility status: <strong style={{ color: "#e8529b" }}>{walletData.royaltyStatus}</strong></p><button type="button" style={primaryButton} onClick={backToWallet}>Back to Wallet</button></section>}
        </div>
      </main>
    );
  }

  return (
    <main className="lotto-home wallet-page">
      <div className="lotto-main-content wallet-container">
        {/* =================================
            GRADIENT HEADER
        ================================= */}
        <header className="wallet-page-header">
          <div className="wallet-header-gradient">
            <div className="wallet-header-content">
              <span className="wallet-eyebrow">LOTTO LINK ACCOUNT</span>
              <h1>My Wallet</h1>
              <p>Manage your balance, deposits and withdrawals.</p>
            </div>
            <div className="wallet-secure-badge">
              <span className="wallet-secure-icon">
                <Icon name="shield" size={17} />
              </span>
              Secure Wallet
            </div>
          </div>
        </header>

        {/* =================================
            MAIN DASHBOARD GRID
            Balance + Referral + Royalty
        ================================= */}
        <section className="wallet-main-grid">
          {/* BALANCE CARD */}
          <article className="wallet-balance-card">
            <div className="wallet-balance-decoration wallet-decoration-one" />
            <div className="wallet-balance-decoration wallet-decoration-two" />
            <div className="wallet-balance-top">
              <div className="wallet-balance-title">
                <span className="wallet-balance-icon">
                  <Icon name="wallet" size={25} />
                </span>
                <div>
                  <span className="wallet-label-light">
                    Total Balance
                  </span>
                  <span className="wallet-balance-subtitle">
                    Available wallet funds
                  </span>
                </div>
              </div>
              <span className="wallet-currency-badge">
                USD
              </span>
            </div>
            <div className="wallet-balance-value">
              <span>$</span>
              {walletData.balance.toFixed(2)}
            </div>
            <p className="wallet-balance-description">
              Available balance in your wallet
            </p>
            <div className="wallet-balance-illustration">
              <span className="wallet-illustration-circle">
                <Icon name="wallet" size={70} />
              </span>
              <span className="wallet-floating-coin wallet-coin-one">
                $
              </span>
              <span className="wallet-floating-coin wallet-coin-two">
                $
              </span>
            </div>
            <div className="wallet-balance-actions">
              <button
                type="button"
                className="wallet-deposit-button"
                onClick={() => handleAction("deposit")}
              >
                <Icon name="deposit" size={19} />
                <span>Deposit</span>
              </button>
              <button
                type="button"
                className="wallet-withdraw-button"
                onClick={() => handleAction("send")}
              >
                <Icon name="withdraw" size={19} />
                <span>Withdraw</span>
              </button>
            </div>
            <div className="wallet-balance-bottom">
              <span>
                <span className="wallet-live-dot" />
                Wallet Active
              </span>
              <span>
                <Icon name="shield" size={14} />
                Secure Balance
              </span>
            </div>
          </article>
        </section>

        {/* =================================
            QUICK ACTIONS
        ================================= */}
        <section className="wallet-quick-actions">
          {quickActions.map((item) => (
            <button
              type="button"
              className={`wallet-quick-card wallet-quick-${item.color}`}
              key={item.action}
              onClick={() => handleAction(item.action)}
            >
              <span className="wallet-quick-icon">
                <Icon name={item.icon} size={24} />
              </span>
              <span className="wallet-quick-content">
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
              <span className="wallet-quick-arrow">
                <Icon name="arrow" size={17} />
              </span>
            </button>
          ))}
        </section>

        {/* =================================
            TRANSACTION HISTORY + OVERVIEW
        ================================= */}
        <section className="wallet-bottom-grid">
          {/* TRANSACTION HISTORY */}
          <article
            className="wallet-transactions-card"
            id="wallet-transaction-history"
          >
            <div className="wallet-section-heading">
              <div>
                <h2>Transaction History</h2>
                <p>
                  Review your recent wallet activity.
                </p>
              </div>
              <button
                type="button"
                className="wallet-view-all-button"
                onClick={() => handleAction("history")}
              >
                View All
                <Icon name="arrow" size={16} />
              </button>
            </div>
            {/* DESKTOP TRANSACTION TABLE */}
            <div className="wallet-table-wrapper">
              <table className="wallet-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TRANSACTION</th>
                    <th>DATE &amp; TIME</th>
                    <th>STATUS</th>
                    <th className="wallet-amount-heading">
                      AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                      <td className="wallet-row-number">
                        {index + 1}
                      </td>
                      <td>
                        <div className="wallet-transaction-name">
                          <span
                            className={`wallet-transaction-icon ${transaction.type}`}
                          >
                            <Icon
                              name={transaction.icon}
                              size={19}
                            />
                          </span>
                          <strong>{transaction.title}</strong>
                        </div>
                      </td>
                      <td className="wallet-transaction-date">
                        {transaction.date}
                      </td>
                      <td>
                        <span className="wallet-status-completed">
                          <Icon name="check" size={13} />
                          {transaction.status}
                        </span>
                      </td>
                      <td
                        className={`wallet-transaction-amount ${transaction.type}`}
                      >
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE TRANSACTION LIST */}
            <div className="wallet-mobile-transactions">
              {transactions.map((transaction) => (
                <div
                  className="wallet-mobile-transaction"
                  key={transaction.id}
                >
                  <span
                    className={`wallet-transaction-icon ${transaction.type}`}
                  >
                    <Icon
                      name={transaction.icon}
                      size={20}
                    />
                  </span>
                  <div className="wallet-mobile-transaction-info">
                    <strong>{transaction.title}</strong>
                    <span>{transaction.date}</span>
                    <small className="wallet-status-completed">
                      <Icon name="check" size={12} />
                      {transaction.status}
                    </small>
                  </div>
                  <strong
                    className={`wallet-transaction-amount ${transaction.type}`}
                  >
                    {transaction.amount}
                  </strong>
                </div>
              ))}
            </div>

            <div className="wallet-transactions-footer">
              <span>
                Showing <strong>5</strong> recent transactions
              </span>
              <span className="wallet-footer-security">
                <Icon name="shield" size={15} />
                Secure Transactions
              </span>
            </div>
          </article>

          {/* WALLET OVERVIEW */}
          <article className="wallet-overview-card">
            <div className="wallet-section-heading">
              <div>
                <h2>Wallet Overview</h2>
                <p>Your wallet activity summary.</p>
              </div>
              <span className="wallet-overview-icon">
                <Icon name="chart" size={21} />
              </span>
            </div>
            <div className="wallet-chart-container">
              <div
                className="wallet-donut-chart"
                role="img"
                aria-label="Illustrative wallet overview chart"
              >
                <div className="wallet-donut-center">
                  <strong>$500.00</strong>
                  <span>Total Inflow</span>
                </div>
              </div>
            </div>
            <div className="wallet-chart-legend">
              <div className="wallet-legend-row">
                <span className="wallet-legend-label">
                  <span className="wallet-legend-dot deposits-dot" />
                  Deposits
                </span>
                <strong>
                  ${walletData.totalDeposits.toFixed(2)}
                </strong>
              </div>
              <div className="wallet-legend-row">
                <span className="wallet-legend-label">
                  <span className="wallet-legend-dot withdrawals-dot" />
                  Withdrawals
                </span>
                <strong>
                  ${walletData.totalWithdrawals.toFixed(2)}
                </strong>
              </div>
              <div className="wallet-legend-row">
                <span className="wallet-legend-label">
                  <span className="wallet-legend-dot winnings-dot" />
                  Winnings
                </span>
                <strong>
                  ${walletData.totalWinnings.toFixed(2)}
                </strong>
              </div>
            </div>
            <div className="wallet-overview-footer">
              <Icon name="clock" size={15} />
              <span>
                Illustrative statistics using demo data
              </span>
            </div>
          </article>
        </section>

        {/* =================================
            REFER & ROYALTY GRID
        ================================= */}
        <section className="wallet-main-grid wallet-refer-royalty-section">
          {/* REFER & EARN CARD */}
          <article className="wallet-referral-card">
            <div className="wallet-feature-heading">
              <div>
                <span className="wallet-feature-eyebrow">
                  EARN MORE
                </span>
                <h2>Refer &amp; Earn</h2>
              </div>
              <span className="wallet-feature-icon referral-feature-icon">
                <Icon name="gift" size={24} />
              </span>
            </div>
            <div className="wallet-gift-illustration">
              <span className="wallet-gift-spark wallet-gift-spark-one">
                <Icon name="sparkles" size={23} />
              </span>
              <span className="wallet-gift-box">
                <Icon name="gift" size={66} strokeWidth={1.3} />
              </span>
              <span className="wallet-gift-spark wallet-gift-spark-two">
                <Icon name="sparkles" size={20} />
              </span>
            </div>
            <p className="wallet-referral-description">
              Invite your friends and earn commission.
            </p>
            <div className="wallet-referral-link">
              <span>{walletData.referralLink}</span>
              <button
                type="button"
                onClick={copyReferralLink}
                aria-label="Copy referral link"
                title="Copy referral link"
              >
                <Icon name="copy" size={17} />
                <span>Copy</span>
              </button>
            </div>
            <div className="wallet-commission-grid">
              <div className="wallet-commission-box">
                <span>Direct Commission</span>
                <strong>{walletData.directCommission}</strong>
              </div>
              <div className="wallet-commission-box">
                <span>Level Commission</span>
                <strong>{walletData.levelCommission}</strong>
                <small>10 Levels</small>
              </div>
            </div>
            <button
              type="button"
              className="wallet-referral-footer"
              onClick={copyReferralLink}
            >
              <span>
                <Icon name="users" size={17} />
                Start referring friends
              </span>
              <Icon name="arrow" size={17} />
            </button>
          </article>

          {/* ROYALTY MEMBERSHIP CARD */}
          <article className="wallet-royalty-card">
            <div className="wallet-feature-heading">
              <div>
                <span className="wallet-feature-eyebrow">
                  EXCLUSIVE BENEFITS
                </span>
                <h2>Royalty Membership</h2>
              </div>
              <span className="wallet-feature-icon royalty-feature-icon">
                <Icon name="crown" size={24} />
              </span>
            </div>
            <div className="wallet-crown-illustration">
              <div className="wallet-crown-glow" />
              <Icon
                name="crown"
                size={86}
                strokeWidth={1.3}
              />
            </div>
            <div className="wallet-royalty-stats">
              <div className="wallet-royalty-stat">
                <span>Total Royalty Members</span>
                <strong>
                  {walletData.totalRoyaltyMembers}
                </strong>
              </div>
              <div className="wallet-royalty-stat">
                <span>Payout Cycle</span>
                <strong>{walletData.payoutCycle}</strong>
              </div>
            </div>
            <div className="wallet-royalty-benefits">
              <div>
                <span className="wallet-benefit-icon">
                  <Icon name="check" size={15} />
                </span>
                <span>Eligibility Conditions</span>
              </div>
              <div>
                <span className="wallet-benefit-icon">
                  <Icon name="users" size={15} />
                </span>
                <span>Stage-based Director</span>
              </div>
              <div>
                <span className="wallet-benefit-icon">
                  <Icon name="gift" size={15} />
                </span>
                <span>Royalty Benefits</span>
              </div>
            </div>
            <div className="wallet-royalty-status">
              <span>Your Status:</span>
              <strong>{walletData.royaltyStatus}</strong>
            </div>
            <button
              type="button"
              className="wallet-royalty-button"
              onClick={() => handleAction("royalty")}
            >
              View Full Details
              <Icon name="arrow" size={17} />
            </button>
          </article>
        </section>

        {/* =================================
            BOTTOM PROMOTIONAL BANNER
        ================================= */}
        <section className="wallet-promo-banner">
          <div className="wallet-promo-icon">
            <Icon name="gift" size={28} />
          </div>
          <div className="wallet-promo-content">
            <span>YOUR NEXT LUCKY MOMENT</span>
            <h3>Ready for your next lucky moment?</h3>
            <p>
              Check your tickets and get ready for the next draw.
            </p>
          </div>
          <button
            type="button"
            className="wallet-promo-button"
            onClick={() => handleAction("tickets")}
          >
            My Tickets
            <Icon name="arrow" size={17} />
          </button>
        </section>
      </div>
    </main>
  );
}
