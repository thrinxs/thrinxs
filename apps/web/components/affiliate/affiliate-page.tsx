"use client";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const HOW_IT_WORKS = [
  { step: "01", title: "Sign Up", desc: "Fill out the affiliate application form below. We'll review and approve your account within 2 business days." },
  { step: "02", title: "Get Your Link", desc: "Once approved, you'll receive a unique referral link and code to share with your network." },
  { step: "03", title: "Refer Clients", desc: "Share your link across your channels. When someone visits Thrinxs through your link and pays, you earn." },
  { step: "04", title: "Get Paid", desc: "Earn 5% of every completed sale. Commissions are paid every Friday after client payment clears." },
];

const FAQS = [
  { q: "How much do I earn?", a: "5% of every completed sale you refer. The same rate applies whether the client is in Nigeria or international." },
  { q: "When do I get paid?", a: "Commissions are paid every Friday, after the referred client's payment has cleared." },
  { q: "Is there a minimum payout?", a: "We'll communicate the minimum payout threshold once your account is approved. It's designed to be achievable." },
  { q: "Do I need to be a Thrinxs client?", a: "No. Anyone can apply to be an affiliate — whether you're a business owner, freelancer, or content creator." },
  { q: "How long does a referral last?", a: "Your referral is tracked for 30 days from first click. If the client signs up within that window, you earn." },
];

type FormState = { name: string; email: string; phone: string; company: string; message: string };

export default function AffiliatePage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/affiliate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
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
          <p style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Affiliate Programme</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.15, maxWidth: 720, margin: "0 auto 24px" }}>
            Refer Clients.<br /><span style={{ color: "#f59e0b" }}>Earn 5% Commission.</span>
          </h1>
          <p style={{ color: "#888", fontSize: 18, maxWidth: 560, margin: "0 auto 40px" }}>Join the Thrinxs Affiliate Programme and earn 5% of every completed sale you send our way — paid every Friday, no cap.</p>
          <a href="#apply" style={{ display: "inline-block", padding: "16px 40px", borderRadius: 10, background: "#f59e0b", color: "#000", fontWeight: 700, fontSize: 16, textDecoration: "none" }}>Apply to Join</a>
        </section>

        <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { value: "5%", label: "Commission on every sale" },
              { value: "Every Friday", label: "Payout schedule" },
              { value: "No cap", label: "On what you can earn" },
              { value: "Global", label: "Nigeria + international" },
            ].map(item => (
              <div key={item.label} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 12, padding: "32px 24px", textAlign: "center" }}>
                <p style={{ fontSize: 30, fontWeight: 800, color: "#f59e0b", marginBottom: 8 }}>{item.value}</p>
                <p style={{ color: "#888", fontSize: 14 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "80px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 8 }}>How It Works</h2>
            <p style={{ color: "#888", marginBottom: 48, fontSize: 15 }}>Simple, transparent, and designed to reward real results.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
              {HOW_IT_WORKS.map(step => (
                <div key={step.step} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 12, padding: "28px 24px" }}>
                  <p style={{ fontSize: 36, fontWeight: 900, color: "#1f1f1f", marginBottom: 12 }}>{step.step}</p>
                  <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: "#f59e0b" }}>{step.title}</h3>
                  <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 60px" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 8 }}>FAQs</h2>
          <p style={{ color: "#888", marginBottom: 40, fontSize: 15 }}>Everything you need to know about the programme.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 24px", background: "none", border: "none", color: "#fff", textAlign: "left", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {faq.q}<span style={{ color: "#f59e0b", fontSize: 20, lineHeight: 1 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div style={{ padding: "0 24px 20px", color: "#888", fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>

        <section id="apply" style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", padding: "80px 24px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, marginBottom: 8 }}>Apply to Join</h2>
            <p style={{ color: "#888", marginBottom: 40, fontSize: 15 }}>We'll review your application and set up your affiliate account within 2 business days.</p>
            {status === "sent" ? (
              <div style={{ background: "#111", border: "1px solid #f59e0b", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
                <p style={{ fontSize: 40, marginBottom: 16 }}>✓</p>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>Application Received</h3>
                <p style={{ color: "#888" }}>We'll review your details and get back to you within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                  <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>Full Name *</label><input required style={inp} placeholder="e.g. John Doe" value={form.name} onChange={update("name")} /></div>
                  <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>Email Address *</label><input required type="email" style={inp} placeholder="you@example.com" value={form.email} onChange={update("email")} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                  <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>Phone Number *</label><input required style={inp} placeholder="+234 800 000 0000" value={form.phone} onChange={update("phone")} /></div>
                  <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>Company / Business Name</label><input style={inp} placeholder="Optional" value={form.company} onChange={update("company")} /></div>
                </div>
                <div><label style={{ display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 }}>How do you plan to promote Thrinxs? *</label><textarea required rows={5} style={{ ...inp, resize: "vertical" }} placeholder="Tell us about your audience, platforms, or network..." value={form.message} onChange={update("message")} /></div>
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