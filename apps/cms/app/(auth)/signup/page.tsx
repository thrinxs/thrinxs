'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, EyeOff, ArrowRight, ArrowLeft,
  Check, User, Lock, Building2, Globe,
  Phone, MapPin, Sparkles,
} from 'lucide-react'

const steps = [
  { id:1, label:'Personal Info',  desc:'Tell us about yourself'   },
  { id:2, label:'Account Setup',  desc:'Secure your account'      },
  { id:3, label:'Your Workspace', desc:'Set up your organization' },
  { id:4, label:'All Done',       desc:'Welcome to Thrinxs CMS'  },
]

const plans = [
  {
    id:'free', name:'Free', price:'₦0', period:'forever',
    features:['1 project','3 collections','500MB media','API access'],
    popular: false,
  },
  {
    id:'starter', name:'Starter', price:'₦5,000', period:'/month',
    features:['3 projects','Unlimited collections','5GB media','Visual editor','2 team members'],
    popular: true,
  },
  {
    id:'pro', name:'Pro', price:'₦15,000', period:'/month',
    features:['10 projects','Unlimited everything','25GB media','Webhooks','10 team members'],
    popular: false,
  },
]

export default function SignupPage() {
  const [step,     setStep]     = useState(1)
  const [showPass, setShowPass] = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [plan,     setPlan]     = useState('free')
  const [agree,    setAgree]    = useState(false)
  const [form,     setForm]     = useState({
    firstName:'', lastName:'', email:'', phone:'', country:'Nigeria',
    password:'', confirm:'', orgName:'', orgSlug:'', orgWebsite:'',
    orgIndustry:'', orgSize:'',
  })

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const passStrength = () => {
    const p = form.password
    if (!p) return { score:0, label:'', color:'' }
    let score = 0
    if (p.length >= 8)           score++
    if (/[A-Z]/.test(p))        score++
    if (/[0-9]/.test(p))        score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    const map = {
      1:{ label:'Weak',   color:'#ef4444' },
      2:{ label:'Fair',   color:'#eab308' },
      3:{ label:'Good',   color:'#3b82f6' },
      4:{ label:'Strong', color:'#22c55e' },
    }
    return { score, ...(map[score] ?? { label:'', color:'' }) }
  }

  const strength = passStrength()

  const handleNext = async (e) => {
    e.preventDefault()
    if (step < 4) { setStep(s => s + 1); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
  }

  const inputStyle = {
    width:'100%', height:'48px', borderRadius:'14px',
    background:'rgba(255,255,255,0.07)',
    border:'1.5px solid rgba(255,255,255,0.12)',
    padding:'0 16px', color:'white', fontSize:'14px',
    outline:'none', transition:'all 0.2s ease',
    boxSizing:'border-box',
  }

  const labelStyle = {
    display:'block', fontSize:'13px', fontWeight:500,
    color:'rgba(255,255,255,0.55)', marginBottom:'8px',
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family: Inter, system-ui, sans-serif; }

        @keyframes floatY {
          0%,100% { transform:translateY(0px);  }
          50%      { transform:translateY(-8px); }
        }
        @keyframes orb {
          0%,100% { opacity:.35; transform:scale(1);     }
          50%      { opacity:.70; transform:scale(1.08);  }
        }
        @keyframes spinR { to { transform:rotate(360deg); } }

        input::placeholder,
        select::placeholder { color:rgba(255,255,255,0.25); }
        input:-webkit-autofill {
          -webkit-box-shadow:0 0 0 100px #3b1a02 inset !important;
          -webkit-text-fill-color:white !important;
        }
        select option { background:#451a03; color:white; }

        .inp:focus {
          border-color:#d97706 !important;
          background:rgba(255,255,255,0.10) !important;
          box-shadow:0 0 0 3px rgba(217,119,6,0.20) !important;
        }
        .plan-card:hover { transform:scale(1.02); }
      `}</style>

      <div style={{
        minHeight:'100vh', display:'flex', alignItems:'center',
        justifyContent:'center', position:'relative', overflow:'hidden',
        background:'linear-gradient(135deg,#2d1200 0%,#78350f 45%,#1c1917 100%)',
        padding:'24px',
      }}>

        {/* Orbs */}
        <div style={{ position:'absolute', top:'5%',  left:'5%',  width:'350px', height:'350px', borderRadius:'50%', background:'radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 70%)', filter:'blur(60px)', animation:'orb 4s ease-in-out infinite', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:'5%', right:'5%', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(251,191,36,0.12) 0%,transparent 70%)', filter:'blur(50px)', animation:'orb 5s ease-in-out infinite 1.5s', pointerEvents:'none' }}/>

        {/* Particles */}
        {[...Array(14)].map((_,i) => (
          <div key={i} style={{
            position:'absolute', borderRadius:'50%',
            background:`rgba(251,191,36,${0.04+(i%5)*0.03})`,
            width:`${(i%4)*5+3}px`, height:`${(i%4)*5+3}px`,
            left:`${(i*43+5)%93}%`, top:`${(i*61+9)%91}%`,
            animation:`floatY ${(i%3)+3}s ease-in-out infinite ${i*0.2}s`,
            pointerEvents:'none',
          }}/>
        ))}

        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0  }}
          transition={{ duration:0.6 }}
          style={{ width:'100%', maxWidth:'560px', position:'relative', zIndex:10 }}
        >

          {/* ── LOGO ── */}
          <motion.div
            animate={{ y:[0,-6,0] }}
            transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
            style={{ display:'flex', justifyContent:'center', marginBottom:'28px' }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
              <img
                src="/logo.png"
                alt="Thrinxs"
                style={{
                  height:'56px', width:'auto', objectFit:'contain',
                  filter:'drop-shadow(0 6px 20px rgba(217,119,6,0.50))',
                }}
              />
              <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
                <span style={{
                  fontSize:'28px', fontWeight:900,
                  background:'linear-gradient(135deg,#fcd34d,#d97706)',
                  WebkitBackgroundClip:'text',
                  WebkitTextFillColor:'transparent',
                  backgroundClip:'text',
                  letterSpacing:'-0.5px',
                }}>
                  Thrinxs
                </span>
                <span style={{
                  fontSize:'10px', fontWeight:700,
                  letterSpacing:'0.25em', color:'#b45309',
                  textTransform:'uppercase', marginTop:'3px',
                }}>
                  CMS Platform
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Step progress ── */}
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'center', marginBottom:'28px', gap:0 }}>
            {steps.map((s, i) => (
              <div key={s.id} style={{ display:'flex', alignItems:'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <motion.div
                    animate={{
                      scale:           step === s.id ? 1.15 : 1,
                      background:      step > s.id  ? '#d97706' : step === s.id ? 'rgba(217,119,6,0.2)' : 'rgba(255,255,255,0.05)',
                      borderColor:     step >= s.id ? '#d97706' : 'rgba(255,255,255,0.15)',
                    }}
                    style={{
                      width:'36px', height:'36px', borderRadius:'50%',
                      border:'2px solid', display:'flex', alignItems:'center',
                      justifyContent:'center', fontSize:'13px', fontWeight:700,
                      color: step > s.id ? 'white' : step === s.id ? '#fcd34d' : 'rgba(255,255,255,0.3)',
                      transition:'all 0.3s ease',
                    }}
                  >
                    {step > s.id ? <Check size={14}/> : s.id}
                  </motion.div>
                  <span style={{
                    fontSize:'10px', marginTop:'5px', fontWeight:500, whiteSpace:'nowrap',
                    color: step === s.id ? '#fcd34d' : step > s.id ? '#d97706' : 'rgba(255,255,255,0.25)',
                  }}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex:1, height:'2px', margin:'0 6px', marginBottom:'18px', borderRadius:'2px', background:'rgba(255,255,255,0.08)', overflow:'hidden' }}>
                    <motion.div
                      animate={{ width: step > s.id ? '100%' : '0%' }}
                      transition={{ duration:0.5 }}
                      style={{ height:'100%', background:'linear-gradient(90deg,#f59e0b,#d97706)', borderRadius:'2px' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Card ── */}
          <div style={{
            background:'rgba(255,255,255,0.04)',
            backdropFilter:'blur(28px)',
            WebkitBackdropFilter:'blur(28px)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'28px', padding:'36px',
            boxShadow:'0 32px 72px rgba(0,0,0,0.5)',
          }}>
            <AnimatePresence mode="wait">
              <motion.form
                key={step}
                onSubmit={handleNext}
                initial={{ opacity:0, x:30  }}
                animate={{ opacity:1, x:0   }}
                exit={{    opacity:0, x:-30  }}
                transition={{ duration:0.3 }}
              >
                {/* Step header */}
                <div style={{ marginBottom:'24px' }}>
                  <h2 style={{ fontSize:'20px', fontWeight:700, color:'white' }}>
                    {steps[step-1].label}
                  </h2>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.38)', marginTop:'4px' }}>
                    {steps[step-1].desc}
                  </p>
                </div>

                {/* ── STEP 1: Personal Info ── */}
                {step === 1 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                      <div>
                        <label style={labelStyle}>First name</label>
                        <input className="inp" type="text" placeholder="John" required
                          value={form.firstName} onChange={e => update('firstName', e.target.value)}
                          style={inputStyle}/>
                      </div>
                      <div>
                        <label style={labelStyle}>Last name</label>
                        <input className="inp" type="text" placeholder="Doe" required
                          value={form.lastName} onChange={e => update('lastName', e.target.value)}
                          style={inputStyle}/>
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Email address</label>
                      <input className="inp" type="email" placeholder="john@example.com" required
                        value={form.email} onChange={e => update('email', e.target.value)}
                        style={inputStyle}/>
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Phone number
                        <span style={{ color:'rgba(255,255,255,0.25)', marginLeft:'6px' }}>(optional)</span>
                      </label>
                      <input className="inp" type="tel" placeholder="+234 800 000 0000"
                        value={form.phone} onChange={e => update('phone', e.target.value)}
                        style={inputStyle}/>
                    </div>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <select className="inp"
                        value={form.country} onChange={e => update('country', e.target.value)}
                        style={{ ...inputStyle, cursor:'pointer', appearance:'none' }}>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                        <option value="UK">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Account Setup ── */}
                {step === 2 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                    <div>
                      <label style={labelStyle}>Password</label>
                      <div style={{ position:'relative' }}>
                        <input className="inp"
                          type={showPass ? 'text' : 'password'}
                          placeholder="At least 8 characters" required
                          value={form.password} onChange={e => update('password', e.target.value)}
                          style={{ ...inputStyle, paddingRight:'46px' }}/>
                        <button type="button" onClick={() => setShowPass(p => !p)}
                          style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', display:'flex', padding:0 }}>
                          {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                        </button>
                      </div>

                      {/* Strength meter */}
                      {form.password && (
                        <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} style={{ marginTop:'10px' }}>
                          <div style={{ display:'flex', gap:'4px', marginBottom:'4px' }}>
                            {[1,2,3,4].map(n => (
                              <div key={n} style={{
                                flex:1, height:'4px', borderRadius:'4px',
                                background: n <= strength.score ? strength.color : 'rgba(255,255,255,0.10)',
                                transition:'all 0.3s ease',
                              }}/>
                            ))}
                          </div>
                          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', color:'rgba(255,255,255,0.35)' }}>
                            <span>Password strength</span>
                            <span style={{ color: strength.color }}>{strength.label}</span>
                          </div>
                          <div style={{ display:'flex', flexDirection:'column', gap:'6px', marginTop:'10px' }}>
                            {[
                              { check: form.password.length >= 8,          label:'At least 8 characters'  },
                              { check: /[A-Z]/.test(form.password),         label:'One uppercase letter'   },
                              { check: /[0-9]/.test(form.password),         label:'One number'             },
                              { check: /[^A-Za-z0-9]/.test(form.password),  label:'One special character'  },
                            ].map(r => (
                              <div key={r.label} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                                <div style={{
                                  width:'14px', height:'14px', borderRadius:'50%',
                                  border:`1.5px solid ${r.check ? '#22c55e' : 'rgba(255,255,255,0.15)'}`,
                                  background: r.check ? '#22c55e' : 'transparent',
                                  display:'flex', alignItems:'center', justifyContent:'center',
                                  flexShrink:0, transition:'all 0.2s ease',
                                }}>
                                  {r.check && <Check size={8} color="white"/>}
                                </div>
                                <span style={{ fontSize:'12px', color: r.check ? '#86efac' : 'rgba(255,255,255,0.30)' }}>
                                  {r.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label style={labelStyle}>Confirm password</label>
                      <div style={{ position:'relative' }}>
                        <input className="inp"
                          type={showConf ? 'text' : 'password'}
                          placeholder="Repeat your password" required
                          value={form.confirm} onChange={e => update('confirm', e.target.value)}
                          style={{
                            ...inputStyle, paddingRight:'46px',
                            borderColor: form.confirm && form.confirm !== form.password
                              ? '#ef4444' : 'rgba(255,255,255,0.12)',
                          }}/>
                        <button type="button" onClick={() => setShowConf(p => !p)}
                          style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', display:'flex', padding:0 }}>
                          {showConf ? <EyeOff size={16}/> : <Eye size={16}/>}
                        </button>
                      </div>
                      {form.confirm && form.confirm !== form.password && (
                        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
                          style={{ color:'#f87171', fontSize:'12px', marginTop:'6px' }}>
                          Passwords do not match
                        </motion.p>
                      )}
                      {form.confirm && form.confirm === form.password && (
                        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
                          style={{ color:'#86efac', fontSize:'12px', marginTop:'6px', display:'flex', alignItems:'center', gap:'4px' }}>
                          <Check size={11}/> Passwords match
                        </motion.p>
                      )}
                    </div>

                    {/* Plan selection */}
                    <div>
                      <label style={labelStyle}>Choose your plan</label>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px' }}>
                        {plans.map(p => (
                          <div
                            key={p.id}
                            className="plan-card"
                            onClick={() => setPlan(p.id)}
                            style={{
                              position:'relative', cursor:'pointer', borderRadius:'16px',
                              border:`1.5px solid ${plan === p.id ? '#d97706' : 'rgba(255,255,255,0.10)'}`,
                              background: plan === p.id ? 'rgba(217,119,6,0.15)' : 'rgba(255,255,255,0.04)',
                              padding:'14px 10px',
                              boxShadow: plan === p.id ? '0 0 0 3px rgba(217,119,6,0.20)' : 'none',
                              transition:'all 0.2s ease',
                            }}
                          >
                            {p.popular && (
                              <div style={{
                                position:'absolute', top:'-10px', left:'50%', transform:'translateX(-50%)',
                                background:'linear-gradient(135deg,#f59e0b,#d97706)',
                                color:'white', fontSize:'9px', fontWeight:700,
                                padding:'3px 8px', borderRadius:'100px', whiteSpace:'nowrap',
                              }}>
                                Most Popular
                              </div>
                            )}
                            <div style={{ textAlign:'center', marginBottom:'10px' }}>
                              <p style={{ fontSize:'13px', fontWeight:700, color:'white' }}>{p.name}</p>
                              <p style={{ fontSize:'16px', fontWeight:900, color:'#fcd34d', lineHeight:1.2 }}>{p.price}</p>
                              <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.30)' }}>{p.period}</p>
                            </div>
                            <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                              {p.features.map(f => (
                                <div key={f} style={{ display:'flex', alignItems:'flex-start', gap:'5px' }}>
                                  <Check size={9} color="#f59e0b" style={{ marginTop:'2px', flexShrink:0 }}/>
                                  <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.45)', lineHeight:1.3 }}>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Workspace ── */}
                {step === 3 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                    <div>
                      <label style={labelStyle}>Organization / Business name</label>
                      <input className="inp" type="text" placeholder="Acme Inc." required
                        value={form.orgName}
                        onChange={e => {
                          update('orgName', e.target.value)
                          update('orgSlug', e.target.value.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''))
                        }}
                        style={inputStyle}/>
                    </div>
                    <div>
                      <label style={labelStyle}>Workspace URL</label>
                      <div style={{ display:'flex', alignItems:'center', borderRadius:'14px', background:'rgba(255,255,255,0.07)', border:'1.5px solid rgba(255,255,255,0.12)', overflow:'hidden' }}>
                        <span style={{ padding:'0 12px', color:'rgba(255,255,255,0.28)', fontSize:'12px', borderRight:'1px solid rgba(255,255,255,0.10)', height:'48px', display:'flex', alignItems:'center', whiteSpace:'nowrap', flexShrink:0 }}>
                          cms.thrinxs.com.ng/
                        </span>
                        <input type="text" placeholder="acme" required
                          value={form.orgSlug} onChange={e => update('orgSlug', e.target.value)}
                          style={{ flex:1, height:'48px', background:'transparent', border:'none', padding:'0 12px', color:'white', fontSize:'14px', outline:'none' }}/>
                      </div>
                      <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.25)', marginTop:'5px' }}>
                        Lowercase letters, numbers and hyphens only
                      </p>
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Website
                        <span style={{ color:'rgba(255,255,255,0.25)', marginLeft:'6px' }}>(optional)</span>
                      </label>
                      <input className="inp" type="url" placeholder="https://yourwebsite.com"
                        value={form.orgWebsite} onChange={e => update('orgWebsite', e.target.value)}
                        style={inputStyle}/>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                      <div>
                        <label style={labelStyle}>Industry</label>
                        <select className="inp"
                          value={form.orgIndustry} onChange={e => update('orgIndustry', e.target.value)}
                          style={{ ...inputStyle, cursor:'pointer', appearance:'none' }}>
                          <option value="">Select...</option>
                          <option value="technology">Technology</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="finance">Finance</option>
                          <option value="media">Media</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="ngo">NGO / Non-profit</option>
                          <option value="government">Government</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Team size</label>
                        <select className="inp"
                          value={form.orgSize} onChange={e => update('orgSize', e.target.value)}
                          style={{ ...inputStyle, cursor:'pointer', appearance:'none' }}>
                          <option value="">Select...</option>
                          <option value="solo">Just me</option>
                          <option value="2-5">2 – 5</option>
                          <option value="6-20">6 – 20</option>
                          <option value="21-50">21 – 50</option>
                          <option value="51+">51+</option>
                        </select>
                      </div>
                    </div>

                    {/* Terms */}
                    <div
                      onClick={() => setAgree(a => !a)}
                      style={{ display:'flex', alignItems:'flex-start', gap:'10px', cursor:'pointer', marginTop:'4px' }}
                    >
                      <div style={{
                        width:'18px', height:'18px', borderRadius:'5px', flexShrink:0, marginTop:'2px',
                        border:`1.5px solid ${agree ? '#d97706' : 'rgba(255,255,255,0.22)'}`,
                        background: agree ? '#d97706' : 'transparent',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        transition:'all 0.2s ease',
                      }}>
                        {agree && <Check size={10} color="white"/>}
                      </div>
                      <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.5 }}>
                        I agree to the{' '}
                        <a href="/terms" onClick={e => e.stopPropagation()}
                          style={{ color:'#f59e0b', textDecoration:'none' }}>Terms of Service</a>
                        {' '}and{' '}
                        <a href="/privacy" onClick={e => e.stopPropagation()}
                          style={{ color:'#f59e0b', textDecoration:'none' }}>Privacy Policy</a>
                      </p>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Done ── */}
                {step === 4 && (
                  <div style={{ textAlign:'center', padding:'16px 0' }}>
                    <motion.div
                      initial={{ scale:0, rotate:-180 }}
                      animate={{ scale:1, rotate:0 }}
                      transition={{ type:'spring', stiffness:200, delay:0.1 }}
                      style={{
                        width:'80px', height:'80px', borderRadius:'50%',
                        background:'rgba(217,119,6,0.15)',
                        border:'2px solid #d97706',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        margin:'0 auto 20px',
                      }}
                    >
                      <Check size={32} color="#fcd34d"/>
                    </motion.div>

                    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
                      <h2 style={{ fontSize:'22px', fontWeight:800, color:'white', marginBottom:'8px' }}>
                        Welcome, {form.firstName || 'there'}! 🎉
                      </h2>
                      <p style={{ color:'rgba(255,255,255,0.42)', fontSize:'14px', marginBottom:'24px' }}>
                        Your account is ready. Here is a summary:
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
                      style={{
                        background:'rgba(255,255,255,0.04)',
                        border:'1px solid rgba(255,255,255,0.08)',
                        borderRadius:'16px', padding:'20px',
                        textAlign:'left', marginBottom:'20px',
                      }}
                    >
                      {[
                        { label:'Name',      value:`${form.firstName} ${form.lastName}`.trim() || '—' },
                        { label:'Email',     value: form.email    || '—' },
                        { label:'Workspace', value: form.orgSlug  ? `cms.thrinxs.com.ng/${form.orgSlug}` : '—' },
                        { label:'Plan',      value: plans.find(p => p.id === plan)?.name ?? 'Free' },
                      ].map(row => (
                        <div key={row.label} style={{
                          display:'flex', justifyContent:'space-between',
                          alignItems:'center', padding:'10px 0',
                          borderBottom:'1px solid rgba(255,255,255,0.05)',
                          fontSize:'13px',
                        }}>
                          <span style={{ color:'rgba(255,255,255,0.38)' }}>{row.label}</span>
                          <span style={{ color:'white', fontWeight:600 }}>{row.value}</span>
                        </div>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
                      style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', color:'#fcd34d', fontSize:'13px' }}
                    >
                      <Sparkles size={14}/>
                      A verification email has been sent to {form.email || 'your email'}
                    </motion.div>
                  </div>
                )}

                {/* ── Navigation ── */}
                <div style={{
                  display:'flex', gap:'12px', marginTop:'24px',
                  justifyContent: step > 1 ? 'space-between' : 'flex-end',
                }}>
                  {step > 1 && step < 4 && (
                    <motion.button
                      type="button"
                      onClick={() => setStep(s => s - 1)}
                      whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                      style={{
                        display:'flex', alignItems:'center', gap:'6px',
                        height:'48px', padding:'0 20px', borderRadius:'14px',
                        background:'rgba(255,255,255,0.05)',
                        border:'1px solid rgba(255,255,255,0.10)',
                        color:'rgba(255,255,255,0.55)', fontSize:'13px',
                        fontWeight:500, cursor:'pointer', transition:'all 0.2s ease',
                      }}
                    >
                      <ArrowLeft size={15}/> Back
                    </motion.button>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading || (step === 3 && !agree)}
                    whileHover={{ scale: loading ? 1 : 1.025 }}
                    whileTap={{  scale: loading ? 1 : 0.975 }}
                    style={{
                      flex:1, height:'48px', borderRadius:'14px',
                      background:'linear-gradient(135deg,#f59e0b,#b45309)',
                      border:'none', color:'white', fontWeight:700, fontSize:'14px',
                      cursor: (loading || (step===3 && !agree)) ? 'not-allowed' : 'pointer',
                      opacity:(loading || (step===3 && !agree)) ? 0.65 : 1,
                      display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                      boxShadow:'0 6px 24px rgba(217,119,6,0.35)',
                      transition:'all 0.2s ease',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.span key="l" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                          style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                          <div style={{ width:'15px', height:'15px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spinR 0.7s linear infinite' }}/>
                          Creating account...
                        </motion.span>
                      ) : (
                        <motion.span key="i" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                          style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                          {step === 4 ? 'Go to Dashboard' : step === 3 ? 'Create Account' : 'Continue'}
                          <ArrowRight size={15}/>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                <p style={{ textAlign:'center', fontSize:'12px', color:'rgba(255,255,255,0.20)', marginTop:'16px' }}>
                  Step {step} of {steps.length}
                </p>
              </motion.form>
            </AnimatePresence>

            {step < 4 && (
              <p style={{ textAlign:'center', fontSize:'13px', color:'rgba(255,255,255,0.30)', marginTop:'20px' }}>
                Already have an account?{' '}
                <a href="/login" style={{ color:'#f59e0b', fontWeight:700, textDecoration:'none' }}>
                  Sign in
                </a>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
