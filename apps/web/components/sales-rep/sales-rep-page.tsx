"use client"

import Navbar from "../navbar"
import Footer from "../footer"

const levels = [
  {
    title: "Intern",
    base: "10%",
    above: "15%",
    target: "$5,000/mo",
    earnings: "$500/mo",
    ramp: "M1: $2,500 · M2: $3,500 · M3+: $5,000",
    color: "#6b7280",
  },
  {
    title: "Junior",
    base: "15%",
    above: "20%",
    target: "$12,500/mo",
    earnings: "$1,875/mo",
    ramp: "M1: $7,500 · M2: $10,000 · M3+: $12,500",
    color: "#3b82f6",
  },
  {
    title: "Associate",
    base: "20%",
    above: "25%",
    target: "$25,000/mo",
    earnings: "$5,000/mo",
    ramp: "—",
    color: "#10b981",
  },
  {
    title: "Senior",
    base: "30%",
    above: "35%",
    target: "$40,000/mo",
    earnings: "$12,000/mo",
    ramp: "—",
    color: "#f59e0b",
  },
]

const placement = [
  { range: "Under $5,000", result: "Stays Intern", note: "Coaching + 1 extra month or let go", color: "#ef4444" },
  { range: "$5,000 – $15,000", result: "Confirmed Intern", note: "Continue at Intern level", color: "#6b7280" },
  { range: "$15,000 – $30,000", result: "Fast-tracked to Junior", note: "Immediate level upgrade", color: "#3b82f6" },
  { range: "$30,000+", result: "Fast-tracked to Associate", note: "Skip Junior entirely", color: "#10b981" },
]

const howItWorks = [
  { step: "01", title: "Apply", desc: "Submit your application on the rep portal. We review every application within 48 hours and reply with next steps." },
  { step: "02", title: "Onboard & Train", desc: "You get access to our rep portal, sales materials, pricing guides, and a personal onboarding session with the Thrinxs team." },
  { step: "03", title: "Start Earning", desc: "Share your unique referral link. Every client you bring in earns you commission — tracked in real time on your rep dashboard." },
]

const benefits = [
  "Work from anywhere — fully remote",
  "Real-time commission tracking dashboard",
  "Dedicated Thrinxs rep support team",
  "Sales materials, pitch decks & pricing guides provided",
  "Unlimited earning potential — no cap",
  "Fast-track promotions based purely on performance",
  "Commission paid monthly on confirmed revenue",
  "Exclusive access to new service launches",
]

