"use client"

import { useState } from "react"
import Navbar from "../navbar"
import Footer from "../footer"

type Service = {
  title: string
  brief: string
  what: string
  result: string
  why: string
  timeline: string
  stages: string[]
  custom?: boolean
}

type Group = {
  id: string
  group: string
  color: string
  services: Service[]
}

const groups: Group[] = [
  {
    id: "fullstack",
    group: "Full-Stack Development",
    color: "#f59e0b",
    services: [
      {
        title: "Website & SaaS Development",
        brief: "Custom websites, business platforms, and fully bespoke SaaS products built to scale.",
        what: "We design and build fully custom web products — from sharp marketing sites to complex multi-tenant SaaS platforms, business portals, client dashboards, and internal tools. Every project is architected for performance, scalability, and long-term growth.",
        result: "A professionally engineered web product positions your brand as credible and trustworthy from first contact. Businesses report higher conversion rates, longer session times, and stronger close rates within weeks of launching a Thrinxs-built platform.",
        why: "Your website or web app is your most powerful business asset. A weak one costs you clients every single day. A strong one works for you around the clock — selling, onboarding, and retaining customers without you lifting a finger.",
        timeline: "Landing Page: 1–2 wks · Business Website: 3–4 wks · Business: 6–8 wks · SaaS / Enterprise: 12+ wks",
        stages: ["Discovery & Scoping", "UX & Design", "Development", "Content Integration", "Testing & QA", "Launch", "Handover & Support"],
      },
      {
        title: "Mobile App Development",
        brief: "Native and cross-platform iOS and Android applications built for performance and scale.",
        what: "We build polished mobile applications for iOS and Android — from consumer-facing apps to complex business tools. We handle everything from UI/UX design through to app store submission and post-launch maintenance.",
        result: "A branded mobile app dramatically increases customer retention, daily engagement, and brand loyalty. Businesses with apps report up to 3x more repeat interactions compared to web-only experiences.",
        why: "Mobile accounts for over 60% of global internet traffic. If your business is not in your customer's pocket, a competitor's already is.",
        timeline: "Basic (1 platform): 8–12 wks · Standard (both): 12–16 wks · Enterprise: 20+ wks",
        stages: ["Discovery", "Wireframes", "UI / UX Design", "Development", "QA & Testing", "App Store Submission", "Launch"],
      },
      {
        title: "Desktop Software Development",
        brief: "Windows, macOS, and Linux applications. Internal tools, business systems, and standalone software.",
        what: "We design and build custom desktop software for businesses that need more than a web app can offer — internal management systems, data-heavy tools, offline-capable applications, and industry-specific platforms.",
        result: "Custom desktop software eliminates the inefficiencies of generic tools and manual processes. Businesses that invest in bespoke software report significant time savings, reduced errors, and stronger operational control.",
        why: "Off-the-shelf software forces your business to adapt to its limitations. Custom software is built around exactly how you work — giving you a permanent competitive advantage.",
        timeline: "Standard: 8–14 wks · Complex: 16–24 wks",
        stages: ["Discovery", "Requirements Analysis", "Architecture Design", "UI / UX", "Development", "QA & Testing", "Packaging & Deployment", "Handover"],
        custom: true,
      },
    ],
  },
  {
    id: "search",
    group: "Search & Visibility",
    color: "#10b981",
    services: [
      {
        title: "Search Engine Optimisation (SEO)",
        brief: "Improve your Google rankings through targeted on-page, technical, local, and off-page strategies.",
        what: "We improve your visibility on Google through a combination of on-page optimisation, technical SEO, link building, local SEO, and e-commerce SEO — all tailored to your specific market, competition, and goals.",
        result: "SEO results compound over time. Brands that invest consistently see growing organic traffic month after month — traffic that costs nothing per click and continues delivering long after the initial work is done.",
        why: "Over 90% of online experiences begin with a search engine. If you are not ranking, you are invisible to the vast majority of your potential customers — and your competitors are getting those clicks instead.",
        timeline: "Ongoing monthly retainer. First measurable results typically appear within 3–6 months.",
        stages: ["Site Audit", "Keyword & Competitor Research", "Strategy", "On-Page Optimisation", "Technical Fixes", "Content & Link Building", "Monthly Reporting"],
      },
      {
        title: "Google Business Profile Management",
        brief: "Get found by high-intent local customers searching for exactly what you offer.",
        what: "We set up, fully optimise, and actively manage your Google Business Profile — handling posts, review responses, Q&A, photos, service listings, and monthly performance tracking on your behalf.",
        result: "An optimised Google Business Profile puts your brand directly in front of local searchers who are ready to buy. Businesses with active profiles receive significantly more calls, direction requests, and website visits.",
        why: "Local search is one of the highest-converting channels available. When someone searches for your service nearby, your profile is often the deciding factor between you and a competitor.",
        timeline: "Setup: 3–5 business days · Ongoing monthly management thereafter",
        stages: ["Profile Audit", "Claim & Verify", "Full Optimisation", "Photo & Service Setup", "Monthly Posts", "Review Management", "Performance Reporting"],
      },
    ],
  },
  {
    id: "marketing",
    group: "Marketing & Advertising",
    color: "#3b82f6",
    services: [
      {
        title: "Social Media Management",
        brief: "Consistent, brand-aligned content that builds your audience and keeps your business top of mind.",
        what: "We manage your brand's presence across social platforms — creating content, writing copy, scheduling posts, engaging your audience, and growing your following consistently every month.",
        result: "Consistent high-quality social media content builds brand awareness and trust over time. Brands with active presences see more inbound inquiries, stronger community loyalty, and improved paid ad performance.",
        why: "People buy from brands they recognise and trust. Social media is where that trust is built every single day. Without it, you are invisible to a massive and growing segment of your market.",
        timeline: "Profile setup: 1 week · Ongoing monthly management thereafter",
        stages: ["Brand Audit", "Content Strategy", "Profile Setup & Optimisation", "Content Calendar", "Monthly Creation & Scheduling", "Engagement & Community Management", "Monthly Reporting"],
      },
      {
        title: "Paid Advertising — Social & Google",
        brief: "Data-driven paid campaigns on Facebook, Instagram, and Google that deliver measurable ROI.",
        what: "We plan, build, and manage paid ad campaigns across Facebook, Instagram, and Google — handling targeting strategy, creative direction, copy, A/B testing, budget management, and continuous optimisation.",
        result: "Well-managed ad campaigns deliver immediate, measurable results. Our clients regularly achieve strong returns on ad spend, with campaigns that get sharper and more cost-efficient the longer they run.",
        why: "Organic growth takes time. Paid advertising puts your brand in front of exactly the right people right now — and gives you direct, measurable control over your growth rate.",
        timeline: "Campaign setup: 1–2 weeks · Ongoing monthly management thereafter",
        stages: ["Goal Setting", "Audience Research", "Creative Brief", "Campaign Architecture", "Ad Build & Copy", "Launch", "Weekly Optimisation", "Monthly Report"],
      },
    ],
  },
  {
    id: "brand",
    group: "Brand & Identity",
    color: "#ec4899",
    services: [
      {
        title: "Brand Identity Design",
        brief: "Logos, colour systems, typography, and guidelines that make your business instantly recognisable.",
        what: "We craft complete brand identities — primary logos, alternate marks, colour palettes, typography systems, brand guidelines, business cards, letterheads, and social media templates that reflect exactly who you are.",
        result: "A strong, consistent brand identity makes every other marketing effort more effective. It builds instant recognition, communicates professionalism, and sets you apart in a crowded market before a single word is read.",
        why: "Your brand is the first thing people judge. A weak visual identity undermines even the best products and services. A powerful one makes you memorable, trustworthy, and worth paying a premium for.",
        timeline: "Logo only: 1–2 wks · Full brand kit: 2–4 wks",
        stages: ["Discovery & Brand Audit", "Moodboard & Direction", "Concept Design", "Revisions", "Final Files & Brand Guidelines Delivery"],
      },
    ],
  },
  {
    id: "growth",
    group: "Growth & Systems",
    color: "#f97316",
    services: [
      {
        title: "Digital Skills Training",
        brief: "Practical digital marketing training for individuals and teams through workshops, coaching, and full programmes.",
        what: "We deliver hands-on digital marketing training covering tools, strategy, content creation, paid advertising, analytics, and more — through group workshops, 1-on-1 coaching sessions, and structured team programmes.",
        result: "Teams that understand digital marketing execute faster, spend smarter, and rely less on external agencies. Training pays for itself many times over through better in-house decisions and execution.",
        why: "Digital is no longer optional for any business. Organisations that build internal digital capability consistently outperform those that outsource everything — and at a fraction of the ongoing cost.",
        timeline: "Group Workshop: 1 day · 1-on-1 Coaching: ongoing monthly · Team Programme: 4–6 wks",
        stages: ["Needs Assessment", "Curriculum Design", "Delivery", "Practical Exercises", "Follow-up Resources & Q&A"],
      },
      {
        title: "Affiliate & Referral Systems",
        brief: "Custom-built affiliate platforms that turn your network into a scalable, measurable sales force.",
        what: "We build fully custom affiliate and referral systems for your business — complete with real-time tracking dashboards, tiered commission management, automated payout processing, and multi-level structures.",
        result: "A well-built affiliate system turns your existing customers, partners, and community into a low-cost acquisition engine. Brands with referral systems consistently acquire new customers at a fraction of what paid ads cost.",
        why: "Word-of-mouth is the most trusted form of marketing. Formalising it with a system means you can measure it, reward it, and scale it — instead of leaving growth to chance.",
        timeline: "Basic system: 3–4 wks · Advanced multi-tier system: 6–8 wks",
        stages: ["Requirements Gathering", "System Architecture", "Development", "Testing & QA", "Deployment", "Admin Training & Handover"],
      },
    ],
  },
  {
    id: "consultation",
    group: "Strategy & Consultation",
    color: "#a78bfa",
    services: [
      {
        title: "Digital Strategy & Consultation",
        brief: "A clear, actionable digital roadmap built around your business goals — before you spend a single naira on execution.",
        what: "We analyse your business, market position, competitors, and current digital footprint to build a tailored strategy that tells you exactly what to do, in what order, and why. Delivered as a full written roadmap with a presentation and handover session.",
        result: "Businesses with a clear digital strategy get significantly better results from every service they invest in. You stop guessing, stop wasting budget, and start making decisions with confidence and direction.",
        why: "Most businesses waste money on digital because they execute without a plan. The wrong channel, wrong message, or wrong timing costs far more than a strategy session. Clarity upfront saves time, money, and costly mistakes down the line.",
        timeline: "Initial consultation: Free \u00b7 Full strategy engagement: 1\u20132 weeks",
        stages: ["Free Discovery Call", "Business & Market Audit", "Competitor Analysis", "Goal Setting", "Digital Roadmap Build", "Presentation & Handover"],
        custom: true,
      },
    ],
  },
]

function FullStackIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="52" height="34" rx="3" stroke="#f59e0b" strokeWidth="2" fill="#111" />
      <rect x="9" y="11" width="46" height="28" fill="#0a0a0a" />
      <rect x="13" y="16" width={hovered ? 24 : 14} height="2.5" rx="1" fill="#f59e0b" style={{ transition: "width 0.4s ease" }} />
      <rect x="13" y="22" width={hovered ? 32 : 10} height="2.5" rx="1" fill="#6b7280" style={{ transition: "width 0.5s ease" }} />
      <rect x="13" y="28" width={hovered ? 20 : 18} height="2.5" rx="1" fill="#f59e0b" style={{ opacity: 0.5, transition: "width 0.45s ease" }} />
      <rect x="13" y="34" width={hovered ? 28 : 8} height="2.5" rx="1" fill="#6b7280" style={{ transition: "width 0.55s ease" }} />
      <rect x={hovered ? 40 : 30} y="15" width="2" height="10" rx="1" fill="#f59e0b" className="cursor-blink" style={{ transition: "x 0.4s ease" }} />
      <rect x="29" y="42" width="6" height="8" fill="#f59e0b" opacity="0.5" />
      <rect x="20" y="50" width="24" height="3" rx="1.5" fill="#f59e0b" opacity="0.5" />
      <rect x="46" y="30" width="12" height="20" rx="2" stroke="#f59e0b" strokeWidth="1.5" fill="#0a0a0a" style={{ opacity: hovered ? 1 : 0.3, transition: "opacity 0.35s ease" }} />
      <rect x="49" y="33" width="6" height="1.5" rx="0.75" fill="#6b7280" opacity="0.5" />
      <rect x="49" y="36" width="4" height="1.5" rx="0.75" fill="#6b7280" opacity="0.5" />
      <circle cx="52" cy="46" r="1.2" fill="#f59e0b" opacity="0.6" />
    </svg>
  )
}

function SearchIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={hovered ? 25 : 28} cy={hovered ? 25 : 28} r="16" stroke="#10b981" strokeWidth="2.5" fill="none" style={{ transition: "cx 0.4s ease, cy 0.4s ease" }} />
      <rect x={hovered ? 17 : 20} y={hovered ? 21 : 24} width="12" height="2" rx="1" fill="#10b981" opacity="0.6" style={{ transition: "x 0.4s ease, y 0.4s ease" }} />
      <rect x={hovered ? 17 : 20} y={hovered ? 26 : 29} width="8" height="2" rx="1" fill="#10b981" opacity="0.4" style={{ transition: "x 0.4s ease, y 0.4s ease" }} />
      <rect x={hovered ? 17 : 20} y={hovered ? 31 : 34} width="10" height="2" rx="1" fill="#10b981" opacity="0.5" style={{ transition: "x 0.4s ease, y 0.4s ease" }} />
      <line x1={hovered ? 37 : 40} y1={hovered ? 37 : 40} x2={hovered ? 53 : 56} y2={hovered ? 53 : 56} stroke="#10b981" strokeWidth="3" strokeLinecap="round" style={{ transition: "x1 0.4s ease, y1 0.4s ease, x2 0.4s ease, y2 0.4s ease" }} />
    </svg>
  )
}

function MarketingIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 22 L38 14 L38 42 L10 34 Z" stroke="#3b82f6" strokeWidth="2" fill="#111" />
      <rect x="5" y="22" width="7" height="12" rx="2" stroke="#3b82f6" strokeWidth="1.5" fill="#111" />
      <path d="M10 34 L14 44" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 20 Q50 28 42 36" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" style={{ opacity: hovered ? 1 : 0.2, transition: "opacity 0.3s ease" }} />
      <path d="M46 16 Q58 28 46 40" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: hovered ? 0.7 : 0.1, transition: "opacity 0.4s ease" }} />
      <path d="M50 12 Q66 28 50 44" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" style={{ opacity: hovered ? 0.4 : 0.05, transition: "opacity 0.5s ease" }} />
    </svg>
  )
}

function BrandIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: hovered ? "rotate(18deg)" : "rotate(0deg)", transition: "transform 0.6s ease" }}>
      <polygon points="32,5 56,24 32,59 8,24" stroke="#ec4899" strokeWidth="2" fill="none" />
      <line x1="8" y1="24" x2="56" y2="24" stroke="#ec4899" strokeWidth="1" opacity="0.4" />
      <line x1="32" y1="5" x2="8" y2="24" stroke="#ec4899" strokeWidth="0.8" opacity="0.3" />
      <line x1="32" y1="5" x2="56" y2="24" stroke="#ec4899" strokeWidth="0.8" opacity="0.3" />
      <line x1="32" y1="5" x2="32" y2="59" stroke="#ec4899" strokeWidth="0.8" opacity="0.2" />
      <circle cx="32" cy="24" r={hovered ? 6 : 3} fill="#ec4899" style={{ opacity: hovered ? 0.9 : 0.4, transition: "r 0.4s ease, opacity 0.4s ease" }} />
    </svg>
  )
}

function GrowthIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="8" y1="52" x2="56" y2="52" stroke="#f97316" strokeWidth="2" />
      <rect x="11" y={hovered ? 36 : 44} width="10" height={hovered ? 16 : 8} rx="1.5" fill="#f97316" opacity="0.45" style={{ transition: "y 0.3s ease, height 0.3s ease" }} />
      <rect x="26" y={hovered ? 26 : 38} width="10" height={hovered ? 26 : 14} rx="1.5" fill="#f97316" opacity="0.7" style={{ transition: "y 0.4s ease, height 0.4s ease" }} />
      <rect x="41" y={hovered ? 14 : 30} width="10" height={hovered ? 38 : 22} rx="1.5" fill="#f97316" style={{ transition: "y 0.5s ease, height 0.5s ease" }} />
      <path d="M52 6 L58 14 M52 6 L46 14 M52 6 L52 24" stroke="#f97316" strokeWidth="2" strokeLinecap="round" style={{ opacity: hovered ? 1 : 0.3, transition: "opacity 0.3s ease" }} />
    </svg>
  )
}

function ConsultationIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="48" height="34" rx="3" stroke="#a78bfa" strokeWidth="2" fill="#0a0a0a" />
      <rect x="11" y="13" width="42" height="28" fill="#080808" />
      <circle cx="20" cy="22" r={hovered ? 5 : 3} fill="#a78bfa" style={{ opacity: hovered ? 0.9 : 0.4, transition: "r 0.4s ease, opacity 0.4s ease" }} />
      <rect x="28" y="19" width={hovered ? 18 : 10} height="2" rx="1" fill="#a78bfa" opacity="0.6" style={{ transition: "width 0.4s ease" }} />
      <rect x="28" y="24" width={hovered ? 14 : 8} height="2" rx="1" fill="#6b7280" opacity="0.5" style={{ transition: "width 0.45s ease" }} />
      <line x1="11" y1="32" x2="53" y2="32" stroke="#a78bfa" strokeWidth="0.75" opacity="0.2" />
      <rect x="11" y="36" width={hovered ? 30 : 20} height="2" rx="1" fill="#6b7280" opacity="0.4" style={{ transition: "width 0.5s ease" }} />
      <rect x="11" y="40" width={hovered ? 22 : 14} height="2" rx="1" fill="#6b7280" opacity="0.3" style={{ transition: "width 0.55s ease" }} />
      <rect x="28" y="44" width="8" height="6" rx="1" fill="#a78bfa" opacity="0.4" />
      <rect x="20" y="50" width="24" height="2.5" rx="1" fill="#a78bfa" opacity="0.3" />
    </svg>
  )
}

const iconMap: Record<string, React.ComponentType<{ hovered: boolean }>> = {
  fullstack: FullStackIcon,
  search:    SearchIcon,
  marketing: MarketingIcon,
  brand:     BrandIcon,
  growth:       GrowthIcon,
  consultation: ConsultationIcon,
}

