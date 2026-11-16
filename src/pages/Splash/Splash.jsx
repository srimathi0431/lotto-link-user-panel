import { useEffect, useRef, useState } from "react";
import "./Splash.css";

const PARTICLES = Array.from({ length: 38 }, (_, index) => ({
  id: index,
  left: `${(index * 47 + 13) % 100}%`,
  top: `${(index * 31 + 7) % 100}%`,
  delay: `${(index % 9) * -0.8}s`,
  duration: `${4 + (index % 5)}s`,
  size: `${2 + (index % 3)}px`,
}));

const LOTTERY_BALLS = [
  {
    number: 7,
    className: "ball-pink",
    position: "ball-position-one",
  },
  {
    number: 3,
    className: "ball-blue",
    position: "ball-position-two",
  },
  {
    number: 1,
    className: "ball-gold",
    position: "ball-position-three",
  },
  {
    number: 8,
    className: "ball-purple",
    position: "ball-position-four",
  },
  {
    number: 9,
    className: "ball-pink ball-small",
    position: "ball-position-five",
  },
];

export default function Splash({
  onComplete,
  duration = 4500,
}) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(
    "Preparing Your Experience"
  );

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let animationFrame;
    let startTime;
    let completed = false;

    const totalDuration = Math.max(100, duration);

    const animate = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const percentage = Math.min(
        (elapsed / totalDuration) * 100,
        100
      );

      setProgress(Math.floor(percentage));

      if (percentage < 35) {
        setLoadingText("Preparing Your Experience");
      } else if (percentage < 70) {
        setLoadingText("Connecting Your Dreams");
      } else if (percentage < 100) {
        setLoadingText("Almost Ready...");
      } else {
        setLoadingText("Welcome to LOTTO LINK");
      }

      if (percentage < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else if (!completed) {
        completed = true;

        if (typeof onCompleteRef.current === "function") {
          onCompleteRef.current();
        }
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [duration]);

  return (
    <main className="lotto-splash">
      {/* Animated background */}
      <div className="splash-bg-gradient" />

      <div className="splash-glow splash-glow-top" />
      <div className="splash-glow splash-glow-left" />
      <div className="splash-glow splash-glow-right" />
      <div className="splash-glow splash-glow-bottom" />

      {/* Background light rings */}
      <div className="splash-orbit splash-orbit-one" />
      <div className="splash-orbit splash-orbit-two" />
      <div className="splash-orbit splash-orbit-three" />

      {/* Golden particles */}
      <div className="splash-particles" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            className="splash-particle"
            style={{
              "--particle-left": particle.left,
              "--particle-top": particle.top,
              "--particle-delay": particle.delay,
              "--particle-duration": particle.duration,
              "--particle-size": particle.size,
            }}
          />
        ))}
      </div>

      {/* Decorative golden confetti */}
      <div className="splash-confetti" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className={`confetti confetti-${index + 1}`}
          />
        ))}
      </div>

      {/* Animated light trails */}
      <div className="splash-light-trails" aria-hidden="true">
        <span className="light-trail light-trail-one" />
        <span className="light-trail light-trail-two" />
        <span className="light-trail light-trail-three" />
        <span className="light-trail light-trail-four" />
      </div>

      {/* Floating lottery balls */}
      <div
        className="splash-lottery-balls"
        aria-hidden="true"
      >
        {LOTTERY_BALLS.map((ball) => (
          <div
            key={ball.position}
            className={`lotto-ball ${ball.className} ${ball.position}`}
          >
            <span className="lotto-ball-number">
              {ball.number}
            </span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <section className="splash-content">
        {/* Logo emblem */}
        <div className="splash-logo-wrapper">
          <div className="splash-logo-aura" />

          <div className="splash-crown">
            <span className="crown-point crown-point-left" />
            <span className="crown-point crown-point-center" />
            <span className="crown-point crown-point-right" />

            <span className="crown-base">
              <span className="crown-gem" />
            </span>
          </div>

          <div className="splash-logo-emblem">
            <div className="splash-crescent">
              <div className="splash-crescent-cutout" />

              <span className="splash-logo-star">★</span>
            </div>
          </div>

          <div className="splash-logo-reflection" />
        </div>

        {/* Brand name */}
        <div className="splash-brand">
          <h1 className="splash-brand-name">
            <span className="brand-lotto">LOTTO</span>
            <span className="brand-link">LINK</span>
          </h1>

          <div className="splash-brand-divider">
            <span />
            <span className="divider-diamond" />
            <span />
          </div>

          <p className="splash-tagline">
            PLAY <span>·</span> CONNECT <span>·</span> WIN
            <span> </span> TOGETHER
          </p>
        </div>

        {/* Center decorative sparkle */}
        <div className="splash-center-decoration">
          <span className="decoration-line" />
          <span className="decoration-star">✦</span>
          <span className="decoration-line" />
        </div>

        {/* Loading section */}
        <div className="splash-loading">
          <div className="splash-loading-heading">
            <span className="loading-status-dot" />

            <p className="splash-loading-text" aria-live="polite">
              {loadingText}
            </p>

            <span className="splash-loading-percent">
              {progress}%
            </span>
          </div>

          <div
            className="splash-progress-track"
            role="progressbar"
            aria-label="Loading LOTTO LINK"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="splash-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <span className="splash-progress-shimmer" />
            </div>
          </div>

          <div className="splash-loading-footer">
            <span>YOUR JOURNEY STARTS HERE</span>
            <span className="splash-footer-sparkle">✦</span>
          </div>
        </div>
      </section>

      {/* Bottom brand signature */}
      <footer className="splash-footer">
        <span className="splash-footer-line" />
        <span className="splash-footer-brand">
          LOTTO LINK
        </span>
        <span className="splash-footer-line" />
      </footer>
    </main>
  );
}
