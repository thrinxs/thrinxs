"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const TEAM = [
  {
    name: "Baridubari Joshua Joe-Amos",
    role: "Founder, CEO & Fullstack Developer",
    bio: "The architect of Thrinxs. Joshua founded the company in 2023 with one goal: to give businesses in Nigeria and beyond access to the same quality of digital infrastructure that powers global brands. He leads engineering, product, and strategy.",
    avatar: "/images/team/josh.jpg",
  },
  {
    name: "Gift Onyinyechi Kanikwu",
    role: "Business Development Manager & Chief Operations Manager",
    bio: "Gift keeps Thrinxs running and growing. She oversees business development, client relationships, and day-to-day operations — making sure every project we take on is delivered to the standard we promise.",
    avatar: "https://ui-avatars.com/api/?name=Gift+Kanikwu&background=1a1a1a&color=f59e0b&size=200&bold=true",
  },
];

const VALUES = [
  { title: "Craft", desc: "We treat every line of code and every design decision as a reflection of our standards. Good enough is never good enough." },
  { title: "Clarity", desc: "We communicate clearly, build transparently, and deliver exactly what we say we will — no surprises." },
  { title: "Growth", desc: "We build things that scale. Not just technically — but commercially. Every decision is made with your growth in mind." },
  { title: "Partnership", desc: "We don't just hand things over and disappear. We sit with you, map out what you need, and see it through." },
];

export default function AboutPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <>
      <Navbar />
      <main style={{ background: "#080808", minHeight: "100vh", color: "#fff", fontFamily: "inherit" }}>

        <section style={{ padding: "120px 24px 100px", textAlign: "center", borderBottom: "1px solid #1a1a1a", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
          <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>About Thrinxs</p>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1, maxWidth: 760, margin: "0 auto 32px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            We Build the Digital Foundations<br /><span style={{ color: "#f59e0b" }}>Businesses Scale On.</span>
          </h1>
          <p style={{ color: "#888", fontSize: 18, maxWidth: 640, margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.9s ease 0.2s" }}>
            Thrinxs is a digital agency founded in 2023, built to help businesses of every size compete, grow, and lead online.
          </p>
        </section>

        <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 60, alignItems: "center" }}>
            <div>
              <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Our Mission</p>
              <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.3, marginBottom: 20 }}>Why We Exist</h2>
              <p style={{ color: "#aaa", lineHeight: 1.9, fontSize: 16 }}>To help businesses of every size build a powerful digital presence — through great design, smart technology, and strategies that drive real growth. We don’t just build websites; we build the digital foundations businesses scale on.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Founded", value: "2023" },
                { label: "Headquarters", value: "Port Harcourt, Nigeria" },
                { label: "Services", value: "Design, Development, Marketing, Strategy" },
                { label: "Reach", value: "Nigeria & International" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #1a1a1a" }}>
                  <span style={{ color: "#555", fontSize: 14 }}>{item.label}</span>
                  <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "80px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>What We Stand For</p>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 48 }}>Our Values</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
              {VALUES.map((val, i) => (
                <div key={val.title} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14, padding: "32px 24px" }}>
                  <p style={{ fontSize: 40, fontWeight: 900, color: "#1a1a1a", marginBottom: 8 }}>0{i + 1}</p>
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: "#f59e0b", marginBottom: 12 }}>{val.title}</h3>
                  <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
          <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>The People</p>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 8 }}>Meet the Team</h2>
          <p style={{ color: "#888", fontSize: 15, marginBottom: 48 }}>Small team. High standards. Every project gets our full attention.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {TEAM.map(member => (
              <div key={member.name} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ background: "#0d0d0d", padding: "40px 0", display: "flex", justifyContent: "center", borderBottom: "1px solid #1a1a1a" }}>
                  <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", border: "3px solid #f59e0b", position: "relative" }}>
                    <img src={member.avatar} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                  </div>
                </div>
                <div style={{ padding: "28px 28px 32px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{member.name}</h3>
                  <p style={{ color: "#f59e0b", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>{member.role}</p>
                  <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", padding: "80px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 16 }}>Ready to Build Something Together?</h2>
          <p style={{ color: "#888", fontSize: 16, marginBottom: 36 }}>Let's talk about your business and how we can help you grow.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/get-started" style={{ display: "inline-block", padding: "16px 36px", borderRadius: 10, background: "#f59e0b", color: "#000", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>Get Started</a>
            <a href="/contact" style={{ display: "inline-block", padding: "16px 36px", borderRadius: 10, background: "transparent", color: "#f59e0b", fontWeight: 700, fontSize: 16, textDecoration: "none", border: "1px solid #f59e0b" }}>Contact Us</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}