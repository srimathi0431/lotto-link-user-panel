import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Draws.css";

/* ─── DRAW INFO & PRIZES ─────────────────── */
const DRAW_INFO = {
  "LL-1258": { name: "Mega Draw #LL-1258",    date: "10 November 2026", time: "08:00 PM", ticketPrice: 1,  entries: 8942  },
  "LL-1257": { name: "Weekly Draw #LL-1257",  date: "09 November 2026", time: "06:00 PM", ticketPrice: 3,  entries: 5847  },
  "LL-1256": { name: "Super Draw #LL-1256",   date: "08 November 2026", time: "09:00 PM", ticketPrice: 12, entries: 12483 },
  "LL-1255": { name: "Daily Draw #LL-1255",   date: "07 November 2026", time: "07:00 PM", ticketPrice: 1,  entries: 3928  },
  "LL-1254": { name: "Evening Draw #LL-1254", date: "06 November 2026", time: "08:30 PM", ticketPrice: 3,  entries: 4652  },
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

const randomDigits = (length) => {
  const digits = [];
  while (digits.length < length) {
    const d = Math.floor(Math.random() * 10);
    if (digits.length === 0 && length > 1 && d === 0) continue;
    if (!digits.includes(d)) digits.push(d);
  }
  return digits;
};

const createConfetti = () =>
  Array.from({ length: 300 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
    rotate: Math.random() * 360,
    color: ["#ffd34e","#ff48ca","#53d9ff","#ff8c37","#8f74ff","#4ade80"][i % 6],
  }));

const WINNER_LABELS = ["WINNER #1", "WINNER #2", "WINNER #3", "WINNER #4"];
const WINNER_RANKS  = ["gold", "silver", "bronze", "fourth"];
const WINNER_PCTS   = ["40%", "20%", "15%", "10%"];

