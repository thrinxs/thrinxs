"use client"

import { useState, useEffect } from "react"
import Navbar from "../navbar"
import Footer from "../footer"

type Region = "ng" | "intl"

type ServiceOption = {
  name: string
  ng: string
  intl: string
  duration: string
}

type ServiceDef = {
  options: ServiceOption[]
}

const SERVICE_OPTIONS: Record<string, ServiceDef> = {
  "Website & SaaS Development": { options: [
    { name: "Landing Page",        ng: "₦150,000",       intl: "$500",      duration: "1–2 weeks" },
    { name: "Starter Website",     ng: "₦300,000",       intl: "$2,500",    duration: "3–4 weeks" },
    { name: "Business Website",    ng: "₦500,000",       intl: "$4,000",    duration: "6–8 weeks" },
    { name: "SaaS / Enterprise",   ng: "Custom",          intl: "Custom",    duration: "12+ weeks" },
  ]},
  "Mobile App Development": { options: [
    { name: "Basic (1 platform)",  ng: "₦1,500,000",     intl: "$5,000",    duration: "8–12 weeks" },
    { name: "Standard (both)",     ng: "₦3,000,000",     intl: "$8,000",    duration: "12–16 weeks" },
    { name: "Enterprise",          ng: "₦5,000,000+",    intl: "$15,000+",  duration: "20+ weeks" },
  ]},
  "Desktop Software Development": { options: [
    { name: "Standard",            ng: "Custom",          intl: "Custom",    duration: "8–14 weeks" },
    { name: "Complex",             ng: "Custom",          intl: "Custom",    duration: "16–24 weeks" },
  ]},
  "Search Engine Optimisation (SEO)": { options: [
    { name: "On-Page SEO",         ng: "₦80,000/mo",     intl: "$400/mo",   duration: "Ongoing" },
    { name: "Off-Page SEO",        ng: "₦120,000/mo",    intl: "$600/mo",   duration: "Ongoing" },
    { name: "Technical SEO",       ng: "₦150,000/mo",    intl: "$700/mo",   duration: "Ongoing" },
    { name: "Local SEO",           ng: "₦80,000/mo",     intl: "$350/mo",   duration: "Ongoing" },
    { name: "E-Commerce SEO",      ng: "₦200,000/mo",    intl: "$1,000/mo", duration: "Ongoing" },
    { name: "Starter Bundle",      ng: "₦150,000/mo",    intl: "$700/mo",   duration: "Ongoing" },
    { name: "Growth Bundle",       ng: "₦300,000/mo",    intl: "$1,500/mo", duration: "Ongoing" },
    { name: "Full Domination",     ng: "₦500,000/mo",    intl: "$2,500/mo", duration: "Ongoing" },
  ]},
  "Google Business Profile Management": { options: [
    { name: "Profile Setup",       ng: "₦50,000",        intl: "$300",      duration: "3–5 days" },
    { name: "Monthly Management",  ng: "₦30,000/mo",     intl: "$200/mo",   duration: "Ongoing" },
  ]},
  "Social Media Management": { options: [
    { name: "Profile Setup",       ng: "₦75,000",        intl: "$400",      duration: "1 week" },
    { name: "Growth Management",   ng: "₦100,000/mo",    intl: "$500/mo",   duration: "Ongoing" },
    { name: "Content Creation",    ng: "₦150,000/mo",    intl: "$800/mo",   duration: "Ongoing" },
    { name: "Content Pro",         ng: "₦300,000/mo",    intl: "$1,500/mo", duration: "Ongoing" },
    { name: "Full Management",     ng: "₦400,000/mo",    intl: "$2,000/mo", duration: "Ongoing" },
  ]},
  "Paid Advertising — Social & Google": { options: [
    { name: "Single Campaign",     ng: "₦50,000",        intl: "$300",      duration: "1–2 weeks" },
    { name: "Social Starter",      ng: "₦100,000/mo",    intl: "$500/mo",   duration: "Ongoing" },
    { name: "Social Growth",       ng: "₦200,000/mo",    intl: "$1,000/mo", duration: "Ongoing" },
    { name: "Google Starter",      ng: "₦100,000/mo",    intl: "$500/mo",   duration: "Ongoing" },
    { name: "Google Growth",       ng: "₦200,000/mo",    intl: "$1,000/mo", duration: "Ongoing" },
    { name: "Full Bundle",         ng: "₦300,000/mo",    intl: "$1,500/mo", duration: "Ongoing" },
  ]},
  "Brand Identity Design": { options: [
    { name: "Logo Design",         ng: "₦75,000",        intl: "$300",      duration: "1–2 weeks" },
    { name: "Full Brand Kit",      ng: "₦150,000",       intl: "$600",      duration: "2–4 weeks" },
  ]},
  "Digital Skills Training": { options: [
    { name: "Group Workshop",      ng: "₦50,000/person",  intl: "$200/person", duration: "1 day" },
    { name: "1-on-1 Coaching",     ng: "₦100,000/mo",    intl: "$500/mo",   duration: "Monthly" },
    { name: "Team Programme",      ng: "₦300,000",       intl: "$1,500",    duration: "4–6 weeks" },
  ]},
  "Affiliate & Referral Systems": { options: [
    { name: "Basic System",        ng: "₦500,000",       intl: "$2,500",    duration: "3–4 weeks" },
    { name: "Advanced System",     ng: "₦1,000,000",     intl: "$5,000",    duration: "6–8 weeks" },
  ]},
  "Digital Strategy & Consultation": { options: [
    { name: "Free Discovery Call", ng: "Free",            intl: "Free",      duration: "1 hour" },
    { name: "Full Strategy",       ng: "Custom",          intl: "Custom",    duration: "1–2 weeks" },
  ]},
}

