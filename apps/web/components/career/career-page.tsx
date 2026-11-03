"use client";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const LEVELS = [
  { title: "Intern", base: "10%", above: "15%", target: "$5,000 / mo", atTarget: "$500 / mo", ramp: "M1: $2,500 → M2: $3,500 → M3+: $5,000" },
  { title: "Junior", base: "15%", above: "20%", target: "$12,500 / mo", atTarget: "$1,875 / mo", ramp: "M1: $7,500 → M2: $10,000 → M3+: $12,500" },
  { title: "Associate", base: "20%", above: "25%", target: "$25,000 / mo", atTarget: "$5,000 / mo", ramp: "" },
  { title: "Senior", base: "30%", above: "35%", target: "$40,000 / mo", atTarget: "$12,000 / mo", ramp: "" },
];

const EVAL_ROWS = [
  { range: "Under $5,000", outcome: "Stays Intern", note: "Coaching + 1 additional month or exit" },
  { range: "$5,000 – $14,999", outcome: "Confirmed Intern", note: "Continue at Intern level" },
  { range: "$15,000 – $29,999", outcome: "Fast-tracked to Junior", note: "Promoted immediately" },
  { range: "$30,000+", outcome: "Fast-tracked to Associate", note: "Promoted immediately" },
];

type FormState = { name: string; email: string; phone: string; level: string; message: string };

