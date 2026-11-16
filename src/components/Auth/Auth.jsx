import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

// SVG Icons
const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Auth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isRegister = activeTab === "register";

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isRegister) {
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Registration success - redirect to home
      navigate('/home');
    } else {
      // Login success - redirect to home
      navigate('/home');
    }
  };

  return (
    <main className="lotto-auth-page">
      <div className="lotto-auth-glow lotto-glow-one" />
      <div className="lotto-auth-glow lotto-glow-two" />

      <section className="lotto-auth-card">
        {/* Logo */}
        <header className="lotto-auth-header">
          <div className="lotto-logo">
            <div className="lotto-logo-orbit">
              <span className="lotto-logo-star">★</span>
              <span className="lotto-logo-crescent">☾</span>
            </div>
          </div>

          <h1 className="lotto-brand">
            LOTTO <span>LINK</span>
          </h1>

          <p className="lotto-auth-subtitle">
            {isRegister ? "Create Account" : "Welcome Back"}
          </p>
        </header>

        {/* Register / Login Toggle */}
        <div className="lotto-auth-tabs">
          <button
            type="button"
            className={isRegister ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            type="button"
            className={!isRegister ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
        </div>

        {/* Form */}
        <form
          className="lotto-auth-form"
          onSubmit={handleSubmit}
          key={activeTab}
        >
          {isRegister && (
            <>
              <label className="lotto-input-box">
                <span className="lotto-field-icon"><UserIcon /></span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="lotto-input-box">
                <span className="lotto-field-icon"><MailIcon /></span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  required
                />
              </label>

              <div className="lotto-input-box">
                <span className="lotto-field-icon"><PhoneIcon /></span>
                <select
                  name="countryCode"
                  className="lotto-country-code"
                  aria-label="Country code"
                  defaultValue="+91"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+60">+60</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  autoComplete="tel-national"
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number"
                  required
                />
              </div>
            </>
          )}

          <label className="lotto-input-box">
            <span className="lotto-field-icon">{isRegister ? <StarIcon /> : <UserIcon />}</span>
            <input
              type={isRegister ? "text" : "text"}
              name="identifier"
              placeholder={isRegister ? "Username" : "Phone Number / Email"}
              autoComplete="username"
              required
            />
          </label>

          <label className="lotto-input-box">
            <span className="lotto-field-icon"><LockIcon /></span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={6}
              required
            />
            <button
              className="lotto-password-toggle"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </label>

          {!isRegister && (
            <div className="lotto-forgot-row">
              <button
                type="button"
                onClick={() =>
                  alert("Connect your password reset flow here.")
                }
              >
                Forgot Password?
              </button>
            </div>
          )}

          {isRegister && (
            <>
              <label className="lotto-input-box">
                <span className="lotto-field-icon"><LockIcon /></span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
                <button
                  className="lotto-password-toggle"
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </label>

              <label className="lotto-terms">
                <input type="checkbox" name="terms" required />
                <span>
                  I agree to <a href="#terms">Terms &amp; Conditions</a>
                </span>
              </label>
            </>
          )}

          <button type="submit" className="lotto-submit-button">
            {isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        {/* OR separator — login only */}
        {!isRegister && (
          <>
            <div className="lotto-or-divider">
              <span />
              <p>OR</p>
              <span />
            </div>

            <div className="lotto-social-buttons">
              <button
                type="button"
                onClick={() =>
                  alert("Google authentication requires integration.")
                }
                aria-label="Continue with Google"
              >
                <svg className="lotto-google-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  alert("Apple authentication requires integration.")
                }
                aria-label="Continue with Apple"
              >
                <svg className="lotto-apple-icon" width="19" height="19" viewBox="0 0 24 24" fill="#000">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Bottom text — no footer navigation */}
        <p className="lotto-switch-text">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() =>
              setActiveTab(isRegister ? "login" : "register")
            }
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </section>
    </main>
  );
}
