'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Affiliate', href: '/affiliate' },
  { label: 'Career', href: '/career' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(5,5,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.12)' : 'none',
        padding: scrolled ? '14px 0' : '24px 0',
      }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href='/' style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ position: 'relative' }}>
              <img src='/logo.png' alt='Thrinxs' style={{ height: '42px', width: 'auto', position: 'relative', zIndex: 1 }} />
              <div style={{ position: 'absolute', inset: '-4px', background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(8px)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span className='gold-gradient' style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px' }}>Thrinxs</span>
              <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#78350f', textTransform: 'uppercase', marginTop: '3px', fontWeight: 600 }}>Digital Agency</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className='nav-links' style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {links.map(link => (
              <Link key={link.href} href={link.href} style={{
                color: '#9ca3af', textDecoration: 'none', fontSize: '13.5px',
                fontWeight: 500, padding: '8px 14px', borderRadius: '8px',
                transition: 'all 0.2s', letterSpacing: '0.01em',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#fcd34d'; el.style.background = 'rgba(245,158,11,0.08)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#9ca3af'; el.style.background = 'transparent' }}>
                {link.label}
              </Link>
            ))}
            <Link href='/login' style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: '8px', padding: '10px 18px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(245,158,11,0.25)', color: '#f59e0b', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='11' width='18' height='11' rx='2'/><path d='M7 11V7a5 5 0 0 1 10 0v4'/></svg>
              Login
            </Link>
            <Link href='/get-started' className='btn-primary' style={{ marginLeft: '8px', padding: '11px 26px', fontSize: '13.5px', letterSpacing: '0.02em' }}>
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className='nav-mobile-btn' onClick={() => setOpen(!open)}
            style={{ display: 'none', flexDirection: 'column', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
            <span style={{ display: 'block', width: '26px', height: '2px', background: '#fcd34d', borderRadius: '2px', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(6px, 6px)' : 'none' }} />
            <span style={{ display: 'block', width: '26px', height: '2px', background: '#fcd34d', borderRadius: '2px', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: '26px', height: '2px', background: '#fcd34d', borderRadius: '2px', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ background: 'rgba(5,5,10,0.98)', borderTop: '1px solid rgba(245,158,11,0.12)', padding: '20px 32px 28px' }}>
            {links.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
                display: 'block', color: '#9ca3af', textDecoration: 'none',
                fontSize: '16px', fontWeight: 500, padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <Link href='/login' onClick={() => setOpen(false)} style={{ flex: 1, display: 'block', padding: '14px', textAlign: 'center', fontSize: '15px', fontWeight: 600, color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 10, textDecoration: 'none' }}>Login</Link>
              <Link href='/get-started' onClick={() => setOpen(false)} className='btn-primary' style={{ flex: 1, display: 'block', padding: '14px', textAlign: 'center', fontSize: '15px' }}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}