export default function CareerPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", level: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [activeLevel, setActiveLevel] = useState(0);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/career", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch { setStatus("error"); }
  }

  const inp: React.CSSProperties = { width: "100%", padding: "12px 16px", borderRadius: 8, background: "#111", border: "1px solid #2a2a2a", color: "#fff", fontSize: 15, outline: "none" };

  return (
    <>
      <Navbar />
      <main style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "inherit" }}>

        <section style={{ padding: "120px 24px 80px", textAlign: "center", borderBottom: "1px solid #1a1a1a" }}>
          <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Join the Team</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.15, maxWidth: 720, margin: "0 auto 24px" }}>
            Business Development<br /><span style={{ color: "#f59e0b" }}>Partner Programme</span>
          </h1>
          <p style={{ color: "#888", fontSize: 18, maxWidth: 600, margin: "0 auto" }}>Commission-based. Performance-driven. Remote-friendly. Grow with us — and grow your income.</p>
        </section>

        <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 16 }}>What You'll Do</h2>
          <p style={{ color: "#aaa", lineHeight: 1.8, fontSize: 16, maxWidth: 720 }}>As a Business Development Partner at Thrinxs, you'll identify leads, pitch our digital services, close deals, and manage client relationships. You earn a commission on every sale you bring in — with no cap on what you can earn.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 40 }}>
            {["Identify and qualify leads", "Pitch Thrinxs services", "Close deals and manage clients", "Earn uncapped commission", "Work remotely, on your schedule", "Grow to Senior level over time"].map(item => (
              <div key={item} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ color: "#f59e0b", fontWeight: 700, marginTop: 2, flexShrink: 0 }}>✓</span>
                <span style={{ color: "#ccc", fontSize: 14, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "80px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 8 }}>Commission Structure</h2>
            <p style={{ color: "#888", marginBottom: 40, fontSize: 15 }}>Four levels. Earn more as you grow. Promotion is based on hitting your target 3 consecutive months.</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
              {LEVELS.map((lv, i) => (
                <button key={lv.title} onClick={() => setActiveLevel(i)} style={{ padding: "10px 24px", borderRadius: 8, border: "1px solid", borderColor: activeLevel === i ? "#f59e0b" : "#2a2a2a", background: activeLevel === i ? "#f59e0b" : "transparent", color: activeLevel === i ? "#000" : "#888", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>{lv.title}</button>
              ))}
            </div>
            {LEVELS.map((lv, i) => i === activeLevel && (
              <div key={lv.title} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 16, padding: "36px 32px" }}>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f59e0b", marginBottom: 8 }}>{lv.title}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, marginTop: 24 }}>
                  <div><p style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Base Commission</p><p style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>{lv.base}</p></div>
                  <div><p style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Above Target</p><p style={{ color: "#f59e0b", fontSize: 28, fontWeight: 800 }}>{lv.above}</p></div>
                  <div><p style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Monthly Target</p><p style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>{lv.target}</p></div>
                  <div><p style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>At-Target Earnings</p><p style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>{lv.atTarget}</p></div>
                </div>
                {lv.ramp && (<div style={{ marginTop: 28, padding: "16px 20px", background: "#0d0d0d", borderRadius: 10, border: "1px solid #1f1f1f" }}><p style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Ramp Period</p><p style={{ color: "#ccc", fontSize: 15 }}>{lv.ramp}</p></div>)}
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 8 }}>2-Month Evaluation</h2>
          <p style={{ color: "#888", marginBottom: 40, fontSize: 15 }}>At the end of your first 2 months, your placement is determined by your total revenue generated.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
              <thead><tr style={{ borderBottom: "1px solid #2a2a2a" }}>
                <th style={{ textAlign: "left", padding: "12px 16px", color: "#f59e0b", fontWeight: 600, whiteSpace: "nowrap" }}>Revenue Generated</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: "#f59e0b", fontWeight: 600, whiteSpace: "nowrap" }}>Placement</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: "#f59e0b", fontWeight: 600 }}>Note</th>
              </tr></thead>
              <tbody>
                {EVAL_ROWS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a", background: i % 2 === 0 ? "#0d0d0d" : "transparent" }}>
                    <td style={{ padding: "14px 16px", color: "#fff", whiteSpace: "nowrap", fontWeight: 600 }}>{row.range}</td>
                    <td style={{ padding: "14px 16px", color: "#f59e0b", whiteSpace: "nowrap" }}>{row.outcome}</td>
                    <td style={{ padding: "14px 16px", color: "#888" }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#555", fontSize: 13, marginTop: 20 }}>Promotion: hit your full target 3 consecutive months. Demotion: 3 consecutive misses.</p>
        </section>

        <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", padding: "80px 24px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 8 }}>Apply Now</h2>
            <p style={{ color: "#888", marginBottom: 40, fontSize: 15 }}>Fill in the form below and our team will get back to you within 2 business days.</p>
            {status === "sent" ? (
              <div style={{ background: "#111", border: "1px solid #f59e0b", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
                <p style={{ fontSize: 40, marginBottom: 16 }}>✓</p>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>Application Received</h3>
                <p style={{ color: "#888" }}>We'll review your application and reach out within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                  <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>Full Name *</label><input required style={inp} placeholder="e.g. John Doe" value={form.name} onChange={update("name")} /></div>
                  <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>Email Address *</label><input required type="email" style={inp} placeholder="you@example.com" value={form.email} onChange={update("email")} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                  <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>Phone Number *</label><input required style={inp} placeholder="+234 800 000 0000" value={form.phone} onChange={update("phone")} /></div>
                  <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>Level Applying For *</label>
                    <select required style={{ ...inp, appearance: "none" }} value={form.level} onChange={update("level")}>
                      <option value="">Select a level</option>
                      <option value="Intern">Intern</option>
                      <option value="Junior">Junior</option>
                      <option value="Associate">Associate</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>
                </div>
                <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>Why do you want to join Thrinxs? *</label><textarea required rows={5} style={{ ...inp, resize: "vertical" }} placeholder="Tell us about yourself, your sales experience, and what motivates you..." value={form.message} onChange={update("message")} /></div>
                {status === "error" && <p style={{ color: "#ef4444", fontSize: 14 }}>Something went wrong. Please try again or email info@thrinxs.com.ng.</p>}
                <button type="submit" disabled={status === "sending"} style={{ padding: "16px 40px", borderRadius: 10, background: status === "sending" ? "#78350f" : "#f59e0b", color: "#000", fontWeight: 700, fontSize: 16, border: "none", cursor: status === "sending" ? "not-allowed" : "pointer", alignSelf: "flex-start" }}>
                  {status === "sending" ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}