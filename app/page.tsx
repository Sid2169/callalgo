import Link from "next/link";
import Image from "next/image";

const ticker = [
  { symbol: "AAPL", price: "182.63", change: "+1.24%" },
  { symbol: "TSLA", price: "248.11", change: "+3.07%" },
  { symbol: "NVDA", price: "875.40", change: "+2.18%" },
  { symbol: "SPY", price: "521.33", change: "+0.88%" },
  { symbol: "BTC", price: "67,420", change: "+4.52%" },
  { symbol: "MSFT", price: "415.20", change: "-0.34%" },
  { symbol: "AMZN", price: "189.75", change: "+1.63%" },
  { symbol: "GOOG", price: "172.60", change: "-0.71%" },
];

const pillars = [
  {
    id: "01",
    title: "Learn",
    description:
      "Market microstructure, quant probability, and the statistical foundations that separate noise from signal.",
    topics: ["Price action", "Indicators", "Risk & statistics"],
  },
  {
    id: "02",
    title: "Build",
    description:
      "Design rule-based systems from scratch. Preprocess data pipelines. Generate and validate trading signals.",
    topics: ["Strategy design", "Data pipelines", "Signal logic"],
  },
  {
    id: "03",
    title: "Trade",
    description:
      "Backtest rigorously. Evaluate with Sharpe, max drawdown, and win rate. Simulate real execution conditions.",
    topics: ["Backtesting", "Performance eval", "Execution logic"],
  },
  {
    id: "04",
    title: "Automate",
    description:
      "Deploy via broker APIs. Schedule strategies. Monitor live performance and scale what works.",
    topics: ["API trading", "Scheduling", "Live monitoring"],
  },
];

