"use client";

import Link from 'next/link'

export default function FinalCta() {
  return (
    <section style={{ background: '#05050a', padding: '140px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '100px', padding: '8px 20px', marginBottom: '36px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e', display: 'inline-block' }} />
          <span style={{ fontSize: '13px', color: '#fcd34d', fontWeight: 600 }}>Currently accepting new clients</span>
        </div>

        <h2 style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '24px' }}>
          Ready to Grow Your{' '}
          <span className="gold-gradient">Digital Presence?</span>
        </h2>

        <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '52px', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto 52px' }}>
          Tell us about your business and let us build something exceptional together. Free consultation — no commitment.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          <Link href="/get-started" className="btn-primary" style={{ padding: '18px 48px', fontSize: '16px' }}>
            Start Your Project Today →
          </Link>
          <a href="https://wa.me/2349033440966" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', background: '#25D366',
            color: '#fff', padding: '18px 48px', borderRadius: '10px',
            fontWeight: 800, fontSize: '16px', textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(37,211,102,0.3)',
            transition: 'all 0.3s',
          }}>
            💬 WhatsApp Us
          </a>
        </div>

        <p style={{ fontSize: '13px', color: '#374151' }}>
          Or email us at{' '}
          <a href="mailto:info@thrinxs.com.ng" style={{ color: '#d97706', textDecoration: 'none', fontWeight: 600 }}>info@thrinxs.com.ng</a>
        </p>
      </div>
    </section>
  )
}
