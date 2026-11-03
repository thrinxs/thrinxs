"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

const codeLines = [
  { indent: 0, tokens: [{ t: 'keyword', v: 'import' }, { t: 'plain', v: ' React ' }, { t: 'keyword', v: 'from' }, { t: 'string', v: " 'react'" }] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'import' }, { t: 'plain', v: ' { useState } ' }, { t: 'keyword', v: 'from' }, { t: 'string', v: " 'react'" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'const' }, { t: 'fn', v: ' HomePage' }, { t: 'plain', v: ' = () => {' }] },
  { indent: 1, tokens: [{ t: 'keyword', v: 'return' }, { t: 'plain', v: ' (' }] },
  { indent: 2, tokens: [{ t: 'tag', v: '<main' }, { t: 'attr', v: ' className' }, { t: 'plain', v: '=' }, { t: 'string', v: '"hero"' }, { t: 'tag', v: '>' }] },
  { indent: 3, tokens: [{ t: 'tag', v: '<h1>' }, { t: 'plain', v: 'Welcome' }, { t: 'tag', v: '</h1>' }] },
  { indent: 3, tokens: [{ t: 'tag', v: '<p' }, { t: 'attr', v: ' style' }, { t: 'plain', v: '={{' }, { t: 'attr', v: 'color' }, { t: 'plain', v: ': ' }, { t: 'string', v: "'gold'" }, { t: 'plain', v: '}}>' }] },
  { indent: 4, tokens: [{ t: 'string', v: 'Your digital presence starts here' }] },
  { indent: 3, tokens: [{ t: 'tag', v: '</p>' }] },
  { indent: 2, tokens: [{ t: 'tag', v: '</main>' }] },
  { indent: 1, tokens: [{ t: 'plain', v: ')' }] },
  { indent: 0, tokens: [{ t: 'plain', v: '}' }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'export' }, { t: 'plain', v: ' ' }, { t: 'keyword', v: 'default' }, { t: 'plain', v: ' HomePage' }] },
]

const tokenColors: Record<string, string> = {
  keyword: '#c084fc',
  fn: '#60a5fa',
  tag: '#f87171',
  attr: '#fbbf24',
  string: '#86efac',
  plain: '#e2e8f0',
}

const particles = [
  { symbol: '</', x: 8, y: 15, delay: 0, size: 14 },
  { symbol: '{  }', x: 85, y: 10, delay: 1, size: 12 },
  { symbol: '=>', x: 75, y: 70, delay: 2, size: 13 },
  { symbol: '( )', x: 5, y: 75, delay: 0.5, size: 11 },
  { symbol: '&&', x: 92, y: 40, delay: 1.5, size: 12 },
  { symbol: '/**/', x: 15, y: 50, delay: 2.5, size: 10 },
  { symbol: '#', x: 50, y: 5, delay: 3, size: 16 },
  { symbol: '[ ]', x: 60, y: 88, delay: 1.2, size: 11 },
]

