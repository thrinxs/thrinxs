"use client"

import { useState } from "react"

const KEYFRAMES = `
  @keyframes svc-float {
    0%, 100% { transform: scale(1.15) translateY(0px) rotate(0deg); }
    33%       { transform: scale(1.15) translateY(-12px) rotate(1deg); }
    66%       { transform: scale(1.15) translateY(-6px) rotate(-1deg); }
  }
  @keyframes svc-icon-glow {
    0%, 100% { box-shadow: 0 0 16px 2px rgba(245,158,11,0.35), 0 0 0 2px rgba(245,158,11,0.2); }
    50%       { box-shadow: 0 0 32px 6px rgba(245,158,11,0.65), 0 0 0 2px rgba(245,158,11,0.4); }
  }
  @keyframes svc-border-pulse {
    0%, 100% { border-color: rgba(245,158,11,0.2); }
    50%       { border-color: rgba(245,158,11,0.55); }
  }
`

const services = [
  {
    title: "Website & SaaS Development",
    description: "Custom websites, business platforms, and fully bespoke SaaS products — fast, mobile-first, and built to convert visitors into paying customers.",
    photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=85&fit=crop&crop=center",
    tag: "Most Popular",
    href: "/services#fullstack",
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform iOS and Android applications delivering seamless user experiences, built for scale and long-term performance.",
    photo: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=85&fit=crop&crop=center",
    tag: null,
    href: "/services#fullstack",
  },
  {
    title: "Desktop Software Development",
    description: "Custom Windows, macOS, and Linux applications — internal tools, business systems, and standalone software built around how you work.",
    photo: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=85&fit=crop&crop=center",
    tag: null,
    href: "/services#fullstack",
  },
  {
    title: "Search Engine Optimisation (SEO)",
    description: "Data-driven search strategies combining on-page, technical, local, and off-page SEO to push your business to page one and keep it there.",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=85&fit=crop&crop=center",
    tag: null,
    href: "/services#search",
  },
  {
    title: "Google Business Profile Management",
    description: "Own your local market. We set up, verify, and continuously grow your Google Business presence for maximum local visibility and inbound calls.",
    photo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=700&q=85&fit=crop&crop=center",
    tag: null,
    href: "/services#search",
  },
  {
    title: "Social Media Management",
    description: "Content, community, and consistency. We manage your platforms, grow your audience, and turn followers into paying clients.",
    photo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=85&fit=crop&crop=center",
    tag: null,
    href: "/services#marketing",
  },
  {
    title: "Paid Advertising — Social & Google",
    description: "Precision Google and social ad campaigns with every naira and dollar tracked. Measurable ROI, continuous optimisation, full funnel coverage.",
    photo: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=700&q=85&fit=crop&crop=center",
    tag: null,
    href: "/services#marketing",
  },
  {
    title: "Brand Identity Design",
    description: "Logos, colour palettes, typography systems, and brand guidelines that make your business instantly recognisable and worth a premium.",
    photo: "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=700&q=85&fit=crop&crop=center",
    tag: null,
    href: "/services#brand",
  },
  {
    title: "Digital Skills Training",
    description: "Hands-on digital training for teams and individuals — workshops, 1-on-1 coaching, and full team programmes covering tools, strategy, and execution.",
    photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85&fit=crop&crop=center",
    tag: null,
    href: "/services#growth",
  },
  {
    title: "Affiliate & Referral Systems",
    description: "Build a referral engine. We design and develop custom affiliate systems that turn your network into a scalable, measurable revenue stream.",
    photo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=85&fit=crop&crop=center",
    tag: null,
    href: "/services#growth",
  },
  {
    title: "Digital Strategy & Consultation",
    description: "Not sure where to start? Our strategists map out your complete digital roadmap — clear priorities, the right channels, and a plan that actually makes sense for your business.",
    photo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=85&fit=crop&crop=center",
    tag: "Free Consultation",
    href: "/services#consultation",
  },
]

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%)", padding: "100px 0 120px", position: "relative", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* background grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* heading */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "999px", padding: "6px 18px", marginBottom: "20px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ color: "#f59e0b", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>What We Do</span>
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" }}>
            Every Service Your{" "}
            <span style={{ background: "linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Digital Presence</span>
            {" "}Needs
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "18px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>From a first website to a full digital ecosystem — we handle design, build, growth, and management.</p>
        </div>

        {/* grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {services.map((service, i) => {
            const isHovered = hoveredIndex === i
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: "relative", overflow: "hidden", borderRadius: "20px",
                  border: "1px solid",
                  borderColor: isHovered ? "rgba(245,158,11,0.45)" : "rgba(245,158,11,0.12)",
                  background: isHovered ? "linear-gradient(145deg, rgba(20,20,20,0.98), rgba(15,12,5,0.98))" : "linear-gradient(145deg, rgba(18,18,18,0.95), rgba(12,12,12,0.95))",
                  padding: "32px 28px 28px", cursor: "default",
                  transition: "border-color 0.35s ease, background 0.35s ease, transform 0.25s ease, box-shadow 0.35s ease",
                  transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                  boxShadow: isHovered ? "0 24px 60px rgba(245,158,11,0.12), 0 0 0 1px rgba(245,158,11,0.2)" : "0 4px 24px rgba(0,0,0,0.4)",
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {/* faded bg photo */}
                <div style={{ position: "absolute", right: "-20px", bottom: "-20px", width: "70%", height: "75%", backgroundImage: `url(${service.photo})`, backgroundSize: "cover", backgroundPosition: "center", opacity: isHovered ? 0.24 : 0.15, filter: isHovered ? "blur(0px) saturate(0.7)" : "blur(1.5px) saturate(0.4)", borderRadius: "12px", transition: "opacity 0.4s ease, filter 0.4s ease", animation: `svc-float 8s ease-in-out infinite`, animationDelay: `${i * 0.5}s`, pointerEvents: "none", zIndex: 0 }} />
                {/* gradient fade */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,12,12,0.92) 30%, rgba(12,12,12,0.65) 65%, rgba(12,12,12,0.3) 100%)", zIndex: 1, pointerEvents: "none" }} />
                {/* gold sweep */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(245,158,11,0.05) 0%, transparent 60%)", opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease", zIndex: 1, pointerEvents: "none" }} />

                {/* content */}
                <div style={{ position: "relative", zIndex: 2 }}>
                  {service.tag && (
                    <div style={{ display: "inline-block", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "999px", padding: "3px 12px", fontSize: "11px", fontWeight: 700, color: "#f59e0b", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "16px" }}>
                      {service.tag}
                    </div>
                  )}
                  {/* icon */}
                  <div style={{ width: "72px", height: "72px", borderRadius: "18px", overflow: "hidden", marginBottom: "20px", border: "2px solid rgba(245,158,11,0.35)", animation: "svc-icon-glow 3s ease-in-out infinite", animationDelay: `${i * 0.4}s`, flexShrink: 0, position: "relative" }}>
                    <img src={service.photo} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block", transform: isHovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.4s ease", filter: "saturate(0.85) brightness(0.9)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />
                  </div>
                  {/* title */}
                  <h3 style={{ fontSize: "19px", fontWeight: 700, color: isHovered ? "#fcd34d" : "#ffffff", letterSpacing: "-0.01em", marginBottom: "10px", transition: "color 0.3s ease", lineHeight: 1.25 }}>{service.title}</h3>
                  {/* desc */}
                  <p style={{ fontSize: "14.5px", color: isHovered ? "#d1d5db" : "#6b7280", lineHeight: 1.7, margin: 0, transition: "color 0.3s ease" }}>{service.description}</p>
                  {/* learn more */}
                  <a href={service.href} style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "20px", color: "#f59e0b", fontSize: "13px", fontWeight: 600, textDecoration: "none", opacity: isHovered ? 1 : 0, transform: isHovered ? "translateX(0)" : "translateX(-8px)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <p style={{ color: "#6b7280", marginBottom: "20px", fontSize: "15px" }}>Not sure which service you need?</p>
          <a
            href="/get-started"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#000", fontWeight: 700, fontSize: "15px", padding: "14px 32px", borderRadius: "10px", textDecoration: "none", letterSpacing: "0.02em", boxShadow: "0 0 32px rgba(245,158,11,0.3)", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 48px rgba(245,158,11,0.5)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 32px rgba(245,158,11,0.3)" }}
          >
            Get a Free Recommendation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}