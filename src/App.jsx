import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation, Link } from 'react-router-dom'
import Splash from './pages/Splash/Splash'
import Auth from './components/Auth/Auth'
import Home from './pages/Home/Home'
import Tickets from './pages/Tickets/Tickets'
import MyTickets from './pages/MyTickets/MyTickets'
import TicketDetail from './pages/MyTickets/TicketDetail'
import DrawList from './pages/Draws/DrawList'
import Draws from './pages/Draws/Draws'
import DrawResults from './pages/Draws/DrawResults'
import LTKCoins from './pages/LTKCoins/LTKCoins'
import Referral from './pages/Referral/Referral'
import JoiningCommission from './pages/Referral/JoiningCommission'
import WinningCommission from './pages/Referral/WinningCommission'
import Royalty from './pages/Royalty/Royalty'
import RoyaltyMembers from './pages/Royalty/RoyaltyMembers'
import RoyaltyDirector from './pages/Royalty/RoyaltyDirector'
import Messages from './pages/Messages/Messages'
import Notifications from './pages/Notifications/Notifications'
import Wallet from './pages/Wallet/Wallet'
import Profile from './pages/Profile/Profile'
import './App.css'
import './pages/Home/Home.css'

// SVG Icons for Navigation
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const TicketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const DrawIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const RewardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MyTicketsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 3v4M8 3v4M2 11h20" />
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

function SplashWithRedirect() {
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    navigate('/auth');
  };

  return <Splash onComplete={handleSplashComplete} />;
}

// Common Sidebar Component
function Sidebar() {
  const location = useLocation();
  
  // Don't show on splash and auth pages
  if (location.pathname === '/' || location.pathname === '/auth') {
    return null;
  }

  return (
    <aside className="lotto-sidebar">
      <Link to="/home" className="sidebar-brand">
        <span className="sidebar-logo">🎯</span>
        <div className="sidebar-brand-text">
          <h2>
            LOTTO<span>LINK</span>
          </h2>
          <p>Play Today, Win Tomorrow</p>
        </div>
      </Link>
      <div className="sidebar-section-title">MAIN MENU</div>
      <nav className="sidebar-menu">
        <Link
          to="/home"
          className={`sidebar-link ${(location.pathname === '/home' || location.pathname === '/ltk-coins') ? 'active' : ''}`}
          aria-current={(location.pathname === '/home' || location.pathname === '/ltk-coins') ? 'page' : undefined}
        >
          <span className="sidebar-menu-icon"><HomeIcon /></span>
          <span>Home</span>
        </Link>
        <Link
          to="/draws"
          className={`sidebar-link ${location.pathname.startsWith('/draws') ? 'active' : ''}`}
        >
          <span className="sidebar-menu-icon"><DrawIcon /></span>
          <span>Draws</span>
        </Link>
        <Link
          to="/my-tickets"
          className={`sidebar-link ${location.pathname.startsWith('/my-tickets') ? 'active' : ''}`}
          aria-current={location.pathname.startsWith('/my-tickets') ? 'page' : undefined}
        >
          <span className="sidebar-menu-icon"><MyTicketsIcon /></span>
          <span>My Tickets</span>
        </Link>
        <Link
          to="/tickets"
          className={`sidebar-link ${location.pathname === '/tickets' ? 'active' : ''}`}
        >
          <span className="sidebar-menu-icon"><TicketIcon /></span>
          <span>Buy Tickets</span>
        </Link>
        <Link
          to="/wallet"
          className={`sidebar-link ${location.pathname === '/wallet' ? 'active' : ''}`}
        >
          <span className="sidebar-menu-icon"><WalletIcon /></span>
          <span>Wallet</span>
        </Link>
        <Link
          to="/profile"
          className={`sidebar-link ${(location.pathname === '/profile' || location.pathname.startsWith('/referral')) ? 'active' : ''}`}
        >
          <span className="sidebar-menu-icon"><ProfileIcon /></span>
          <span>Profile</span>
        </Link>
      </nav>
      <div className="sidebar-promo">
        <div className="sidebar-promo-icon">✨</div>
        <h3>Dream Big!</h3>
        <p>Your next lucky moment could be just around the corner.</p>
        <Link to="/draws">Explore Draws →</Link>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer-avatar">HK</div>
        <div className="sidebar-footer-info">
          <strong>Kumar</strong>
          <span>Player Account</span>
        </div>
      </div>
    </aside>
  );
}

// Common Bottom Navigation
function BottomNav() {
  const location = useLocation();
  
  // Don't show on splash and auth pages
  if (location.pathname === '/' || location.pathname === '/auth') {
    return null;
  }

  const navigationItems = [
    { label: "Home", icon: <HomeIcon />, to: "/home" },
    { label: "Tickets", icon: <TicketIcon />, to: "/tickets" },
    { label: "Draws", icon: <DrawIcon />, to: "/draws" },
    { label: "Wallet", icon: <WalletIcon />, to: "/wallet" },
    { label: "Profile", icon: <ProfileIcon />, to: "/profile" },
  ];

  return (
    <nav className="lotto-bottom-nav" aria-label="Mobile navigation">
      {navigationItems.map((item) => {
        let isActive = false;
        
        if (item.to === '/home') {
          isActive = location.pathname === '/home' || location.pathname === '/ltk-coins';
        } else if (item.to === '/draws') {
          isActive = location.pathname.startsWith('/draws');
        } else if (item.to === '/my-tickets') {
          isActive = location.pathname.startsWith('/my-tickets');
        } else if (item.to === '/profile') {
          isActive = location.pathname === '/profile' || location.pathname.startsWith('/referral');
        } else {
          isActive = location.pathname === item.to;
        }

        return (
          <Link
            to={item.to}
            key={item.label}
            className={`nav-item ${isActive ? "active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            <small>{item.label}</small>
          </Link>
        );
      })}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<SplashWithRedirect />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/draws" element={<DrawList />} />
          <Route path="/draws/:id" element={<Draws />} />
          <Route path="/draws/:id/results" element={<DrawResults />} />
          <Route path="/ltk-coins" element={<LTKCoins />} />
          <Route path="/rewards" element={<Navigate to="/draws" replace />} />
          <Route path="/winners" element={<Navigate to="/draws" replace />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/my-tickets/:id" element={<TicketDetail />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/referral/joining-commission" element={<JoiningCommission />} />
          <Route path="/referral/winning-commission" element={<WinningCommission />} />
          <Route path="/royalty" element={<Royalty />} />
          <Route path="/royalty/members" element={<RoyaltyMembers />} />
          <Route path="/royalty/director" element={<RoyaltyDirector />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App