const browserSlides = [
  {
    color: '#7c3aed',
    label: 'UI Design',
    bars: ['#a78bfa', '#8b5cf6', '#c4b5fd', '#ddd6fe'],
    desc: 'Building components...',
  },
  {
    color: '#0891b2',
    label: 'Frontend Dev',
    bars: ['#22d3ee', '#06b6d4', '#67e8f9', '#a5f3fc'],
    desc: 'Compiling React...',
  },
  {
    color: '#d97706',
    label: 'Deployment',
    bars: ['#fbbf24', '#f59e0b', '#fcd34d', '#fde68a'],
    desc: 'Going live...',
  },
]

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(v => v < codeLines.length ? v + 1 : v)
    }, 200)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setSlideIndex(i => (i + 1) % browserSlides.length), 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(timer)
  }, [])

  const slide = browserSlides[slideIndex]

  return (
    <section style={{ minHeight: '100vh', background: '#05050a', display: 'flex', alignItems: 'center', padding: isMobile ? '10px 20px 60px' : '30px 32px 100px', position: 'relative', overflow: 'hidden' }}>

      {/* Grid background */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      {/* Radial glow */}
      <div style={{ position: 'absolute', top: '30%', left: '30%', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 65%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 65%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          color: 'rgba(245,158,11,0.25)', fontSize: `${p.size}px`,
          fontFamily: 'monospace', fontWeight: 700,
          animation: `particleDrift ${4 + p.delay}s ease-in-out infinite`,
          animationDelay: `${p.delay}s`,
          pointerEvents: 'none', userSelect: 'none',
          textShadow: '0 0 20px rgba(245,158,11,0.4)',
        }}>
          {p.symbol}
        </div>
      ))}

      <div style={{ maxWidth: '1320px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '48px' : '80px', alignItems: 'center' }}>

          {/* LEFT: Text */}
          <div>
            <div className="animate-fadeUp opacity-0" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '100px', padding: '8px 20px', marginBottom: '36px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 10px #22c55e' }} />
              <span style={{ fontSize: '13px', color: '#fcd34d', fontWeight: 600, letterSpacing: '0.02em' }}>Now serving businesses globally</span>
            </div>

            <h1 className="animate-fadeUp opacity-0 delay-100" style={{ fontSize: 'clamp(34px, 5.5vw, 72px)', fontWeight: 900, lineHeight: 1.05, color: '#ffffff', marginBottom: '28px', letterSpacing: '-1.5px' }}>
              We Build, Grow{''}<br />
              <span className="gold-gradient">&amp; Manage</span> Your<br />
              Digital Presence
            </h1>

            <p className="animate-fadeUp opacity-0 delay-200" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: '#9ca3af', lineHeight: 1.75, marginBottom: '44px', maxWidth: '520px' }}>
              A team of designers, developers, and digital strategists helping businesses worldwide — from websites and apps to SEO, social media, and paid ads.
            </p>

            <div className="animate-fadeUp opacity-0 delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '56px' }}>
              <Link href="/get-started" className="btn-primary" style={{ padding: '16px 40px', fontSize: '15px' }}>
                Start Your Project →
              </Link>
              <Link href="/services" className="btn-secondary" style={{ padding: '16px 40px', fontSize: '15px' }}>
                Explore Services
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fadeUp opacity-0 delay-400 stats-row" style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '24px 32px' : '48px' }}>
              {[
                { v: '6+', l: 'Projects Delivered' },
                { v: '6+', l: 'Clients Served' },
                { v: 'Global', l: 'Reach' },
                { v: '2023', l: 'Est.' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="gold-gradient" style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px', letterSpacing: '0.05em' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Tech Mockups — hidden on mobile */}
          {!isMobile && (
          <div className="hero-mockup animate-fadeLeft opacity-0 delay-300" style={{ position: 'relative', height: '580px' }}>

            {/* Code Editor */}
            <div className="animate-float" style={{
              position: 'absolute', top: 0, left: 0, right: '10%',
              background: '#0d1117', borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.1)',
            }}>
              {/* Title bar */}
              <div style={{ background: '#161b22', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: '12px', fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}>HomePage.tsx</span>
              </div>
              {/* Code lines */}
              <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '11.5px', lineHeight: 1.8, minHeight: '200px', overflow: 'hidden' }}>
                {codeLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} style={{ display: 'flex', paddingLeft: `${line.indent * 16}px`, whiteSpace: 'nowrap' }}>
                    <span style={{ color: '#374151', marginRight: '16px', userSelect: 'none', minWidth: '24px', textAlign: 'right' }}>{i + 1}</span>
                    {line.tokens.map((tok, j) => (
                      <span key={j} style={{ color: tokenColors[tok.t] || '#e2e8f0' }}>{tok.v}</span>
                    ))}
                    {i === visibleLines - 1 && (
                      <span style={{ display: 'inline-block', width: '8px', height: '14px', background: '#fcd34d', marginLeft: '2px', opacity: cursorVisible ? 1 : 0, verticalAlign: 'middle' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Browser Mockup */}
            <div className="animate-float2" style={{
              position: 'absolute', bottom: 0, right: 0, left: '12%',
              background: '#0d1117', borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 40px rgba(245,158,11,0.08)',
            }}>
              <div style={{ background: '#161b22', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5f57' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#febc2e' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28c840' }} />
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '4px 10px', marginLeft: '8px' }}>
                  <span style={{ fontSize: '10px', color: '#6b7280', fontFamily: 'monospace' }}>https://yourclient.com</span>
                </div>
              </div>
              <div style={{ padding: '14px', background: '#0a0a14', minHeight: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: `linear-gradient(135deg, ${slide.color}, ${slide.bars[0]})` }} />
                  <div style={{ height: '8px', width: '80px', background: slide.bars[0], borderRadius: '4px', opacity: 0.8 }} />
                  <div style={{ height: '8px', flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
                </div>
                <div style={{ height: '60px', background: `linear-gradient(135deg, ${slide.color}22, ${slide.bars[0]}11)`, borderRadius: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${slide.bars[0]}33` }}>
                  <span style={{ fontSize: '10px', color: slide.bars[0], fontFamily: 'monospace', fontWeight: 700 }}>{slide.label}</span>
                </div>
                {slide.bars.map((bar, i) => (
                  <div key={i} style={{ height: '6px', background: i % 2 === 0 ? `${bar}66` : 'rgba(255,255,255,0.04)', borderRadius: '3px', marginBottom: '6px', width: i === 1 ? '70%' : i === 3 ? '50%' : '100%', transition: 'all 0.6s ease' }} />
                ))}
                <div style={{ marginTop: '10px', display: 'flex', gap: '6px' }}>
                  <div style={{ height: '20px', flex: 1, background: `linear-gradient(135deg, ${slide.color}, ${slide.bars[0]})`, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8px', color: '#000', fontWeight: 800 }}>DEPLOY</span>
                  </div>
                  <div style={{ height: '20px', flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '8px', color: '#9ca3af' }}>PREVIEW</span>
                  </div>
                </div>
                <p style={{ fontSize: '9px', color: '#6b7280', marginTop: '8px', fontFamily: 'monospace' }}>{slide.desc}</p>
              </div>
            </div>

            {/* Floating badge 1 */}
            <div style={{
              position: 'absolute', top: '38%', right: '-5%', zIndex: 10,
              background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
              borderRadius: '12px', padding: '10px 16px',
              boxShadow: '0 8px 32px rgba(124,58,237,0.4)',
              animation: 'floatY2 4s ease-in-out infinite',
              animationDelay: '1s',
            }}>
              <div style={{ fontSize: '10px', color: '#e9d5ff', fontWeight: 700, whiteSpace: 'nowrap' }}>React + Next.js</div>
              <div style={{ fontSize: '8px', color: '#a78bfa', marginTop: '2px' }}>Frontend Framework</div>
            </div>

            {/* Floating badge 2 */}
            <div style={{
              position: 'absolute', bottom: '35%', left: '-2%', zIndex: 10,
              background: 'linear-gradient(135deg, #065f46, #047857)',
              borderRadius: '12px', padding: '10px 16px',
              boxShadow: '0 8px 32px rgba(6,95,70,0.5)',
              animation: 'floatY 5s ease-in-out infinite',
              animationDelay: '0.5s',
            }}>
              <div style={{ fontSize: '10px', color: '#a7f3d0', fontWeight: 700, whiteSpace: 'nowrap' }}>Live in 7–14 Days</div>
              <div style={{ fontSize: '8px', color: '#6ee7b7', marginTop: '2px' }}>Fast Delivery</div>
            </div>

            {/* Floating badge 3 */}
            <div style={{
              position: 'absolute', top: '8%', right: '15%', zIndex: 10,
              background: 'linear-gradient(135deg, #92400e, #d97706)',
              borderRadius: '12px', padding: '10px 16px',
              boxShadow: '0 8px 32px rgba(217,119,6,0.4)',
              animation: 'floatY2 3.5s ease-in-out infinite',
              animationDelay: '2s',
            }}>
              <div style={{ fontSize: '10px', color: '#fef3c7', fontWeight: 700, whiteSpace: 'nowrap' }}>100% Responsive</div>
              <div style={{ fontSize: '8px', color: '#fcd34d', marginTop: '2px' }}>Mobile First</div>
            </div>

          </div>
          )}
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      {!isMobile && (
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
          <span style={{ fontSize: '10px', color: '#4b5563', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #d97706, transparent)' }} />
        </div>
      )}
    </section>
  )
}