export default function ServicesPage() {
  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#f5f5f5", fontFamily: "inherit" }}>
      <Navbar />

      {/* PAGE HEADER */}
      <div style={{ paddingTop: "120px", paddingBottom: "80px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ color: "#f59e0b", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>What We Do</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>Every Service Your Brand Needs to Win Online</h1>
          <p style={{ color: "#9ca3af", fontSize: "1.05rem", lineHeight: 1.8, margin: 0 }}>We do not do generic. Every service is executed with precision, strategy, and a clear focus on results that actually move your business forward.</p>
        </div>
      </div>

      {/* GROUPS */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 120px" }}>
        {groups.map((group) => <GroupSection key={group.id} group={group} />)}
      </div>

      {/* BOTTOM CTA */}
      <div style={{ borderTop: "1px solid #1a1a1a", background: "#0a0a0a", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ color: "#f59e0b", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Ready to grow?</p>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, maxWidth: "560px", margin: "0 auto 16px" }}>Not Sure Which Service You Need?</h2>
        <p style={{ color: "#9ca3af", fontSize: "15px", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.7 }}>Tell us about your business. We will recommend exactly what will move the needle — no fluff, no overselling.</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/get-started" style={{ background: "#f59e0b", color: "#000", padding: "14px 32px", borderRadius: "8px", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}>Get a Free Recommendation</a>
          <a href="/pricing" style={{ background: "transparent", color: "#f5f5f5", padding: "14px 32px", borderRadius: "8px", fontWeight: 600, fontSize: "15px", textDecoration: "none", border: "1px solid #2a2a2a" }}>View All Pricing</a>
        </div>
      </div>

      <style>{`
        @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor-blink { animation: cursorBlink 1s steps(1) infinite; }
        .svc-card { transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .svc-card:hover { border-color: #2a2a2a !important; box-shadow: 0 4px 32px rgba(0,0,0,0.4); }
        @media (max-width: 900px) {
          .what-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .what-grid { grid-template-columns: 1fr !important; }
          .stages-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .stages-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  )
}

function GroupSection({ group }: { group: Group }) {
  const [hovered, setHovered] = useState(false)
  const Icon = iconMap[group.id]
  return (
    <div style={{ marginBottom: "96px" }}>
      {/* GROUP HEADER */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "80px", height: "80px", borderRadius: "18px",
            background: "#0d0d0d",
            border: `1px solid ${group.color}40`,
            boxShadow: hovered ? `0 0 28px ${group.color}35` : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, cursor: "default",
            transition: "box-shadow 0.35s ease",
          }}
        >
          <Icon hovered={hovered} />
        </div>
        <div>
          <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#f5f5f5", margin: "0 0 4px" }}>{group.group}</h2>
          <p style={{ color: group.color, fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>
            {group.services.length} Service{group.services.length > 1 ? "s" : ""}
          </p>
        </div>
        <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
      </div>
      {/* SERVICES */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {group.services.map((service, i) => (
          <ServiceCard key={i} service={service} color={group.color} />
        ))}
      </div>
    </div>
  )
}

function ServiceCard({ service, color }: { service: Service; color: string }) {
  return (
    <div
      className="svc-card"
      style={{
        background: "#0d0d0d",
        border: "1px solid #1a1a1a",
        borderRadius: "14px",
        padding: "36px 40px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Color accent bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: color, borderRadius: "14px 0 0 14px" }} />

      {/* TITLE + BRIEF */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#f5f5f5", margin: "0 0 6px" }}>{service.title}</h3>
        <p style={{ color: color, fontSize: "14px", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{service.brief}</p>
      </div>

      {/* WHAT / RESULT / WHY */}
      <div className="what-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: color, marginBottom: "6px" }}>What it is</p>
          <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: 1.75, margin: 0 }}>{service.what}</p>
        </div>
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: color, marginBottom: "6px" }}>What it does for your brand</p>
          <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: 1.75, margin: 0 }}>{service.result}</p>
        </div>
        <div>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: color, marginBottom: "6px" }}>Why it matters</p>
          <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: 1.75, margin: 0 }}>{service.why}</p>
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#080808", border: "1px solid #1f1f1f", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: color, whiteSpace: "nowrap", paddingTop: "2px", flexShrink: 0 }}>Timeline</span>
        <span style={{ color: "#9ca3af", fontSize: "13px", lineHeight: 1.6 }}>{service.timeline}</span>
      </div>

      {/* STAGES */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: color, marginBottom: "12px" }}>What’s Involved</p>
        <div className="stages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: "8px" }}>
          {service.stages.map((stage, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#111", border: "1px solid #1f1f1f", borderRadius: "6px", padding: "8px 10px" }}>
              <span style={{
                width: "20px", height: "20px", borderRadius: "50%",
                background: `${color}18`, border: `1px solid ${color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px", fontWeight: 700, color: color, flexShrink: 0,
              }}>{i + 1}</span>
              <span style={{ color: "#9ca3af", fontSize: "12px", lineHeight: 1.3 }}>{stage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", paddingTop: "20px", borderTop: "1px solid #1a1a1a" }}>
        <a href="/get-started" style={{ background: "#f59e0b", color: "#000", padding: "10px 24px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>Get Started</a>
        <a href="/pricing" style={{ color: color, fontSize: "13px", fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${color}50`, paddingBottom: "2px" }}>
          {service.custom ? "Contact for Pricing →" : "See Pricing →"}
        </a>
      </div>
    </div>
  )
}
