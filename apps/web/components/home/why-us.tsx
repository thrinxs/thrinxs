"use client";

import { useState } from "react";

const KEYFRAMES = `
  @keyframes wu-float {
    0%, 100% { transform: scale(1.12) translateY(0px); }
    50%       { transform: scale(1.12) translateY(-10px); }
  }
  @keyframes wu-icon-glow {
    0%, 100% { box-shadow: 0 0 14px 2px rgba(245,158,11,0.3), 0 0 0 2px rgba(245,158,11,0.15); }
    50%       { box-shadow: 0 0 28px 6px rgba(245,158,11,0.55), 0 0 0 2px rgba(245,158,11,0.35); }
  }
  @keyframes wu-border-pulse {
    0%, 100% { border-color: rgba(245,158,11,0.15); }
    50%       { border-color: rgba(245,158,11,0.4); }
  }
`;

const reasons = [
  {
    title: "Built to Perform",
    description:
      "Every site we ship scores 90+ on Google PageSpeed. Lightning-fast load times mean lower bounce rates and higher search rankings.",
    photo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=85&fit=crop&crop=center",
    stat: "90+ PageSpeed",
  },
  {
    title: "Mobile-First by Default",
    description:
      "Over 70% of web traffic is mobile. Every pixel of every project is designed on mobile first, then scaled up — never an afterthought.",
    photo: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=85&fit=crop&crop=center",
    stat: "100% Responsive",
  },
  {
    title: "Conversion-Focused Design",
    description:
      "Beautiful isn't enough. Every layout, CTA, and user flow is engineered around a single goal — turning visitors into paying customers.",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=85&fit=crop&crop=center",
    stat: "Results-Driven",
  },
  {
    title: "End-to-End Support",
    description:
      "We don't disappear after launch. From strategy to go-live to ongoing maintenance — you have a dedicated team in your corner, always.",
    photo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=85&fit=crop&crop=center",
    stat: "Always Available",
  },
];

export default function WhyUs() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)",
        padding: "100px 0 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* heading */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: "999px", padding: "6px 18px", marginBottom: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ color: "#f59e0b", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
              Why Thrinxs
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 800, color: "#ffffff",
            letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px",
          }}>
            Why Businesses Choose{" "}
            <span style={{ background: "linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Us Over the Rest
            </span>
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "18px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            We combine strategy, design, and engineering into one seamless team — so you never have to manage multiple agencies.
          </p>
        </div>

        {/* responsive grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
          gap: "24px",
        }}>
          {reasons.map((r, i) => {
            const isHovered = hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor: isHovered ? "rgba(245,158,11,0.45)" : "rgba(245,158,11,0.12)",
                  background: isHovered
                    ? "linear-gradient(145deg, rgba(20,20,20,0.98), rgba(15,12,5,0.98))"
                    : "linear-gradient(145deg, rgba(18,18,18,0.95), rgba(12,12,12,0.95))",
                  padding: "32px 24px 28px",
                  transition: "all 0.35s ease",
                  transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 24px 60px rgba(245,158,11,0.12), 0 0 0 1px rgba(245,158,11,0.2)"
                    : "0 4px 24px rgba(0,0,0,0.4)",
                  animation: "wu-border-pulse 4s ease-in-out infinite",
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                {/* giant faded bg photo */}
                <div style={{
                  position: "absolute", right: "-10px", bottom: "-10px",
                  width: "70%", height: "70%",
                  backgroundImage: `url(${r.photo})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  opacity: isHovered ? 0.22 : 0.12,
                  filter: isHovered ? "blur(0px) saturate(0.65)" : "blur(1.5px) saturate(0.35)",
                  borderRadius: "12px",
                  transition: "opacity 0.4s ease, filter 0.4s ease",
                  animation: "wu-float 8s ease-in-out infinite",
                  animationDelay: `${i * 0.6}s`,
                  pointerEvents: "none", zIndex: 0,
                }} />

                {/* gradient veil */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
                  background: "linear-gradient(135deg, rgba(12,12,12,0.93) 30%, rgba(12,12,12,0.6) 70%, rgba(12,12,12,0.25) 100%)",
                }} />

                {/* gold sweep on hover */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                  background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, transparent 60%)",
                  opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease",
                }} />

                {/* content */}
                <div style={{ position: "relative", zIndex: 2 }}>

                  {/* photo icon */}
                  <div style={{
                    width: "68px", height: "68px", borderRadius: "16px",
                    overflow: "hidden", marginBottom: "20px",
                    background: "rgba(8,8,8,0.85)",
                    border: "2px solid rgba(245,158,11,0.35)",
                    animation: "wu-icon-glow 3s ease-in-out infinite",
                    animationDelay: `${i * 0.5}s`,
                    position: "relative", flexShrink: 0,
                  }}>
                    <img
                      src={r.photo}
                      alt={r.title}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "contain", objectPosition: "center", display: "block",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        transition: "transform 0.4s ease",
                        filter: "saturate(0.85) brightness(0.9)",
                      }}
                    />
                    <div style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, transparent 60%)",
                    }} />
                  </div>

                  {/* stat badge */}
                  <div style={{
                    display: "inline-block",
                    background: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.25)",
                    borderRadius: "999px", padding: "2px 10px",
                    fontSize: "11px", fontWeight: 700, color: "#f59e0b",
                    letterSpacing: "0.06em", textTransform: "uppercase" as const,
                    marginBottom: "12px",
                  }}>{r.stat}</div>

                  <h3 style={{
                    fontSize: "18px", fontWeight: 700,
                    color: isHovered ? "#fcd34d" : "#ffffff",
                    letterSpacing: "-0.01em", marginBottom: "10px",
                    transition: "color 0.3s ease", lineHeight: 1.25,
                  }}>{r.title}</h3>

                  <p style={{
                    fontSize: "14px",
                    color: isHovered ? "#d1d5db" : "#6b7280",
                    lineHeight: 1.75, margin: 0,
                    transition: "color 0.3s ease",
                  }}>{r.description}</p>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