const ALL_SERVICES = Object.keys(SERVICE_OPTIONS)

const TIMELINES = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Not sure yet",
]

const STEPS = ["About You", "Services", "Your Options", "Your Project"]

type SelectedOptions = Record<string, string>

type FormData = {
  name: string
  email: string
  phone: string
  businessName: string
  country: string
  services: string[]
  selectedOptions: SelectedOptions
  timeline: string
  message: string
}

const EMPTY: FormData = {
  name: "", email: "", phone: "", businessName: "", country: "",
  services: [], selectedOptions: {}, timeline: "", message: "",
}

export default function GetStartedPage() {
  const [step, setStep]           = useState(1)
  const [form, setForm]           = useState<FormData>(EMPTY)
  const [ref, setRef]             = useState<string | null>(null)
  const [region, setRegion]       = useState<Region>("ng")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const r = params.get("ref")
    if (r) setRef(r)
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => { if (data.country_code !== "NG") setRegion("intl") })
      .catch(() => {})
  }, [])

  const set = (key: keyof FormData, val: any) => setForm(f => ({ ...f, [key]: val }))

  const toggleService = (s: string) => {
    const updated = form.services.includes(s)
      ? form.services.filter(x => x !== s)
      : [...form.services, s]
    const updatedOpts = { ...form.selectedOptions }
    if (form.services.includes(s)) delete updatedOpts[s]
    setForm(f => ({ ...f, services: updated, selectedOptions: updatedOpts }))
  }

  const selectOption = (service: string, optionName: string) => {
    setForm(f => ({ ...f, selectedOptions: { ...f.selectedOptions, [service]: optionName } }))
  }

  const canNext = () => {
    if (step === 1) return !!(form.name && form.email && form.phone && form.businessName && form.country)
    if (step === 2) return form.services.length > 0
    if (step === 3) return form.services.every(s => !!form.selectedOptions[s]) && !!form.timeline
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    try {
      const optionLines = form.services.map(s => {
        const opt = form.selectedOptions[s]
        const def = SERVICE_OPTIONS[s]?.options.find(o => o.name === opt)
        const price = def ? (region === "ng" ? def.ng : def.intl) : "Custom"
        const duration = def?.duration ?? "TBD"
        return `  - ${s}: ${opt} — ${price} — ${duration}`
      }).join("\n")
      await fetch("/api/get-started", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          businessName: form.businessName,
          country: form.country,
          services: form.services,
          optionLines,
          timeline: form.timeline,
          message: form.message,
          ref,
          region,
        }),
      })
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us directly.")
    } finally {
      setLoading(false)
    }
  }

  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#0d0d0d", border: "1px solid #2a2a2a",
    borderRadius: "8px", padding: "12px 16px", color: "#f5f5f5",
    fontSize: "14px", outline: "none", boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "12px", fontWeight: 700,
    letterSpacing: "1.5px", textTransform: "uppercase",
    color: "#6b7280", marginBottom: "8px",
  }


  // ── Price + duration calculators ──────────────────────────────────────────
  const parseServicePrice = (priceStr: string): {
    amount: number | null;
    isMonthly: boolean;
    isPerPerson: boolean;
    isCustom: boolean;
    isFree: boolean;
  } => {
    if (!priceStr || priceStr === 'Custom')
      return { amount: null, isMonthly: false, isPerPerson: false, isCustom: true, isFree: false };
    if (priceStr === 'Free')
      return { amount: 0, isMonthly: false, isPerPerson: false, isCustom: false, isFree: true };
    const isMonthly  = priceStr.includes('/mo');
    const isPerPerson = priceStr.includes('/person');
    const cleaned = priceStr.replace(/[₦$,+]/g, '').replace('/mo', '').replace('/person', '').trim();
    const amount = parseFloat(cleaned);
    return { amount: isNaN(amount) ? null : amount, isMonthly, isPerPerson, isCustom: false, isFree: false };
  };

  const calcTotals = () => {
    const cur = region === 'ng' ? 'ng' : 'intl';
    let oneTime = 0;
    let monthly  = 0;
    let hasCustom    = false;
    let hasPerPerson = false;
    selectedServices.forEach((svcId) => {
      const optName = selectedOptions[svcId];
      if (!optName) return;
      const opts = (SERVICE_OPTIONS as Record<string, { name: string; priceNg: string; priceIntl: string; duration: string }[]>)[svcId] || [];
      const opt  = opts.find((o) => o.name === optName);
      if (!opt) return;
      const raw  = cur === 'ng' ? opt.priceNg : opt.priceIntl;
      const p    = parseServicePrice(raw);
      if (p.isCustom)            { hasCustom = true; return; }
      if (p.isFree || p.amount === null) return;
      if (p.isPerPerson)         { hasPerPerson = true; monthly += p.amount; return; }
      if (p.isMonthly)           { monthly  += p.amount; return; }
      oneTime += p.amount;
    });
    return { oneTime, monthly, hasCustom, hasPerPerson };
  };

  const calcDuration = () => {
    const ongoingLabels: string[] = [];
    const projectDurations: string[] = [];
    selectedServices.forEach((svcId) => {
      const optName = selectedOptions[svcId];
      if (!optName) return;
      const opts = (SERVICE_OPTIONS as Record<string, { name: string; priceNg: string; priceIntl: string; duration: string }[]>)[svcId] || [];
      const opt  = opts.find((o) => o.name === optName);
      if (!opt) return;
      if (opt.duration === 'Ongoing') {
        ongoingLabels.push(optName);
      } else {
        projectDurations.push(opt.duration);
      }
    });
    // Pick "longest" project duration via week/day extraction
    const toWeeks = (d: string) => {
      const wMatch = d.match(/(\d+)(?:\+)?\s*week/i);
      const dMatch = d.match(/(\d+)(?:\+)?\s*day/i);
      const hMatch = d.match(/(\d+)(?:\+)?\s*hour/i);
      if (wMatch) return parseInt(wMatch[1]);
      if (dMatch) return parseInt(dMatch[1]) / 7;
      if (hMatch) return 0.02;
      return 0;
    };
    const longest = projectDurations.sort((a, b) => toWeeks(b) - toWeeks(a))[0] || null;
    return { longest, hasOngoing: ongoingLabels.length > 0 };
  };
  // ── Totals + Duration helpers ──────────────────────────────────────────────────
  const parsePrice = (raw: string) => {
    if (!raw || raw === "Custom") return { amount: null, monthly: false, perPerson: false, custom: true,  free: false }
    if (raw === "Free")           return { amount: 0,    monthly: false, perPerson: false, custom: false, free: true  }
    const isMonthly   = raw.includes("/mo")
    const isPerPerson = raw.includes("/person")
    const cleaned = raw.replace(/[₦$,+]/g, "").replace("/mo", "").replace("/person", "").trim()
    const amount  = parseFloat(cleaned)
    return { amount: isNaN(amount) ? null : amount, monthly: isMonthly, perPerson: isPerPerson, custom: false, free: false }
  }

  const getTotals = () => {
    let oneTime = 0, monthly = 0
    let hasCustom = false, hasPerPerson = false
    form.services.forEach((svc) => {
      const optName = form.selectedOptions[svc]
      const opt = SERVICE_OPTIONS[svc]?.options.find(o => o.name === optName)
      if (!opt) return
      const raw = region === "ng" ? opt.ng : opt.intl
      const p = parsePrice(raw)
      if (p.custom)                          { hasCustom = true; return }
      if (p.free || p.amount === null)        return
      if (p.perPerson) { hasPerPerson = true; oneTime += p.amount; return }
      if (p.monthly)                         { monthly  += p.amount; return }
      oneTime += p.amount
    })
    return { oneTime, monthly, hasCustom, hasPerPerson }
  }

  const getDuration = () => {
    const projects: string[] = []
    let hasOngoing = false
    form.services.forEach((svc) => {
      const optName = form.selectedOptions[svc]
      const opt = SERVICE_OPTIONS[svc]?.options.find(o => o.name === optName)
      if (!opt) return
      if (opt.duration === "Ongoing") { hasOngoing = true; return }
      projects.push(opt.duration)
    })
    const toWeeks = (d: string) => {
      const w   = d.match(/(\d+)\+?\s*week/i)
      const day = d.match(/(\d+)\+?\s*day/i)
      const h   = d.match(/(\d+)\+?\s*hour/i)
      if (w)   return parseInt(w[1])
      if (day) return parseInt(day[1]) / 7
      if (h)   return 0.01
      return 0
    }
    const longest = [...projects].sort((a, b) => toWeeks(b) - toWeeks(a))[0] || null
    return { longest, hasOngoing }
  }


  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#f5f5f5", fontFamily: "inherit" }}>
      <Navbar />

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "140px 24px 100px" }}>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#f59e0b20", border: "2px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "16px" }}>We’ve received your enquiry!</h1>
            <p style={{ color: "#9ca3af", fontSize: "15px", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto 12px" }}>
              Thank you, <strong style={{ color: "#f5f5f5" }}>{form.name}</strong>. Our team will review your project and get back to you within <strong style={{ color: "#f59e0b" }}>24 hours</strong>.
            </p>
            {ref && <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "32px" }}>Referred by rep: <span style={{ color: "#f59e0b", fontWeight: 700 }}>{ref}</span></p>}
            {!ref && <div style={{ marginBottom: "32px" }} />}
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/2349033440966" target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>Chat on WhatsApp</a>
              <a href="/" style={{ background: "transparent", color: "#f5f5f5", padding: "12px 28px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1px solid #2a2a2a" }}>Back to Home</a>
            </div>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ color: "#f59e0b", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
                {ref ? `Referred by Rep: ${ref}` : "Let’s Work Together"}
              </p>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>Tell Us About Your Project</h1>
              <p style={{ color: "#9ca3af", fontSize: "15px", lineHeight: 1.7 }}>Answer a few quick questions and we’ll recommend exactly what your business needs.</p>
            </div>

            {/* STEP INDICATORS */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flex: 1 }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, background: step > i + 1 ? "#f59e0b" : step === i + 1 ? "#f59e0b20" : "#111", border: step === i + 1 ? "2px solid #f59e0b" : step > i + 1 ? "none" : "2px solid #2a2a2a", color: step > i + 1 ? "#000" : step === i + 1 ? "#f59e0b" : "#4b5563", transition: "all 0.3s" }}>
                      {step > i + 1
                        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        : i + 1}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ height: "3px", background: "#1a1a1a", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #f59e0b, #fcd34d)", borderRadius: "2px", transition: "width 0.4s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>Step {step} of {STEPS.length}</span>
                <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: 600 }}>{STEPS[step - 1]}</span>
              </div>
            </div>

            {/* FORM CARD */}
            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "16px", padding: "40px" }}>

              {/* STEP 1 — ABOUT YOU */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "28px" }}>Who are you?</h2>
                  <div style={{ display: "grid", gap: "20px" }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input style={inputStyle} placeholder="e.g. John Doe" value={form.name} onChange={e => set("name", e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input style={inputStyle} type="email" placeholder="you@company.com" value={form.email} onChange={e => set("email", e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input style={inputStyle} type="tel" placeholder="+234 900 000 0000" value={form.phone} onChange={e => set("phone", e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Business Name</label>
                      <input style={inputStyle} placeholder="Your company or brand name" value={form.businessName} onChange={e => set("businessName", e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <input style={inputStyle} placeholder="e.g. United States" value={form.country} onChange={e => set("country", e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 — SERVICES */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" }}>What do you need?</h2>
                  <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "24px" }}>Select all that apply. You can always add more later.</p>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {ALL_SERVICES.map((s, i) => {
                      const checked = form.services.includes(s)
                      return (
                        <div key={i} onClick={() => toggleService(s)} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", borderRadius: "10px", border: `1px solid ${checked ? "#f59e0b60" : "#1f1f1f"}`, background: checked ? "#f59e0b10" : "#111", cursor: "pointer", transition: "all 0.2s" }}>
                          <div style={{ width: "20px", height: "20px", borderRadius: "6px", border: `2px solid ${checked ? "#f59e0b" : "#2a2a2a"}`, background: checked ? "#f59e0b" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                            {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                          </div>
                          <span style={{ fontSize: "14px", color: checked ? "#f5f5f5" : "#9ca3af", fontWeight: checked ? 600 : 400 }}>{s}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3 — OPTIONS + TIMELINE */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" }}>Choose Your Options</h2>
                  <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "28px" }}>Select one option per service. Prices shown are our confirmed rates — your final quote will be sent after submission.</p>

                  {form.services.map((svc, si) => {
                    const def = SERVICE_OPTIONS[svc]
                    const selected = form.selectedOptions[svc]
                    return (
                      <div key={si} style={{ marginBottom: "32px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
                          <h3 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#f59e0b", margin: 0 }}>{svc}</h3>
                        </div>
                        <div style={{ display: "grid", gap: "8px" }}>
                          {def.options.map((opt, oi) => {
                            const isSelected = selected === opt.name
                            const price = region === "ng" ? opt.ng : opt.intl
                            return (
                              <div
                                key={oi}
                                onClick={() => selectOption(svc, opt.name)}
                                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", padding: "14px 16px", borderRadius: "10px", border: `1px solid ${isSelected ? "#f59e0b60" : "#1f1f1f"}`, background: isSelected ? "#f59e0b10" : "#111", cursor: "pointer", transition: "all 0.2s" }}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${isSelected ? "#f59e0b" : "#2a2a2a"}`, background: isSelected ? "#f59e0b" : "transparent", flexShrink: 0, transition: "all 0.2s" }} />
                                  <span style={{ fontSize: "14px", color: isSelected ? "#f5f5f5" : "#9ca3af", fontWeight: isSelected ? 600 : 400 }}>{opt.name}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                                  <span style={{ fontSize: "11px", color: "#4b5563", background: "#0d0d0d", border: "1px solid #1f1f1f", borderRadius: "4px", padding: "2px 8px" }}>{opt.duration}</span>
                                  <span style={{ fontSize: "14px", fontWeight: 700, color: isSelected ? "#f59e0b" : "#f5f5f5" }}>{price}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        {!selected && <p style={{ fontSize: "11px", color: "#ef4444", marginTop: "6px", marginBottom: 0 }}>Please select an option</p>}
                      </div>
                    )
                  })}

                  {/* TIMELINE */}
                  <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "28px", marginTop: "8px" }}>
                    <label style={labelStyle}>When do you want to start?</label>
                    <div style={{ display: "grid", gap: "8px" }}>
                      {TIMELINES.map((t, i) => {
                        const isSelected = form.timeline === t
                        return (
                          <div key={i} onClick={() => set("timeline", t)} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${isSelected ? "#f59e0b60" : "#1f1f1f"}`, background: isSelected ? "#f59e0b10" : "#111", cursor: "pointer", transition: "all 0.2s" }}>
                            <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${isSelected ? "#f59e0b" : "#2a2a2a"}`, background: isSelected ? "#f59e0b" : "transparent", flexShrink: 0, transition: "all 0.2s" }} />
                            <span style={{ fontSize: "14px", color: isSelected ? "#f5f5f5" : "#9ca3af", fontWeight: isSelected ? 600 : 400 }}>{t}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 — PROJECT DETAILS */}
              {step === 4 && (
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" }}>Tell us about your project</h2>
                  <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "16px" }}>The more detail you give us, the better we can prepare for our first conversation.</p>

                  {/* SUMMARY */}
                  <div style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: "10px", padding: "16px 20px", marginBottom: "24px" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#f59e0b", marginBottom: "12px" }}>Your Selection</p>
                    {form.services.map((svc, i) => {
                      const optName = form.selectedOptions[svc]
                      const opt = SERVICE_OPTIONS[svc]?.options.find(o => o.name === optName)
                      const price = opt ? (region === "ng" ? opt.ng : opt.intl) : "Custom"
                      return (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", paddingBottom: "8px", marginBottom: "8px", borderBottom: i < form.services.length - 1 ? "1px solid #1a1a1a" : "none" }}>
                          <div>
                            <p style={{ fontSize: "13px", color: "#f5f5f5", fontWeight: 600, margin: "0 0 2px" }}>{svc}</p>
                            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{optName} · {opt?.duration}</p>
                          </div>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "#f59e0b" }}>{price}</span>
                        </div>
                      )
                    })}
                    {/* ── Totals + Duration ── */}
                    {(() => {
                      const { oneTime, monthly, hasCustom, hasPerPerson } = getTotals()
                      const { longest, hasOngoing } = getDuration()
                      const sym = region === "ng" ? "₦" : "$"
                      const fmt = (n: number) => region === "ng" ? n.toLocaleString("en-NG") : n.toLocaleString("en-US")
                      const showOT = oneTime > 0
                      const showMO = monthly  > 0
                      if (!showOT && !showMO && !hasCustom && !longest && !hasOngoing) return null
                      return (
                        <div style={{ marginTop: "16px", borderTop: "1px solid rgba(245,158,11,0.25)", paddingTop: "14px" }}>
                          {(longest || hasOngoing) && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "8px" }}>
                              <span style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0, paddingTop: "2px" }}>Est. Duration</span>
                              <span style={{ fontSize: "12px", color: "#d1d5db", textAlign: "right" }}>
                                {longest && <span style={{ display: "block", fontWeight: 600 }}>Up to {longest}</span>}
                                {hasOngoing && <span style={{ display: "block", fontSize: "11px", color: "rgba(245,158,11,0.65)", marginTop: "2px" }}>+ ongoing service(s)</span>}
                              </span>
                            </div>
                          )}
                          {showOT && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                              <span style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>{hasPerPerson ? "One-time / per person" : "One-time"}</span>
                              <span style={{ fontSize: "15px", fontWeight: 700, color: "#f59e0b" }}>{sym}{fmt(oneTime)}</span>
                            </div>
                          )}
                          {showMO && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                              <span style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Monthly retainer</span>
                              <span style={{ fontSize: "15px", fontWeight: 700, color: "#f59e0b" }}>{sym}{fmt(monthly)}/mo</span>
                            </div>
                          )}
                          {showOT && showMO && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid rgba(245,158,11,0.12)", marginTop: "4px" }}>
                              <span style={{ fontSize: "11px", color: "#6b7280" }}>First-month total</span>
                              <span style={{ fontSize: "14px", fontWeight: 700, color: "#f5f5f5" }}>{sym}{fmt(oneTime + monthly)}</span>
                            </div>
                          )}
                          {hasCustom && (
                            <p style={{ marginTop: "8px", fontSize: "11px", color: "rgba(245,158,11,0.6)", lineHeight: "1.5", margin: "8px 0 0" }}>
                              * Custom-priced items excluded — we’ll confirm costs on your first call.
                            </p>
                          )}
                        </div>
                      )
                    })()}
                    <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "10px", marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>Start timeline</span>
                      <span style={{ fontSize: "12px", color: "#f5f5f5", fontWeight: 600 }}>{form.timeline}</span>
                    </div>
                  </div>

                  <textarea
                    style={{ ...inputStyle, minHeight: "180px", resize: "vertical", lineHeight: 1.7 }}
                    placeholder="e.g. We run a clinic in Port Harcourt and need a website that lets patients book appointments, see our services, and pay online..."
                    value={form.message}
                    onChange={e => set("message", e.target.value)}
                  />
                  {error && <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "12px" }}>{error}</p>}
                </div>
              )}

            </div>

            {/* NAV BUTTONS */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", gap: "12px" }}>
              {step > 1
                ? <button onClick={() => setStep(s => s - 1)} style={{ padding: "12px 28px", borderRadius: "8px", border: "1px solid #2a2a2a", background: "transparent", color: "#9ca3af", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Back</button>
                : <div />}
              {step < 4
                ? <button onClick={() => setStep(s => s + 1)} disabled={!canNext()} style={{ padding: "12px 32px", borderRadius: "8px", border: "none", background: canNext() ? "#f59e0b" : "#2a2a2a", color: canNext() ? "#000" : "#4b5563", fontWeight: 700, fontSize: "14px", cursor: canNext() ? "pointer" : "not-allowed", transition: "all 0.2s" }}>Continue</button>
                : <button onClick={handleSubmit} disabled={loading} style={{ padding: "12px 32px", borderRadius: "8px", border: "none", background: loading ? "#2a2a2a" : "#f59e0b", color: loading ? "#4b5563" : "#000", fontWeight: 700, fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}>{loading ? "Sending..." : "Submit Enquiry"}</button>}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}