export default function SalesRepPage() {
  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#f5f5f5", fontFamily: "inherit" }}>
      <Navbar />

      {/* ── HERO ── */}
      <div style={{ paddingTop: "140px", paddingBottom: "80px", borderBottom: "1px solid #1a1a1a", textAlign: "center" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f59e0b15", border: "1px solid #f59e0b30", borderRadius: "999px", padding: "6px 18px", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ color: "#f59e0b", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Sales Rep Program</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
            Turn Your Network
            <br />
            <span style={{ background: "linear-gradient(90deg, #f59e0b, #fcd34d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Into Income</span>
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: "580px", margin: "0 auto 36px" }}>
            Introduce businesses to Thrinxs and earn 10–30% commission on every closed deal — with no cap, no office, and performance-based promotions.
          </p>
          <a href="/get-started" style={{ display: "inline-block", background: "#f59e0b", color: "#000", padding: "16px 40px", borderRadius: "10px", fontWeight: 800, fontSize: "16px", textDecoration: "none", boxShadow: "0 0 32px rgba(245,158,11,0.3)" }}>
            Apply to Become a Rep
          </a>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 120px" }}>

        {/* ── HOW IT WORKS ── */}
        <div style={{ marginBottom: "96px" }}>
          <p style={{ color: "#f59e0b", fontSize: "12px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Simple Process</p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {howItWorks.map((h, i) => (
              <div key={i} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "14px", padding: "32px 28px" }}>
                <p style={{ fontSize: "2.5rem", fontWeight: 900, color: "#f59e0b", opacity: 0.25, lineHeight: 1, marginBottom: "16px" }}>{h.step}</p>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "10px" }}>{h.title}</h3>
                <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── COMMISSION LEVELS ── */}
        <div style={{ marginBottom: "96px" }}>
          <p style={{ color: "#f59e0b", fontSize: "12px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Earning Structure</p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, textAlign: "center", marginBottom: "16px" }}>Commission Levels</h2>
          <p style={{ color: "#9ca3af", fontSize: "14px", textAlign: "center", maxWidth: "560px", margin: "0 auto 48px" }}>Hit your monthly target and earn your base rate. Exceed it and earn the above-target rate on every deal over the threshold.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {levels.map((l, i) => (
              <div key={i} style={{ background: "#0d0d0d", border: `1px solid ${l.color}30`, borderRadius: "14px", padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: l.color }} />
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: l.color, marginBottom: "12px" }}>{l.title}</p>
                <p style={{ fontSize: "2.2rem", fontWeight: 900, color: "#f5f5f5", marginBottom: "4px", lineHeight: 1 }}>{l.base}</p>
                <p style={{ color: "#6b7280", fontSize: "12px", marginBottom: "20px" }}>base commission</p>
                <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "16px", display: "grid", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#6b7280" }}>Above target</span>
                    <span style={{ color: l.color, fontWeight: 700 }}>{l.above}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#6b7280" }}>Monthly target</span>
                    <span style={{ color: "#f5f5f5", fontWeight: 600 }}>{l.target}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#6b7280" }}>At target earnings</span>
                    <span style={{ color: "#f5f5f5", fontWeight: 600 }}>{l.earnings}</span>
                  </div>
                  {l.ramp !== "—" && (
                    <div style={{ background: "#111", borderRadius: "6px", padding: "8px 10px", marginTop: "4px" }}>
                      <p style={{ fontSize: "10px", fontWeight: 700, color: "#4b5563", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>Ramp-up targets</p>
                      <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{l.ramp}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PLACEMENT AFTER EVAL ── */}
        <div style={{ marginBottom: "96px" }}>
          <p style={{ color: "#f59e0b", fontSize: "12px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>2-Month Evaluation</p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, textAlign: "center", marginBottom: "16px" }}>Placement After Evaluation</h2>
          <p style={{ color: "#9ca3af", fontSize: "14px", textAlign: "center", maxWidth: "560px", margin: "0 auto 48px" }}>All new reps start as Interns. After your first 2 months, your total revenue determines your confirmed level.</p>
          <div style={{ display: "grid", gap: "12px" }}>
            {placement.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", background: "#0d0d0d", border: `1px solid ${p.color}25`, borderRadius: "10px", padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: "15px", color: "#f5f5f5" }}>{p.range}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontWeight: 700, color: p.color, fontSize: "14px", margin: "0 0 2px" }}>{p.result}</p>
                  <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>{p.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "24px" }}>
            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px 24px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#10b981", marginBottom: "8px" }}>Promotion</p>
              <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>Hit your full monthly target for <strong style={{ color: "#f5f5f5" }}>3 consecutive months</strong> to be promoted to the next level.</p>
            </div>
            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px 24px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#ef4444", marginBottom: "8px" }}>Demotion</p>
              <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>Miss your monthly target for <strong style={{ color: "#f5f5f5" }}>3 consecutive months</strong> and you will be moved down one level.</p>
            </div>
          </div>
        </div>

        {/* ── BENEFITS ── */}
        <div style={{ marginBottom: "96px" }}>
          <p style={{ color: "#f59e0b", fontSize: "12px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Why Join</p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>What You Get</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "16px 20px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#f59e0b20", border: "1px solid #f59e0b40", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span style={{ color: "#9ca3af", fontSize: "13px", lineHeight: 1.6 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── FINAL CTA ── */}
        <div style={{ background: "linear-gradient(135deg, #111 0%, #0d0d0d 100%)", border: "1px solid #f59e0b25", borderRadius: "16px", padding: "64px 40px", textAlign: "center" }}>
          <p style={{ color: "#f59e0b", fontSize: "12px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Ready to Start Earning?</p>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, marginBottom: "16px", maxWidth: "520px", margin: "0 auto 16px" }}>Your network already has value. Start monetising it.</h2>
          <p style={{ color: "#9ca3af", fontSize: "15px", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.7 }}>Applications are reviewed within 48 hours. Onboarding takes less than a day. You could be earning by next week.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/get-started" style={{ background: "#f59e0b", color: "#000", padding: "16px 40px", borderRadius: "10px", fontWeight: 800, fontSize: "15px", textDecoration: "none", boxShadow: "0 0 32px rgba(245,158,11,0.25)" }}>Apply Now</a>
            <a href="/contact" style={{ background: "transparent", color: "#f5f5f5", padding: "16px 32px", borderRadius: "10px", fontWeight: 600, fontSize: "15px", textDecoration: "none", border: "1px solid #2a2a2a" }}>Ask a Question</a>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}