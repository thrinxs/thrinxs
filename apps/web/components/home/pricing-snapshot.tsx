"use client";
import { useState, useEffect } from "react";

type Region = "ng" | "intl";

const PROMO_END = "December 31, 2026";

const PLANS = [
  {
    name: "Landing Page",
    desc: "A fast, focused single-page site built to convert visitors into leads or customers.",
    promoNg: 125000, stdNg: 150000,
    promoIntl: 100, stdIntl: 500,
    features: ["Responsive design", "Contact form", "SEO setup", "WhatsApp CTA"],
    highlight: false,
    custom: false,
  },
  {
    name: "Business Website",
    desc: "A multi-page professional website for established businesses ready to grow online.",
    promoNg: 280000, stdNg: 300000,
    promoIntl: 250, stdIntl: 2500,
    features: ["Up to 8 pages", "Blog setup", "Google Analytics", "SEO optimised"],
    highlight: false,
    custom: false,
  },
  {
    name: "Website + Payments",
    desc: "Full business website with integrated payment flows for selling online.",
    promoNg: 350000, stdNg: 500000,
    promoIntl: 500, stdIntl: 4000,
    features: ["Everything in Business", "Paystack / Stripe", "Order management", "Invoicing"],
    highlight: true,
    custom: false,
  },
  {
    name: "Website + User Accounts",
    desc: "A complete web platform where users can register, log in, and manage profiles.",
    promoNg: 550000, stdNg: 850000,
    promoIntl: 1250, stdIntl: 6000,
    features: ["Everything in Payments", "User registration & login", "Profile dashboards", "Role-based access"],
    highlight: false,
    custom: false,
  },
  {
    name: "SaaS / Enterprise",
    desc: "Full-scale SaaS platforms, enterprise systems, and complex multi-tenant applications.",
    promoNg: 1500000, stdNg: 0,
    promoIntl: 2500, stdIntl: 0,
    features: ["Custom architecture", "Multi-tenant system", "API & integrations", "Dedicated support"],
    highlight: false,
    custom: true,
  },
];

const STYLES = [
  ".ps-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; align-items: start; }",
  "@media screen and (max-width: 1200px) { .ps-grid { grid-template-columns: repeat(3, 1fr); } }",
  "@media screen and (max-width: 760px) { .ps-grid { grid-template-columns: 1fr 1fr; } }",
  "@media screen and (max-width: 480px) { .ps-grid { grid-template-columns: 1fr; } }",
  ".ps-cta:hover { opacity: 0.82 !important; }",
  ".ps-switch { background: none; border: none; color: #f59e0b; font-weight: 700; cursor: pointer; font-size: 13px; text-decoration: underline; padding: 0; }",
].join(" ");

export default function PricingSnapshot() {
  const [region, setRegion] = useState<Region>("intl");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(d => { setRegion(d?.country_code === "NG" ? "ng" : "intl"); })
      .catch(() => setRegion("intl"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)", padding: "100px 0 120px", position: "relative", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 999, padding: "6px 18px", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ color: "#f59e0b", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Pricing</span>
          </div>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" }}>
            Simple,{" "}
            <span style={{ background: "linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Transparent</span>{" "}
            Pricing
          </h2>
          <p style={{ color: "#9ca3af", fontSize: 17, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7 }}>Website development pricing — promo rates live now through {PROMO_END}.</p>
          {!loading && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 999, padding: "7px 18px" }}>
              <span style={{ color: "#d1d5db", fontSize: 13 }}>
                Showing{" "}<span style={{ color: "#f59e0b", fontWeight: 700 }}>{region === "ng" ? "Nigerian (₦)" : "International ($)"}</span>{" "}prices —{" "}
                <button className="ps-switch" onClick={() => setRegion(region === "ng" ? "intl" : "ng")}>Switch region</button>
              </span>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="ps-grid">
          {PLANS.map((plan, i) => {
            const promo = region === "ng" ? plan.promoNg : plan.promoIntl;
            const std = region === "ng" ? plan.stdNg : plan.stdIntl;
            const sym = region === "ng" ? "₦" : "$";
            const promoLabel = plan.custom ? sym + promo.toLocaleString() + " promo" : sym + promo.toLocaleString();
            const stdLabel = plan.custom && std === 0 ? "Custom" : sym + std.toLocaleString();
            return (
              <div key={i} style={{ borderRadius: 20, border: `1px solid ${plan.highlight ? "rgba(245,158,11,0.5)" : "rgba(245,158,11,0.12)"}`, background: plan.highlight ? "linear-gradient(145deg, rgba(25,20,5,0.98), rgba(18,14,4,0.98))" : "linear-gradient(145deg, rgba(18,18,18,0.95), rgba(12,12,12,0.95))", padding: "24px 20px", position: "relative", overflow: "hidden", boxShadow: plan.highlight ? "0 0 60px rgba(245,158,11,0.15)" : "0 4px 24px rgba(0,0,0,0.4)" }}>
                {plan.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #f59e0b, transparent)" }} />}
                {plan.highlight && <div style={{ display: "inline-block", marginBottom: 10, background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.45)", borderRadius: 999, padding: "3px 12px", fontSize: 10, fontWeight: 700, color: "#f59e0b", letterSpacing: "0.07em", textTransform: "uppercase" as const }}>Most Popular</div>}
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{plan.name}</h3>
                <p style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.6, marginBottom: 16, minHeight: 48 }}>{plan.desc}</p>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: "#4b5563", fontSize: 13, textDecoration: "line-through" }}>{stdLabel}</span>
                    <span style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, padding: "1px 6px", fontSize: 10, color: "#6b7280" }}>standard</span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, background: "linear-gradient(90deg, #f59e0b, #fcd34d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>{promoLabel}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 999, padding: "2px 10px", fontSize: 10, fontWeight: 700, color: "#4ade80" }}>PROMO</div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column" as const, gap: 7 }}>
                  {plan.features.map((f, fi) => (
                    <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: "#f59e0b", fontSize: 11, marginTop: 3, flexShrink: 0 }}>✖</span>
                      <span style={{ color: "#d1d5db", fontSize: 12, lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="/get-started" className="ps-cta" style={{ display: "block", textAlign: "center", background: plan.highlight ? "linear-gradient(135deg, #f59e0b, #d97706)" : "transparent", color: plan.highlight ? "#000" : "#f59e0b", border: plan.highlight ? "none" : "1px solid rgba(245,158,11,0.35)", fontWeight: 700, fontSize: 13, padding: "11px 16px", borderRadius: 10, textDecoration: "none", transition: "opacity 0.2s ease" }}>Get Started</a>
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: "center", color: "#4b5563", fontSize: 13, marginTop: 40, lineHeight: 1.7 }}>
          Website development prices only. See all services on the{" "}
          <a href="/pricing" style={{ color: "#f59e0b", fontWeight: 600, textDecoration: "none" }}>Pricing page →</a>
        </p>
      </div>
    </section>
  );
}