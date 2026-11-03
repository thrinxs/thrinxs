"use client";
import { useState } from "react";
import Link from "next/link";

const PORTALS = [
  {
    label: "Client Portal",
    desc: "Track your project, invoices, and deliverables.",
    href: "https://clients.thrinxs.com.ng",
    color: "#10b981",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    ),
  },
  {
    label: "Sales Rep Portal",
    desc: "Track your commissions, referrals, and performance.",
    href: "https://reps.thrinxs.com.ng",
    color: "#3b82f6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
  },
  {
    label: "Affiliate Portal",
    desc: "Track your referrals, earnings, and Friday payouts.",
    href: "https://affiliates.thrinxs.com.ng",
    color: "#a78bfa",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
  },
  {
    label: "Staff Portal",
    desc: "Manage client projects, deliverables, and the Thrinxs site.",
    href: "https://staff.thrinxs.com.ng",
    color: "#f97316",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
    ),
  },
  {
    label: "Admin",
    desc: "Platform administration — restricted to authorised personnel.",
    href: "https://admin.thrinxs.com.ng",
    color: "#f59e0b",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
  },
];

export default function LoginPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px" }}>

      {/* Background glow */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 40 }}>
          <img src="/logo.png" alt="Thrinxs" style={{ height: 36, width: "auto" }} />
          <span style={{ fontSize: 20, fontWeight: 900, color: "#f59e0b", letterSpacing: "-0.5px" }}>Thrinxs</span>
        </Link>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>
          Who are you logging in as?
        </h1>
        <p style={{ color: "#555", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>
          Select your portal to continue. Each portal has its own login page.
        </p>
      </div>

      {/* Portal cards */}
      <div style={{ width: "100%", maxWidth: 640, display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }}>
        {PORTALS.map(portal => {
          const isHovered = hovered === portal.label;
          return (
            <a
              key={portal.label}
              href={portal.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(portal.label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex", alignItems: "center", gap: 20,
                padding: "22px 28px",
                borderRadius: 16,
                background: isHovered ? `${portal.color}0d` : "#0d0d0d",
                border: `1px solid ${isHovered ? portal.color + "40" : "#1a1a1a"}`,
                textDecoration: "none",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              {/* Icon */}
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${portal.color}15`, border: `1px solid ${portal.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: portal.color, flexShrink: 0, transition: "all 0.2s" }}>
                {portal.icon}
              </div>
              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: isHovered ? "#fff" : "#e5e5e5", marginBottom: 4, transition: "color 0.2s" }}>{portal.label}</p>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{portal.desc}</p>
              </div>
              {/* Arrow */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isHovered ? portal.color : "#333"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "stroke 0.2s, transform 0.2s", transform: isHovered ? "translateX(3px)" : "translateX(0)" }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <p style={{ color: "#333", fontSize: 12, marginTop: 48, textAlign: "center", position: "relative", zIndex: 1 }}>
        Not a member yet?{" "}
        <Link href="/get-started" style={{ color: "#f59e0b", fontWeight: 600, textDecoration: "none" }}>Get started with Thrinxs →</Link>
      </p>
    </div>
  );
}