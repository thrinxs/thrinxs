"use client";

import { useState } from "react";

const levels = [
  { name: "Intern",    base: "10%", bonus: "15%", target: "$5,000/mo",  color: "#60a5fa" },
  { name: "Junior",   base: "15%", bonus: "20%", target: "$12,500/mo", color: "#a78bfa" },
  { name: "Associate",base: "20%", bonus: "25%", target: "$25,000/mo", color: "#f59e0b" },
  { name: "Senior",   base: "30%", bonus: "35%", target: "$40,000/mo", color: "#4ade80" },
];

const STYLES = `
  @media (max-width: 768px) {
    .srb-grid { grid-template-columns: 1fr !important; }
    .srb-levels { grid-template-columns: 1fr 1fr !important; }
    .srb-heading { font-size: 28px !important; }
  }
  @media (max-width: 480px) {
    .srb-levels { grid-template-columns: 1fr !important; }
  }
`;

export default function SalesRepBanner() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{
      background: "linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)",
      padding: "100px 0 120px", position: "relative", overflow: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* 2-col layout */}
        <div className="srb-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}>

          {/* LEFT */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: "999px", padding: "6px 18px", marginBottom: "20px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
              <span style={{ color: "#f59e0b", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                Join the Team
              </span>
            </div>

            <h2 className="srb-heading" style={{
              fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "#ffffff",
              letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 20px",
            }}>
              Earn Up to{" "}
              <span style={{ background: "linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                35% Commission
              </span>{" "}
              as a Thrinxs Sales Rep
            </h2>

            <p style={{ color: "#9ca3af", fontSize: "16px", lineHeight: 1.75, marginBottom: "28px" }}>
              We're building a network of high-performing sales reps across Nigeria and globally.
              No ceiling on earnings. The more you close, the more you earn — and the faster you grow.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column" as const, gap: "12px" }}>
              {[
                "Start as an Intern — fast-track based on performance",
                "Referral tracking dashboard + live commission reports",
                "Earn above-target bonuses (extra +5% when you exceed your monthly goal)",
                "Apply via website or LinkedIn — same invite system",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "#f59e0b", fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>✦</span>
                  <span style={{ color: "#d1d5db", fontSize: "15px", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "12px" }}>
              <a href="/sales-rep-program" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#000", fontWeight: 700, fontSize: "15px",
                padding: "13px 28px", borderRadius: "10px", textDecoration: "none",
                boxShadow: "0 0 32px rgba(245,158,11,0.3)", letterSpacing: "0.02em",
              }}>
                Apply Now
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="/sales-rep-program#how-it-works" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "transparent", color: "#f59e0b", fontWeight: 600, fontSize: "15px",
                padding: "13px 24px", borderRadius: "10px", textDecoration: "none",
                border: "1px solid rgba(245,158,11,0.35)",
              }}>
                Learn More
              </a>
            </div>
          </div>

          {/* RIGHT — level cards */}
          <div>
            <p style={{ color: "#6b7280", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "16px" }}>
              Commission Structure
            </p>
            <div className="srb-levels" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {levels.map((lv, i) => {
                const isH = hovered === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      borderRadius: "16px",
                      border: `1px solid ${isH ? lv.color + "66" : "rgba(255,255,255,0.07)"}`,
                      background: isH ? `rgba(${lv.color === "#f59e0b" ? "245,158,11" : lv.color === "#4ade80" ? "74,222,128" : lv.color === "#60a5fa" ? "96,165,250" : "167,139,250"},0.07)` : "rgba(18,18,18,0.9)",
                      padding: "20px 18px",
                      transition: "all 0.3s ease",
                      transform: isH ? "translateY(-3px)" : "translateY(0)",
                      boxShadow: isH ? `0 12px 32px ${lv.color}22` : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: lv.color, flexShrink: 0 }} />
                      <span style={{ color: "#ffffff", fontSize: "14px", fontWeight: 700 }}>{lv.name}</span>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <span style={{ color: lv.color, fontSize: "26px", fontWeight: 800 }}>{lv.base}</span>
                      <span style={{ color: "#6b7280", fontSize: "12px" }}> base</span>
                    </div>
                    <div style={{ color: "#9ca3af", fontSize: "12px", marginBottom: "10px" }}>
                      <span style={{ color: lv.color, fontWeight: 600 }}>{lv.bonus}</span> above target
                    </div>
                    <div style={{
                      background: "rgba(255,255,255,0.04)", borderRadius: "8px",
                      padding: "6px 10px", fontSize: "12px", color: "#6b7280",
                    }}>
                      Target: <span style={{ color: "#d1d5db", fontWeight: 600 }}>{lv.target}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ color: "#4b5563", fontSize: "12px", marginTop: "14px", lineHeight: 1.6 }}>
              Everyone starts as Intern. Placement to Junior or Associate after 2-month evaluation based on revenue generated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
