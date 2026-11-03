"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const PROJECT = {
  name: "Dr. Josh Therapy Centre",
  category: "Healthcare / SaaS Platform",
  year: "2023",
  logo: "/images/logos/dr-josh.png",
  color: "#0891b2",
  slug: "dr-josh-therapy-centre",
  metrics: [
    { label: "Clients Served", value: "1,000+" },
    { label: "Brand Verticals", value: "4" },
    { label: "Founded", value: "2020" },
    { label: "City", value: "Port Harcourt" },
  ],
  deliverables: [
    "Full-Stack Web Platform",
    "Four Brand Verticals",
    "Paystack Payment Integration",
    "Booking & Scheduling Flow",
    "UI/UX Design System",
    "SEO & Visibility Strategy",
  ],
};

const NOTE_QUOTE = "I built Dr. Josh Therapy Centre's platform the same way I'd build it for any client — with the same level of care, architecture, and attention to detail. I mapped out every user flow, every page, every design decision before writing a single line of code. The goal was a platform our brand could genuinely scale on. Four brand verticals, one seamless experience, Paystack-integrated payments, and 1,000+ clients served. This is the standard we hold ourselves to — and it's the same standard we bring to every project we take on.";
const NOTE_AUTHOR = "Baridubari Joshua Joe-Amos";
const NOTE_TITLE = "Founder & CEO, Thrinxs — Founder, Dr. Josh Therapy Centre";
const NOTE_PHOTO = "/images/team/josh.jpg";

export default function CaseStudy() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} style={{ background: "#080808", borderTop: "1px solid #1a1a1a", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 60, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <p style={{ color: "#f59e0b", fontSize: 12, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>Featured Project</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15, maxWidth: 680, marginBottom: 16 }}>
            Proof in the Work, <span style={{ color: "#f59e0b" }}>Not Just the Pitch.</span>
          </h2>
          <p style={{ color: "#888", fontSize: 16, maxWidth: 560, lineHeight: 1.8 }}>Here's one of the platforms we've built — from architecture to launch.</p>
        </div>
        <div style={{ background: "#0d0d0d", border: `1px solid ${PROJECT.color}30`, borderRadius: 20, overflow: "hidden", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s" }}>
          <div style={{ height: 4, background: `linear-gradient(90deg, ${PROJECT.color}, ${PROJECT.color}60)` }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 0 }}>
            <div style={{ padding: "48px 40px", borderRight: "1px solid #1a1a1a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: "#111", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                  <Image src={PROJECT.logo} alt={PROJECT.name} fill style={{ objectFit: "contain" }} unoptimized />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 2 }}>{PROJECT.name}</p>
                  <p style={{ color: "#555", fontSize: 13 }}>{PROJECT.category}</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
                {PROJECT.metrics.map(m => (
                  <div key={m.label} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 10, padding: "16px 18px" }}>
                    <p style={{ fontSize: 22, fontWeight: 900, color: PROJECT.color, marginBottom: 4, lineHeight: 1 }}>{m.value}</p>
                    <p style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "1.5px" }}>{m.label}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>What We Built</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PROJECT.deliverables.map(d => (
                  <span key={d} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 6, padding: "6px 12px", fontSize: 12, color: "#aaa" }}>{d}</span>
                ))}
              </div>
            </div>
            <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }} />
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", letterSpacing: "2.5px", textTransform: "uppercase" }}>Founder's Note</p>
                </div>
                <p style={{ fontSize: 15, color: "#aaa", lineHeight: 1.85, marginBottom: 36, fontStyle: "italic" }}>
                  &#8220;{NOTE_QUOTE}&#8221;
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: "2px solid #f59e0b", position: "relative", flexShrink: 0 }}>
                  <Image src={NOTE_PHOTO} alt={NOTE_AUTHOR} fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#f5f5f5", marginBottom: 3 }}>{NOTE_AUTHOR}</p>
                  <p style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{NOTE_TITLE}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginTop: 40, opacity: visible ? 1 : 0, transition: "opacity 0.9s ease 0.4s" }}>
          <p style={{ color: "#555", fontSize: 14 }}>This is one project. <span style={{ color: "#888" }}>See the full portfolio for more.</span></p>
          <Link href="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#f59e0b", fontSize: 14, fontWeight: 700, textDecoration: "none", border: "1px solid #f59e0b30", borderRadius: 8, padding: "10px 20px", background: "#f59e0b0a" }}>
            View Full Portfolio
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}