export default function Draw() {
  const { id } = useParams();
  const navigate = useNavigate();

  const info   = DRAW_INFO[id] || DRAW_INFO["LL-1258"];
  const prizes = getPrizes(info.entries, info.ticketPrice);
  const prizeAmounts = [prizes.first, prizes.second, prizes.third, prizes.fourth];

  const [phase,         setPhase]         = useState("ready");
  const [winnerIndex,   setWinnerIndex]   = useState(0);
  const [winningNumber, setWinningNumber] = useState([]);
  const [displayDigits, setDisplayDigits] = useState([]);
  const [confetti,      setConfetti]      = useState([]);
  const [countdown,     setCountdown]     = useState(5);
  const [history,       setHistory]       = useState([]);

  const winnerNumbers = [
    winningNumber,
    winningNumber.slice(1),
    winningNumber.slice(2),
    winningNumber.slice(3),
  ];
  const currentNumber = winnerNumbers[winnerIndex] || [];

  const startDraw = () => {
    const number = randomDigits(4);
    setWinningNumber(number);
    setDisplayDigits(randomDigits(4));
    setWinnerIndex(0);
    setHistory([]);
    setConfetti([]);
    setCountdown(5);
    setPhase("shuffle");
  };

  useEffect(() => {
    if (phase === "shuffle") {
      let remaining = 5;
      setCountdown(5);

      const shuffleInterval = setInterval(() => {
        setDisplayDigits(randomDigits(currentNumber.length));
      }, 90);

      const countdownInterval = setInterval(() => {
        remaining--;
        setCountdown(Math.max(remaining, 0));
      }, 1000);

      const shuffleTimeout = setTimeout(() => {
        clearInterval(shuffleInterval);
        clearInterval(countdownInterval);
        setDisplayDigits([...currentNumber]);
        // Skip reveal, go directly to celebration
        setHistory(prev => [
          ...prev,
          { label: WINNER_LABELS[winnerIndex], number: [...currentNumber] },
        ]);
        setConfetti(createConfetti());
        setPhase("celebration");
      }, 5000);

      return () => {
        clearInterval(shuffleInterval);
        clearInterval(countdownInterval);
        clearTimeout(shuffleTimeout);
      };
    }

    if (phase === "celebration") {
      const t = setTimeout(() => {
        setWinnerIndex(prev => prev + 1);
        setPhase(winnerIndex === 3 ? "complete" : "shuffle");
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [phase, winnerIndex]);

  const renderBoxes = (digits, revealed = false) =>
    digits.map((digit, index) => (
      <div
        className={`digit-box ${revealed ? "digit-revealed" : "digit-shuffling"}`}
        key={`${winnerIndex}-${index}`}
      >
        <span style={!revealed ? {
          animationDuration: `${0.18 + index * 0.08}s`,
          animationDelay: `${index * 0.05}s`,
        } : {}}>{digit}</span>
      </div>
    ));

  /* ── SINGLE WRAPPER – same bg for ALL phases ── */
  return (
    <div className="draw-page">
      {/* persistent bg glows */}
      <div className="draw-bg-glow" />
      <div className="draw-bg-glow glow-two" />

      {/* persistent main – only inner section swaps */}
      <main className="draw-main">

        {/* ── READY ── */}
        {phase === "ready" && (
          <section className="draw-stage">
            <div className="stage-tag">✦ OFFICIAL DRAW ✦</div>
            <h1 className="draw-heading">LUCKY <span>DRAW</span></h1>
            <p className="draw-subtitle">{info.name} · {info.date} · {info.time}</p>
            <div className="number-container">
              {["?","?","?","?"].map((d, i) => (
                <div className="digit-box ready-box" key={i}>{d}</div>
              ))}
            </div>

            <div className="draw-prize-breakdown-section">
              <div className="dpb-title">Prize Distribution · Pool ${prizes.pool.toLocaleString()}</div>
              {[
                { label: "1st Prize", pct: "40%", amt: prizes.first   },
                { label: "2nd Prize", pct: "20%", amt: prizes.second  },
                { label: "3rd Prize", pct: "15%", amt: prizes.third   },
                { label: "4th Prize", pct: "10%", amt: prizes.fourth  },
              ].map((row, ri) => (
                <div key={ri} className="dpb-row">
                  <span className="dpb-name">{row.label}</span>
                  <span className="dpb-pct">{row.pct}</span>
                  <span className="dpb-amount">${row.amt.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <button className="start-draw-btn" onClick={startDraw}>
              <span>▶</span> START LIVE DRAW
            </button>
            <p className="draw-info">4 Winners · Connected Number System</p>
          </section>
        )}

        {/* ── SHUFFLE ── */}
        {phase === "shuffle" && (
          <section className="draw-stage" key={`shuffle-${winnerIndex}`}>
            <div className="stage-tag">✦ LIVE NUMBER GENERATION ✦</div>
            <div className="shuffle-status">
              <span className="clock-icon">◷</span>
              SHUFFLING...
              <strong>00:0{countdown}</strong>
            </div>
            <h1 className="draw-heading">
              {winnerIndex === 0 ? "FIRST DRAW" : "NEXT WINNER"}
            </h1>
            <p className="draw-subtitle">Number Selection</p>
            <div className="number-container">
              {displayDigits.map((digit, index) => (
                <div className="digit-box digit-shuffling" key={`${winnerIndex}-${index}`}>
                  <span style={{
                    animationDuration: `${0.18 + index * 0.08}s`,
                    animationDelay: `${index * 0.05}s`,
                  }}>{digit}</span>
                </div>
              ))}
            </div>
            <div className="shuffle-loader">
              <div className="loader-bar" key={`loader-${winnerIndex}`} />
            </div>
            <p className="draw-info">Selecting your lucky number...</p>
          </section>
        )}

        {/* ── CELEBRATION ── */}
        {phase === "celebration" && (
          <section className="draw-stage celebration-stage">
            <div className="firework firework-one">✹</div>
            <div className="firework firework-two">✹</div>
            <div className="firework firework-three">✹</div>
            
            {/* Banner top */}
            <div className="winner-banner winner-banner-reveal">
              🏆 {WINNER_LABELS[winnerIndex]} 🏆
            </div>
            <div className="winner-crown">♛</div>
            
            {/* Numbers bottom - delayed */}
            <div className="number-container winner-numbers winner-numbers-delayed">
              {renderBoxes(currentNumber, true)}
            </div>
            
            <div className="prize-amount-display">
              ${prizeAmounts[winnerIndex]?.toLocaleString()} · {WINNER_PCTS[winnerIndex]}
            </div>

            {/* Confetti */}
            <div className="confetti-container">
              {confetti.map(item => (
                <span
                  className="confetti-piece"
                  key={item.id}
                  style={{
                    left: `${item.left}%`,
                    animationDelay: `${item.delay}s`,
                    animationDuration: `${item.duration}s`,
                    transform: `rotate(${item.rotate}deg)`,
                    background: item.color,
                  }}
                />
              ))}
            </div>
            <div className="confetti-container">
              {confetti.map(item => (
                <span
                  className="confetti-piece"
                  key={item.id}
                  style={{
                    left: `${item.left}%`,
                    animationDelay: `${item.delay}s`,
                    animationDuration: `${item.duration}s`,
                    transform: `rotate(${item.rotate}deg)`,
                    background: item.color,
                  }}
                />
              ))}
            </div>
            <div className="celebration-label">🎉 CELEBRATION IN PROGRESS 🎉</div>
            <p className="draw-info">Preparing next winner...</p>
          </section>
        )}

        {/* ── COMPLETE ── */}
        {phase === "complete" && (
          <section className="final-results">
            <div className="final-crown">♛</div>
            <div className="final-title"><span>🏆</span> FINAL RESULTS <span>🏆</span></div>
            <p className="draw-subtitle">OFFICIAL WINNERS ANNOUNCEMENT</p>
            <div className="results-grid">
              {history.map((winner, index) => (
                <div className={`result-card result-card--${WINNER_RANKS[index]}`} key={index}
                  style={{ animationDelay: `${index * 0.12}s` }}>
                  <div className="result-label">{winner.label}</div>
                  <div className="result-digits">
                    {winner.number.map((digit, i) => (
                      <span key={i}>{digit}</span>
                    ))}
                  </div>
                  <div className="result-prize">
                    ${prizeAmounts[index]?.toLocaleString()}
                    <span>{WINNER_PCTS[index]}</span>
                  </div>
                  <div className="result-status">✦ WINNER ✦</div>
                </div>
              ))}
            </div>
            <div className="final-actions">
              <button className="start-draw-btn"
                onClick={() => navigate(`/draws/${id || "LL-1258"}/results`)}>
                VIEW FULL RESULTS
              </button>
              <button className="start-draw-btn replay-btn"
                onClick={() => setPhase("ready")}>
                ↻ RESTART DRAW
              </button>
            </div>
          </section>
        )}

      </main>

    </div>
  );
}