const codeSnippet = `import callalgo as ca

strategy = ca.Strategy("momentum_crossover")

@strategy.signal
def generate(bar):
    fast = bar.ema(period=9)
    slow = bar.ema(period=21)
    return ca.LONG if fast > slow else ca.FLAT

result = strategy.backtest(
    ticker="AAPL",
    start="2020-01-01",
    end="2024-01-01",
)

print(result.sharpe)   # 1.84
print(result.max_dd)   # -12.3%`;

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-mono overflow-x-hidden">
      {/* ─── CSS ─────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --green: #00ff8c;
          --green-dim: #00c96e;
          --green-muted: #003d22;
          --grid: rgba(0,255,140,0.04);
          --border: rgba(0,255,140,0.15);
          --surface: rgba(0,255,140,0.04);
        }

        * { box-sizing: border-box; }

        .font-mono { font-family: 'Space Mono', monospace; }
        .font-sans { font-family: 'DM Sans', sans-serif; }

        .grid-bg {
          background-image:
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .green { color: var(--green); }
        .green-dim { color: var(--green-dim); }
        .green-border { border-color: var(--border); }

        /* Ticker */
        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker 30s linear infinite;
          width: max-content;
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track:hover { animation-play-state: paused; }

        /* Blinking cursor */
        .cursor::after {
          content: '█';
          color: var(--green);
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        /* Pillar cards */
        .pillar {
          border: 1px solid var(--border);
          background: var(--surface);
          padding: 2rem;
          position: relative;
          transition: border-color 0.2s, background 0.2s;
        }
        .pillar:hover {
          border-color: var(--green-dim);
          background: rgba(0,255,140,0.07);
        }
        .pillar-id {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--green-dim);
          opacity: 0.5;
        }

        /* Code block */
        .code-block {
          background: #050e07;
          border: 1px solid var(--border);
          padding: 1.75rem;
          overflow-x: auto;
          font-size: 0.78rem;
          line-height: 1.8;
          color: #b0ffd4;
        }
        .code-keyword { color: var(--green); }
        .code-comment { color: #3a6b4a; }
        .code-string  { color: #7bffc2; }
        .code-number  { color: #50fa7b; }

        /* CTA button */
        .btn-primary {
          background: var(--green);
          color: #000;
          font-family: 'Space Mono', monospace;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.9rem 2rem;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
          display: inline-block;
          text-decoration: none;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-ghost {
          background: transparent;
          color: var(--green);
          font-family: 'Space Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.05em;
          padding: 0.88rem 2rem;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          display: inline-block;
          text-decoration: none;
        }
        .btn-ghost:hover {
          border-color: var(--green-dim);
          background: var(--surface);
        }

        /* Section label */
        .section-tag {
          display: inline-block;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: var(--green-dim);
          border: 1px solid var(--border);
          padding: 0.3rem 0.65rem;
          margin-bottom: 1.5rem;
        }

        /* Stat card */
        .stat-card {
          border-top: 1px solid var(--border);
          padding-top: 1.25rem;
        }
        .stat-num {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--green);
          line-height: 1;
        }
        .stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: #4a7a5e;
          margin-top: 0.4rem;
        }

        /* Nav */
        nav {
          border-bottom: 1px solid var(--border);
          background: rgba(71, 85, 105, 1);
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 50;
        }
      `}</style>

      {/* ─── NAV ──────────────────────────────────── */}
      <nav>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}
             className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Image
              src="/onlyLogo.png"
              alt="CallAlgo logo"
              width={52}
              height={52}
              priority
            />
            <span className="green font-bold text-xl tracking-widest">CALL</span>
            <span className="text-white font-bold text-xl tracking-widest">ALGO</span>
          </div>
          <div className="hidden sm:flex items-center gap-8">
            {["Learn", "Build", "Trade", "Automate"].map((item) => (
              <a key={item} href="#"
                 className="text-xs tracking-widest text-slate-100 hover:text-white transition-colors"
                 style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item.toUpperCase()}
              </a>
            ))}
          </div>
          <a href="#" className="btn-primary" style={{ fontSize: "0.7rem", padding: "0.55rem 1.25rem" }}>
            GET ACCESS
          </a>
        </div>
      </nav>

      {/* ─── TICKER BAR ───────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border)", overflow: "hidden", height: "36px",
                    display: "flex", alignItems: "center", background: "rgba(0,255,140,0.03)" }}>
        <div className="ticker-track">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-3 px-6 text-xs"
                  style={{ whiteSpace: "nowrap", borderRight: "1px solid var(--border)" }}>
              <span className="green font-bold">{t.symbol}</span>
              <span className="text-zinc-400">{t.price}</span>
              <span style={{ color: t.change.startsWith("+") ? "var(--green)" : "#ff5f5f" }}>
                {t.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── HERO ─────────────────────────────────── */}
      <section className="grid-bg relative" style={{ minHeight: "88vh", display: "flex", alignItems: "center" }}>
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px", height: "500px",
          background: "radial-gradient(ellipse, rgba(0,255,140,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem", width: "100%" }}>
          {/* Pre-label */}
          <div className="section-tag">ALGORITHMIC TRADING EDUCATION</div>

          {/* Heading */}
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700,
                       lineHeight: 1.05, letterSpacing: "-0.02em",
                       maxWidth: "720px", marginBottom: "1.75rem" }}>
            <span style={{ display: "block", color: "#fff" }}>From concept</span>
            <span style={{ display: "block", color: "var(--green)" }}>to live system.</span>
            <span style={{ display: "block", color: "#fff" }}>Code-first</span>
            <span className="cursor" style={{ color: "#333" }}>&nbsp;</span>
          </h1>

          <p className="font-sans" style={{ fontSize: "1.05rem", color: "#7a9e8a", maxWidth: "520px",
                                            lineHeight: 1.75, marginBottom: "2.5rem", fontWeight: 300 }}>
            CallAlgo is a structured platform that takes you from market fundamentals to
            building, backtesting, and deploying real algorithmic trading systems.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4" style={{ marginBottom: "4rem" }}>
            <a href="#" className="btn-primary">START LEARNING →</a>
            <a href="#" className="btn-ghost">VIEW CURRICULUM</a>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                        gap: "2rem", maxWidth: "560px" }}>
            {[
              { num: "4", label: "CORE MODULES" },
              { num: "40+", label: "CODE TUTORIALS" },
              { num: "12+", label: "LIVE STRATEGIES" },
              { num: "100%", label: "CODE-FIRST" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PILLARS ──────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "6rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="section-tag">CURRICULUM</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700,
                       marginBottom: "3.5rem", letterSpacing: "-0.02em" }}>
            Four pillars.<br />
            <span className="green">One complete system.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px",
                        border: "1px solid var(--border)" }}>
            {pillars.map((p) => (
              <div key={p.id} className="pillar">
                <div className="pillar-id">{p.id}</div>
                <div className="green font-bold text-xs tracking-widest mb-3">{p.title.toUpperCase()}</div>
                <p className="font-sans" style={{ color: "#7a9e8a", fontSize: "0.88rem",
                                                  lineHeight: 1.7, marginBottom: "1.5rem", fontWeight: 300 }}>
                  {p.description}
                </p>
                <div className="flex flex-col gap-1">
                  {p.topics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs" style={{ color: "#4a7a5e" }}>
                      <span className="green">▸</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CODE PREVIEW ─────────────────────────── */}
      <section className="grid-bg" style={{ borderTop: "1px solid var(--border)", padding: "6rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem",
                      display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left text */}
          <div>
            <div className="section-tag">CODE-FIRST LEARNING</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700,
                         marginBottom: "1.25rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Build strategies,<br />
              <span className="green">not just theory.</span>
            </h2>
            <p className="font-sans" style={{ color: "#7a9e8a", fontSize: "0.92rem",
                                              lineHeight: 1.75, marginBottom: "2rem", fontWeight: 300 }}>
              Every concept is grounded in real code. Write your first signal in minutes.
              Backtest across years of data. Measure what actually matters.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Clean, opinionated framework",
                "Real-world backtest engine",
                "Broker API integration",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 font-sans"
                     style={{ fontSize: "0.85rem", color: "#4a8a65" }}>
                  <span style={{ width: "20px", height: "20px", border: "1px solid var(--border)",
                                 display: "flex", alignItems: "center", justifyContent: "center",
                                 flexShrink: 0, fontSize: "0.6rem" }} className="green">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Code block */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem",
                          borderBottom: "1px solid var(--border)", padding: "0.6rem 1rem",
                          background: "#050e07", border: "1px solid var(--border)" }}>
              {["#ff5f57","#ffbd2e","#28c840"].map((c) => (
                <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
              ))}
              <span style={{ marginLeft: "0.5rem", fontSize: "0.65rem", color: "#3a6b4a" }}>
                momentum_crossover.py
              </span>
            </div>
            <pre className="code-block" style={{ margin: 0, borderTop: "none" }}>
              <code>
                {`import callalgo `}<span className="code-keyword">as</span>{` ca\n\nstrategy = ca.Strategy(`}<span className="code-string">"momentum_crossover"</span>{`)\n\n`}<span className="code-keyword">@</span>{`strategy.signal\n`}<span className="code-keyword">def</span>{` generate(bar):\n    fast = bar.ema(period=`}<span className="code-number">9</span>{`)\n    slow = bar.ema(period=`}<span className="code-number">21</span>{`)\n    `}<span className="code-keyword">return</span>{` ca.LONG `}<span className="code-keyword">if</span>{` fast > slow `}<span className="code-keyword">else</span>{` ca.FLAT\n\nresult = strategy.backtest(\n    ticker=`}<span className="code-string">"AAPL"</span>{`,\n    start=`}<span className="code-string">"2020-01-01"</span>{`,\n    end=`}<span className="code-string">"2024-01-01"</span>{`,\n)\n\n`}<span className="code-comment">print(result.sharpe)   # 1.84</span>{`\n`}<span className="code-comment">print(result.max_dd)   # -12.3%</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "7rem 2rem", textAlign: "center",
                        background: "linear-gradient(180deg, #000 0%, #030f06 100%)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div className="section-tag">GET STARTED</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700,
                       lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Stop watching the market.<br />
            <span className="green">Start commanding it.</span>
          </h2>
          <p className="font-sans" style={{ color: "#7a9e8a", fontSize: "0.95rem",
                                            lineHeight: 1.75, marginBottom: "2.5rem", fontWeight: 300 }}>
            Join the waitlist for early access to CallAlgo's curriculum, code labs, and strategy library.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="#" className="btn-primary">JOIN WAITLIST →</a>
            <a href="#" className="btn-ghost">READ THE DOCS</a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem",
                       display: "flex", justifyContent: "space-between", alignItems: "center",
                       flexWrap: "wrap", gap: "1rem" }}>
        <div className="flex items-center gap-2">
          <span className="green font-bold text-xs tracking-widest">CALL</span>
          <span className="text-white font-bold text-xs tracking-widest">ALGO</span>
        </div>
        <p style={{ fontSize: "0.65rem", color: "#3a5e48", letterSpacing: "0.08em" }}>
          © 2025 CALLALGO — EDUCATIONAL USE ONLY. NOT FINANCIAL ADVICE.
        </p>
      </footer>
    </div>
  );
}