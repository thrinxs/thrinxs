"use client";
import { useState, useEffect } from "react";

type Region = "ng" | "intl";

const PROMO_END = "December 31, 2026";

const WEB_TIERS = [
  {
    name: "Landing Page",
    desc: "A fast, focused single-page site built to convert visitors into leads or customers.",
    duration: "1–2 weeks",
    promoNg: 125000, standardNg: 150000,
    promoIntl: 100, standardIntl: 500,
    features: ["Responsive design", "Contact form", "SEO setup", "WhatsApp CTA", "1 revision round"],
    custom: false,
  },
  {
    name: "Business Website",
    desc: "A multi-page professional website for established businesses ready to grow online.",
    duration: "3–5 weeks",
    promoNg: 280000, standardNg: 300000,
    promoIntl: 250, standardIntl: 2500,
    features: ["Up to 8 pages", "Blog setup", "Google Analytics", "Contact & enquiry forms", "SEO optimised", "2 revision rounds"],
    custom: false,
  },
  {
    name: "Website + Payment Processing",
    desc: "A full business website with integrated payment flows for selling products or services online.",
    duration: "4–6 weeks",
    promoNg: 350000, standardNg: 500000,
    promoIntl: 500, standardIntl: 4000,
    features: ["Everything in Business", "Paystack / Stripe integration", "Order management", "Invoice generation", "Payment confirmation emails", "3 revision rounds"],
    highlight: true,
    custom: false,
  },
  {
    name: "Website + User Accounts & Profiles",
    desc: "A complete web platform where users can register, log in, and manage personalised profiles.",
    duration: "6–10 weeks",
    promoNg: 550000, standardNg: 850000,
    promoIntl: 1250, standardIntl: 6000,
    features: ["Everything in Payment tier", "User registration & login", "Profile dashboards", "Role-based access", "Account management", "Custom permissions"],
    custom: false,
  },
  {
    name: "SaaS / Enterprise",
    desc: "Full-scale SaaS platforms, enterprise systems, and complex multi-tenant applications.",
    duration: "12+ weeks",
    promoNg: 1500000, standardNg: 0,
    promoIntl: 2500, standardIntl: 0,
    features: ["Full custom architecture", "Multi-tenant system", "API & integrations", "AI features", "Dedicated support", "Scalable infrastructure"],
    custom: true,
  },
];

const OTHER_SERVICES = [
  {
    category: "SEO",
    color: "#10b981",
    items: [
      { name: "On-Page SEO", ng: "₦80,000/mo", intl: "$400/mo" },
      { name: "Off-Page SEO", ng: "₦120,000/mo", intl: "$600/mo" },
      { name: "Technical SEO", ng: "₦150,000/mo", intl: "$700/mo" },
      { name: "Local SEO", ng: "₦80,000/mo", intl: "$350/mo" },
      { name: "Starter Bundle", ng: "₦150,000/mo", intl: "$700/mo" },
      { name: "Growth Bundle", ng: "₦300,000/mo", intl: "$1,500/mo" },
      { name: "Full Domination", ng: "₦500,000/mo", intl: "$2,500/mo" },
    ],
  },
  {
    category: "Social Media",
    color: "#3b82f6",
    items: [
      { name: "Profile Setup", ng: "₦75,000", intl: "$400" },
      { name: "Growth", ng: "₦100,000/mo", intl: "$500/mo" },
      { name: "Content Creation", ng: "₦150,000/mo", intl: "$800/mo" },
      { name: "Content Pro", ng: "₦300,000/mo", intl: "$1,500/mo" },
      { name: "Full Management", ng: "₦400,000/mo", intl: "$2,000/mo" },
    ],
  },
  {
    category: "Paid Advertising",
    color: "#3b82f6",
    items: [
      { name: "Single Campaign", ng: "₦50,000", intl: "$300" },
      { name: "Social Starter", ng: "₦100,000/mo", intl: "$500/mo" },
      { name: "Social Growth", ng: "₦200,000/mo", intl: "$1,000/mo" },
      { name: "Google Starter", ng: "₦100,000/mo", intl: "$500/mo" },
      { name: "Google Growth", ng: "₦200,000/mo", intl: "$1,000/mo" },
      { name: "Full Bundle", ng: "₦300,000/mo", intl: "$1,500/mo" },
    ],
  },
  {
    category: "Brand Identity",
    color: "#ec4899",
    items: [
      { name: "Logo Design", ng: "₦75,000", intl: "$300" },
      { name: "Full Brand Kit", ng: "₦150,000", intl: "$600" },
    ],
  },
  {
    category: "Google Business",
    color: "#10b981",
    items: [
      { name: "Setup", ng: "₦50,000", intl: "$300" },
      { name: "Monthly Management", ng: "₦30,000/mo", intl: "$200/mo" },
    ],
  },
  {
    category: "Training",
    color: "#f97316",
    items: [
      { name: "Group Workshop", ng: "₦50,000/person", intl: "$200/person" },
      { name: "1-on-1 Coaching", ng: "₦100,000/mo", intl: "$500/mo" },
      { name: "Team Programme", ng: "₦300,000", intl: "$1,500" },
    ],
  },
  {
    category: "Affiliate Systems",
    color: "#f97316",
    items: [
      { name: "Basic", ng: "₦500,000", intl: "$2,500" },
      { name: "Advanced", ng: "₦1,000,000", intl: "$5,000" },
    ],
  },
  {
    category: "Strategy & Consultation",
    color: "#a78bfa",
    items: [
      { name: "Free Discovery Call", ng: "Free", intl: "Free" },
      { name: "Full Strategy", ng: "Custom", intl: "Custom" },
    ],
  },
];

