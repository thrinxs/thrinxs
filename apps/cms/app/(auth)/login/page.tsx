'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/auth'
import {
  Eye, EyeOff, ArrowRight, Sparkles,
  LayoutDashboard, Database, ImageIcon,
  BarChart3, Code2, Zap, AlertCircle,
} from 'lucide-react'

const features = [
  { icon: LayoutDashboard, label: 'Visual Editor'   },
  { icon: Database,        label: 'Collections'     },
  { icon: ImageIcon,       label: 'Media Library'   },
  { icon: BarChart3,       label: 'Analytics'       },
  { icon: Code2,           label: 'API & SDK'       },
  { icon: Zap,             label: 'Instant Publish' },
]

export default function LoginPage() {
  const { login }                          = useAuth()
  const [email,      setEmail]             = useState('')
  const [password,   setPassword]          = useState('')
  const [showPass,   setShowPass]          = useState(false)
  const [remember,   setRemember]          = useState(false)
  const [loading,    setLoading]           = useState(false)
  const [error,      setError]             = useState('')
  const [mounted,    setMounted]           = useState(false)
  const [focusField, setFocusField]        = useState(null)

  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await login(email, password)
    if (!result.success) {
      setError(result.message)
      setLoading(false)
    }
  }

  const inputStyle = (field) => ({
    width:'100%', height:'48px', borderRadius:'14px',
    background: focusField === field ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
    border:`1.5px solid ${focusField === field ? '#d97706' : 'rgba(255,255,255,0.12)'}`,
    padding:'0 16px', color:'white', fontSize:'14px', outline:'none',
    transition:'all 0.25s ease',
    boxShadow: focusField === field ? '0 0 0 3px rgba(217,119,6,0.20)' : 'none',
    boxSizing:'border-box',
  })

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:Inter,system-ui,sans-serif;}
        @keyframes floatY{0%,100%{transform:translateY(0px)}50%{transform:translateY(-8px)}}
        @keyframes orb{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.70;transform:scale(1.08)}}
        @keyframes spinR{to{transform:rotate(360deg)}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
        input::placeholder{color:rgba(255,255,255,0.25);}
        input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #3b1a02 inset !important;-webkit-text-fill-color:white !important;}
        .feature-pill:hover{background:rgba(255,255,255,0.10) !important;border-color:rgba(251,191,36,0.35) !important;transform:scale(1.05);}
        .google-btn:hover{background:rgba(255,255,255,0.08) !important;border-color:rgba(255,255,255,0.18) !important;color:white !important;}
        @media(min-width:1024px){.left-panel{display:flex !important;}.mobile-logo{display:none !important;}}
      `}</style>

      <div style={{ minHeight:'100vh', display:'flex', background:'linear-gradient(135deg,#2d1200 0%,#78350f 45%,#1c1917 100%)', overflow:'hidden', position:'relative' }}>

        {/* Orbs */}
        <div style={{ position:'absolute',top:'10%',left:'5%',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 70%)',filter:'blur(60px)',animation:'orb 4s ease-in-out infinite',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',bottom:'10%',right:'5%',width:'320px',height:'320px',borderRadius:'50%',background:'radial-gradient(circle,rgba(251,191,36,0.12) 0%,transparent 70%)',filter:'blur(50px)',animation:'orb 5s ease-in-out infinite 1.5s',pointerEvents:'none' }}/>

        {/* Particles */}
        {mounted && [...Array(18)].map((_,i) => (
          <div key={i} style={{ position:'absolute',borderRadius:'50%',background:`rgba(251,191,36,${0.04+(i%5)*0.03})`,width:`${(i%4)*5+3}px`,height:`${(i%4)*5+3}px`,left:`${(i*41+3)%95}%`,top:`${(i*67+8)%92}%`,animation:`floatY ${(i%3)+3}s ease-in-out infinite ${i*0.22}s`,pointerEvents:'none' }}/>
        ))}

        {/* LEFT PANEL */}
        <motion.div className="left-panel" initial={{ opacity:0,x:-40 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.8,ease:'easeOut' }}
          style={{ display:'none',width:'50%',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'48px',position:'relative',zIndex:10 }}>

          <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:3.5,repeat:Infinity,ease:'easeInOut' }}
            style={{ display:'flex',alignItems:'center',gap:'16px',marginBottom:'36px' }}>
            <img src="/logo.png" alt="Thrinxs" style={{ height:'72px',width:'auto',objectFit:'contain',filter:'drop-shadow(0 8px 24px rgba(217,119,6,0.50))' }}/>
            <div style={{ display:'flex',flexDirection:'column',lineHeight:1 }}>
              <span style={{ fontSize:'36px',fontWeight:900,background:'linear-gradient(135deg,#fcd34d,#d97706)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',letterSpacing:'-1px' }}>Thrinxs</span>
              <span style={{ fontSize:'11px',fontWeight:700,letterSpacing:'0.3em',color:'#b45309',textTransform:'uppercase',marginTop:'4px' }}>CMS Platform</span>
            </div>
          </motion.div>

          <motion.h2 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4,duration:0.6 }}
            style={{ fontSize:'26px',fontWeight:800,color:'white',textAlign:'center',marginBottom:'12px',lineHeight:1.3 }}>
            Manage your content,{' '}
            <span style={{ background:'linear-gradient(135deg,#fcd34d,#d97706)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>beautifully.</span>
          </motion.h2>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6,duration:0.6 }}
            style={{ color:'rgba(255,255,255,0.45)',fontSize:'15px',textAlign:'center',maxWidth:'300px',lineHeight:1.65,marginBottom:'40px' }}>
            A powerful headless CMS built for developers and non-technical teams in Nigeria and beyond.
          </motion.p>

          <div style={{ display:'flex',flexWrap:'wrap',gap:'10px',justifyContent:'center' }}>
            {features.map((f,i) => { const Icon = f.icon; return (
              <motion.div key={f.label} className="feature-pill" initial={{ opacity:0,scale:0.7 }} animate={{ opacity:1,scale:1 }} transition={{ delay:0.8+i*0.09,duration:0.35 }}
                style={{ display:'flex',alignItems:'center',gap:'7px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.10)',borderRadius:'100px',padding:'8px 16px',cursor:'default',transition:'all 0.2s ease' }}>
                <Icon size={13} color="#fbbf24"/>
                <span style={{ color:'rgba(255,255,255,0.70)',fontSize:'12px',fontWeight:500 }}>{f.label}</span>
              </motion.div>
            )})}
          </div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.6 }}
            style={{ position:'absolute',bottom:'28px',display:'flex',alignItems:'center',gap:'6px',color:'rgba(251,191,36,0.35)',fontSize:'12px' }}>
            <Sparkles size={12}/> Built by Thrinxs · Port Harcourt, Nigeria
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div initial={{ opacity:0,x:50 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.7,ease:'easeOut' }}
          style={{ flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',position:'relative',zIndex:10 }}>
          <div style={{ width:'100%',maxWidth:'420px' }}>

            {/* Mobile logo */}
            <motion.div className="mobile-logo" initial={{ opacity:0,y:-16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}>
              <motion.div animate={{ y:[0,-6,0] }} transition={{ duration:3,repeat:Infinity,ease:'easeInOut' }}
                style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',marginBottom:'28px' }}>
                <img src="/logo.png" alt="Thrinxs" style={{ height:'48px',width:'auto',objectFit:'contain',filter:'drop-shadow(0 4px 16px rgba(217,119,6,0.45))' }}/>
                <div style={{ display:'flex',flexDirection:'column',lineHeight:1 }}>
                  <span style={{ fontSize:'24px',fontWeight:900,background:'linear-gradient(135deg,#fcd34d,#d97706)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',letterSpacing:'-0.5px' }}>Thrinxs</span>
                  <span style={{ fontSize:'9px',fontWeight:700,letterSpacing:'0.25em',color:'#b45309',textTransform:'uppercase',marginTop:'3px' }}>CMS Platform</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Card */}
            <div style={{ background:'rgba(255,255,255,0.04)',backdropFilter:'blur(28px)',WebkitBackdropFilter:'blur(28px)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'28px',padding:'36px',boxShadow:'0 32px 72px rgba(0,0,0,0.5)' }}>

              <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2,duration:0.5 }} style={{ marginBottom:'28px' }}>
                <h1 style={{ fontSize:'22px',fontWeight:700,color:'white',marginBottom:'6px' }}>Welcome back</h1>
                <p style={{ color:'rgba(255,255,255,0.38)',fontSize:'13px' }}>Sign in to your Thrinxs CMS account</p>
              </motion.div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity:0,y:-8,height:0 }} animate={{ opacity:1,y:0,height:'auto' }} exit={{ opacity:0,y:-8,height:0 }}
                    style={{ display:'flex',alignItems:'center',gap:'8px',background:'rgba(239,68,68,0.12)',border:'1px solid rgba(239,68,68,0.25)',borderRadius:'12px',padding:'12px 14px',marginBottom:'18px',animation:'shake 0.3s ease' }}>
                    <AlertCircle size={15} color="#f87171"/>
                    <span style={{ color:'#f87171',fontSize:'13px' }}>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:'18px' }}>

                <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3,duration:0.45 }}>
                  <label style={{ display:'block',fontSize:'13px',fontWeight:500,color:'rgba(255,255,255,0.55)',marginBottom:'8px' }}>Email address</label>
                  <input type="email" placeholder="you@example.com" value={email} required
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocusField('email')} onBlur={() => setFocusField(null)}
                    style={inputStyle('email')}/>
                </motion.div>

                <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.38,duration:0.45 }}>
                  <label style={{ display:'block',fontSize:'13px',fontWeight:500,color:'rgba(255,255,255,0.55)',marginBottom:'8px' }}>Password</label>
                  <div style={{ position:'relative' }}>
                    <input type={showPass ? 'text' : 'password'} placeholder="Your password" value={password} required
                      onChange={e => setPassword(e.target.value)}
                      onFocus={() => setFocusField('password')} onBlur={() => setFocusField(null)}
                      style={{ ...inputStyle('password'),paddingRight:'46px' }}/>
                    <button type="button" onClick={() => setShowPass(p => !p)}
                      style={{ position:'absolute',right:'14px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.35)',display:'flex',padding:0 }}>
                      {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.46,duration:0.4 }}
                  style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                  <label onClick={() => setRemember(r => !r)} style={{ display:'flex',alignItems:'center',gap:'8px',cursor:'pointer' }}>
                    <div style={{ width:'17px',height:'17px',borderRadius:'5px',border:`1.5px solid ${remember ? '#d97706' : 'rgba(255,255,255,0.22)'}`,background:remember ? '#d97706' : 'transparent',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.2s ease',flexShrink:0 }}>
                      {remember && <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{ fontSize:'13px',color:'rgba(255,255,255,0.42)' }}>Remember me</span>
                  </label>
                  <a href="/forgot-password" style={{ fontSize:'13px',color:'#d97706',textDecoration:'none',fontWeight:600 }}>Forgot password?</a>
                </motion.div>

                <motion.button type="submit" disabled={loading}
                  initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.54,duration:0.45 }}
                  whileHover={{ scale:loading ? 1 : 1.025 }} whileTap={{ scale:loading ? 1 : 0.975 }}
                  style={{ width:'100%',height:'50px',borderRadius:'14px',background:'linear-gradient(135deg,#f59e0b,#b45309)',border:'none',color:'white',fontWeight:700,fontSize:'15px',cursor:loading ? 'not-allowed' : 'pointer',opacity:loading ? 0.7 : 1,display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',boxShadow:'0 6px 24px rgba(217,119,6,0.40)',transition:'filter 0.2s ease',marginTop:'4px' }}>
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span key="l" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} style={{ display:'flex',alignItems:'center',gap:'8px' }}>
                        <div style={{ width:'16px',height:'16px',border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',animation:'spinR 0.7s linear infinite' }}/>
                        Signing in...
                      </motion.span>
                    ) : (
                      <motion.span key="i" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} style={{ display:'flex',alignItems:'center',gap:'8px' }}>
                        Sign in <ArrowRight size={16}/>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.62 }}
                style={{ display:'flex',alignItems:'center',gap:'12px',margin:'22px 0' }}>
                <div style={{ flex:1,height:'1px',background:'rgba(255,255,255,0.07)' }}/>
                <span style={{ color:'rgba(255,255,255,0.22)',fontSize:'12px' }}>or continue with</span>
                <div style={{ flex:1,height:'1px',background:'rgba(255,255,255,0.07)' }}/>
              </motion.div>

              <motion.button type="button" className="google-btn"
                initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.68 }}
                whileHover={{ scale:1.015 }} whileTap={{ scale:0.985 }}
                style={{ width:'100%',height:'48px',borderRadius:'14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',color:'rgba(255,255,255,0.55)',fontSize:'13px',fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',transition:'all 0.2s ease' }}>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </motion.button>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.75 }}
                style={{ textAlign:'center',fontSize:'13px',color:'rgba(255,255,255,0.32)',marginTop:'22px' }}>
                No account?{' '}
                <a href="/signup" style={{ color:'#f59e0b',fontWeight:700,textDecoration:'none' }}>Sign up free</a>
              </motion.p>
            </div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
              style={{ display:'flex',justifyContent:'center',gap:'20px',marginTop:'20px' }}>
              {['🔒 SSL Secured','🇳🇬 Nigeria-first','⚡ 99.9% Uptime'].map(b => (
                <span key={b} style={{ color:'rgba(255,255,255,0.20)',fontSize:'11px' }}>{b}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
