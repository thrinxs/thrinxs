"use client"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const CARDS = [
  { icon: "📍",   label: "Address",  value: "No. 26 Elekahia Road, off Stadium Road, Port Harcourt, Rivers State, Nigeria", href: "#" },
  { icon: "✉",  label: "Email",    value: "info@thrinxs.com.ng",  href: "mailto:info@thrinxs.com.ng" },
  { icon: "📞", label: "Phone",    value: "+234 903 344 0966",     href: "tel:+2349033440966" },
  { icon: "💬",  label: "WhatsApp", value: "Chat with us instantly", href: "https://wa.me/2349033440966" },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed")
      setSent(true)
    } catch {
      setError("Something went wrong. Please try again or email us directly.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#0a0a0a", border: "1px solid #1a1a1a",
    borderRadius: "8px", padding: "11px 14px", color: "#f5f5f5",
    fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  }
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "12px", color: "#9ca3af",
    textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px",
  }

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>

        {/* Hero */}
        <section style={{ padding: "80px 24px 60px", textAlign: "center", borderBottom: "1px solid #111" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <span style={{ display: "inline-block", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "100px", padding: "6px 18px", fontSize: "12px", color: "#f59e0b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>Contact Us</span>
            <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, color: "#f5f5f5", margin: "0 0 16px", lineHeight: 1.15 }}>Let’s Start a Conversation</h1>
            <p style={{ fontSize: "1.05rem", color: "#9ca3af", lineHeight: 1.7, margin: 0 }}>Have a project in mind, a question, or just want to say hello? We’d love to hear from you.</p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "60px 24px 100px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>

            {/* Left — info */}
            <div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f5f5f5", margin: "0 0 8px" }}>Get in Touch</h2>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.7, margin: "0 0 32px" }}>Reach us through any of the channels below. We typically respond within a few hours during business hours.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                {CARDS.map(c => (
                  <a key={c.label} href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px", background: "#111", border: "1px solid #1a1a1a", borderRadius: "12px", padding: "20px", textDecoration: "none" }}
                  >
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "18px" }}>{c.icon}</div>
                    <div>
                      <p style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>{c.label}</p>
                      <p style={{ fontSize: "14px", color: "#f5f5f5", margin: 0, lineHeight: 1.5 }}>{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "12px", padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#f59e0b", fontWeight: 600, margin: "0 0 6px" }}>Business Hours</p>
                <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0, lineHeight: 1.7 }}>
                  Monday – Friday: 9:00 AM – 6:00 PM (WAT)<br />
                  Saturday: 10:00 AM – 3:00 PM (WAT)<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "16px", padding: "36px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f5f5f5", margin: "0 0 10px" }}>Message Sent!</h3>
                  <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: 1.7, margin: "0 0 24px" }}>Thanks for reaching out. We’ll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }) }} style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "8px", padding: "10px 24px", color: "#f59e0b", fontSize: "14px", cursor: "pointer" }}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f5f5f5", margin: "0 0 24px" }}>Send Us a Message</h3>
                  {[
                    { key: "name",    label: "Your Name",     type: "text",  placeholder: "e.g. John Doe" },
                    { key: "email",   label: "Email Address", type: "email", placeholder: "e.g. john@company.com" },
                    { key: "subject", label: "Subject",       type: "text",  placeholder: "e.g. Website project enquiry" },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: "18px" }}>
                      <label style={labelStyle}>{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder} value={(form as Record<string,string>)[f.key]} onChange={e => update(f.key, e.target.value)} style={inputStyle} />
                    </div>
                  ))}
                  <div style={{ marginBottom: "24px" }}>
                    <label style={labelStyle}>Message</label>
                    <textarea required rows={5} placeholder="Tell us about your project or question..." value={form.message} onChange={e => update("message", e.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  {error && <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                  <button type="submit" disabled={loading} style={{ width: "100%", background: loading ? "#374151" : "#f59e0b", color: loading ? "#9ca3af" : "#0a0a0a", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