const BUNDLES = [
  { name: "Digital Starter", ng: "₦600,000", intl: "$3,200", desc: "Landing page + SEO starter + social media setup" },
  { name: "Growth Package", ng: "₦1,700,000", intl: "$9,000", desc: "Business website + SEO growth + paid ads + brand kit" },
  { name: "Full Digital Presence", ng: "₦3,000,000", intl: "$16,000", desc: "Full website + payments + SEO + social + ads + strategy" },
  { name: "Enterprise Domination", ng: "₦7,000,000+", intl: "$35,000+", desc: "Complete enterprise platform + all services + dedicated team" },
];

function fmt(amount: number, region: Region): string {
  if (region === "ng") return "₦" + amount.toLocaleString();
  return "$" + amount.toLocaleString();
}

export default function PricingPage() {
  const [region, setRegion] = useState<Region>("intl");
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(d => {
        if (d.country_code === "NG") setRegion("ng");
        setDetected(true);
      })
      .catch(() => setDetected(true));
  }, []);

  const inp: React.CSSProperties = { cursor: "pointer", padding: "8px 20px", borderRadius: 8, border: "1px solid", fontSize: 13, fontWeight: 600, transition: "all 0.2s" };

  return (
    <main style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "inherit" }}>

      {/* PROMO BANNER */}
      <div style={{ background: "#f59e0b", color: "#000", textAlign: "center", padding: "10px 24px", fontSize: 14, fontWeight: 700 }}>
        Promo prices active — ends {PROMO_END}. Lock in your rate before it’s gone.
      </div>

      {/* HERO */}
      <section style={{ padding: "100px 24px 60px", textAlign: "center", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Pricing</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.15, maxWidth: 700, margin: "0 auto 24px" }}>
          Transparent Pricing.<br /><span style={{ color: "#f59e0b" }}>No Hidden Fees.</span>
        </h1>
        <p style={{ color: "#888", fontSize: 17, maxWidth: 560, margin: "0 auto 40px" }}>Every price is listed. Every scope is clear. Pick what your business needs and get started today.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setRegion("ng")} style={{ ...inp, borderColor: region === "ng" ? "#f59e0b" : "#2a2a2a", background: region === "ng" ? "#f59e0b" : "transparent", color: region === "ng" ? "#000" : "#888" }}>₦ Nigeria (NGN)</button>
          <button onClick={() => setRegion("intl")} style={{ ...inp, borderColor: region === "intl" ? "#f59e0b" : "#2a2a2a", background: region === "intl" ? "#f59e0b" : "transparent", color: region === "intl" ? "#000" : "#888" }}>$ International (USD)</button>
        </div>
        {detected && <p style={{ color: "#555", fontSize: 12, marginTop: 12 }}>Showing prices for {region === "ng" ? "Nigeria" : "International"}. Click to switch.</p>}
      </section>

      {/* WEBSITE DEVELOPMENT TIERS */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
          <div>
            <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Website Development</p>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700 }}>Choose Your Website Tier</h2>
          </div>
          <div style={{ background: "#1a1a1a", border: "1px solid #f59e0b", borderRadius: 10, padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
            <span style={{ color: "#f59e0b", fontSize: 13, fontWeight: 600 }}>Promo ends {PROMO_END}</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {WEB_TIERS.map(tier => {
            const promoPrice = region === "ng" ? tier.promoNg : tier.promoIntl;
            const stdPrice = region === "ng" ? tier.standardNg : tier.standardIntl;
            const currency = region === "ng" ? "₦" : "$";
            return (
              <div key={tier.name} style={{ background: tier.highlight ? "#0f0a00" : "#111", border: "1px solid", borderColor: tier.highlight ? "#f59e0b" : "#1f1f1f", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
                {tier.highlight && (
                  <div style={{ position: "absolute", top: -12, left: 24, background: "#f59e0b", color: "#000", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>MOST POPULAR</div>
                )}
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{tier.name}</h3>
                  <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6 }}>{tier.desc}</p>
                </div>
                <div>
                  {tier.custom && stdPrice === 0 ? (
                    <p style={{ color: "#555", fontSize: 14, textDecoration: "line-through", marginBottom: 2 }}>Custom pricing</p>
                  ) : (
                    <p style={{ color: "#555", fontSize: 14, textDecoration: "line-through", marginBottom: 2 }}>{currency}{stdPrice.toLocaleString()}</p>
                  )}
                  <p style={{ fontSize: 30, fontWeight: 800, color: "#f59e0b", lineHeight: 1 }}>{currency}{promoPrice.toLocaleString()}</p>
                  <p style={{ color: "#f59e0b", fontSize: 11, fontWeight: 600, marginTop: 4 }}>PROMO — ends {PROMO_END}</p>
                  <p style={{ color: "#555", fontSize: 12, marginTop: 4 }}>{tier.duration}</p>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, flexGrow: 1 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#ccc" }}>
                      <span style={{ color: "#f59e0b", flexShrink: 0, marginTop: 1 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="/get-started" style={{ display: "block", padding: "12px", borderRadius: 10, background: tier.highlight ? "#f59e0b" : "transparent", border: "1px solid", borderColor: tier.highlight ? "#f59e0b" : "#2a2a2a", color: tier.highlight ? "#000" : "#f59e0b", textAlign: "center", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  Get Started →
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>All Services</p>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 48 }}>Everything Else We Offer</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {OTHER_SERVICES.map(group => (
              <div key={group.category} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14, padding: "24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: group.color, marginBottom: 20 }}>{group.category}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {group.items.map(item => (
                    <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #1a1a1a" }}>
                      <span style={{ color: "#ccc", fontSize: 13 }}>{item.name}</span>
                      <span style={{ color: "#f59e0b", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", marginLeft: 12 }}>{region === "ng" ? item.ng : item.intl}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Bundles</p>
        <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 48 }}>Save More With a Bundle</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {BUNDLES.map(bundle => (
            <div key={bundle.name} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14, padding: "28px 24px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{bundle.name}</h3>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{bundle.desc}</p>
              <p style={{ fontSize: 26, fontWeight: 800, color: "#f59e0b" }}>{region === "ng" ? bundle.ng : bundle.intl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 16 }}>Not Sure What You Need?</h2>
        <p style={{ color: "#888", fontSize: 16, marginBottom: 36 }}>Book a free discovery call and we’ll help you figure out the right plan for your business.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/get-started" style={{ display: "inline-block", padding: "16px 36px", borderRadius: 10, background: "#f59e0b", color: "#000", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>Get Started</a>
          <a href="/contact" style={{ display: "inline-block", padding: "16px 36px", borderRadius: 10, background: "transparent", border: "1px solid #f59e0b", color: "#f59e0b", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>Talk to Us</a>
        </div>
      </section>
    </main>
  );
}