"use client"
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getProject } from '@/lib/portfolio-data'

export default function CaseStudyPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const project = getProject(slug)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!project) {
    return (
      <section style={{ background: '#05050a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#ffffff', marginBottom: '16px' }}>404</div>
          <div style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '32px' }}>Project not found.</div>
          <Link href="/portfolio" className="btn-primary" style={{ padding: '14px 36px' }}>← Back to Portfolio</Link>
        </div>
      </section>
    )
  }

  return (
    <section style={{ background: '#05050a', minHeight: '100vh', padding: isMobile ? '48px 20px 80px' : '64px 32px 100px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Back */}
        <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', fontSize: '14px', marginBottom: '48px', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fcd34d'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#6b7280'}>
          ← Back to Portfolio
        </Link>

        {/* Hero card */}
        <div style={{ background: '#080810', border: `1px solid ${project.color}25`, borderRadius: '24px', padding: isMobile ? '32px 24px' : '56px', marginBottom: '24px' }}>

          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#4b5563', fontWeight: 700, letterSpacing: '0.15em', fontFamily: 'monospace' }}>{project.number}</span>
            <span style={{ color: '#4b5563' }}>/</span>
            <span style={{ fontSize: '11px', color: project.color, fontWeight: 600, letterSpacing: '0.06em', background: `${project.color}14`, border: `1px solid ${project.color}30`, borderRadius: '100px', padding: '4px 12px' }}>{project.category}</span>
            {project.founderProject && (
              <>
                <span style={{ color: '#4b5563' }}>/</span>
                <span style={{ fontSize: '11px', color: '#fcd34d', fontWeight: 700, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '100px', padding: '4px 12px' }}>
                  ★ Founder’s Project
                </span>
              </>
            )}
            <span style={{ color: '#4b5563' }}>/</span>
            <span style={{ fontSize: '11px', color: '#6b7280' }}>{project.location}</span>
          </div>

          {/* Logo + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '18px', background: `${project.color}18`, border: `1px solid ${project.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
              <img
                src={project.logo}
                alt={project.name}
                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div>
              <h1 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 900, color: '#ffffff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '8px' }}>{project.name}</h1>
              <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: project.color, textDecoration: 'none', fontFamily: 'monospace' }}>
                {project.url.replace('https://', '')} ↗
              </a>
            </div>
          </div>

          <p style={{ fontSize: isMobile ? '15px' : '17px', color: '#9ca3af', lineHeight: 1.8, marginBottom: '40px' }}>{project.description}</p>

          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {project.stats.map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 900, color: project.color, lineHeight: 1 }}>{stat.v}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px', letterSpacing: '0.05em' }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div style={{ background: '#080810', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: isMobile ? '32px 24px' : '48px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '13px', color: '#6b7280', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px' }}>What We Delivered</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
            {project.deliverables.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.color, flexShrink: 0, boxShadow: `0 0 8px ${project.color}` }} />
                <span style={{ fontSize: '15px', color: '#e2e8f0', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Founder's Note */}
        {project.founderNote && (
          <div style={{ background: '#080810', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '24px', padding: isMobile ? '32px 24px' : '48px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '24px', left: '32px', fontSize: '80px', color: '#d97706', opacity: 0.07, fontFamily: 'serif', lineHeight: 1 }}>“</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <span style={{ fontSize: '13px', color: '#fcd34d', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>★ Founder’s Note</span>
            </div>
            <p style={{ fontSize: isMobile ? '15px' : '17px', color: '#d1d5db', lineHeight: 1.85, fontStyle: 'italic', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
              “{project.founderNote.quote}”
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #d97706, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: '#000', flexShrink: 0 }}>
                B
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{project.founderNote.author}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{project.founderNote.title}</div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Testimonial */}
        {project.testimonial && (
          <div style={{ background: '#080810', border: `1px solid ${project.color}20`, borderRadius: '24px', padding: isMobile ? '32px 24px' : '48px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '24px', left: '32px', fontSize: '80px', color: project.color, opacity: 0.08, fontFamily: 'serif', lineHeight: 1 }}>“</div>
            <h2 style={{ fontSize: '13px', color: '#6b7280', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px' }}>Client Testimonial</h2>
            <p style={{ fontSize: isMobile ? '15px' : '17px', color: '#d1d5db', lineHeight: 1.85, fontStyle: 'italic', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
              “{project.testimonial.quote}”
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${project.color}, ${project.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: '#000' }}>
                {project.testimonial.author.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{project.testimonial.author}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{project.testimonial.title}</div>
              </div>
            </div>
          </div>
        )}

        {/* Visit + CTA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', background: '#080810', border: '1px solid rgba(245,158,11,0.12)', borderRadius: '24px', padding: isMobile ? '28px 24px' : '40px 48px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>See it live</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Visit the finished product</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '14px 32px', fontSize: '14px', textDecoration: 'none', display: 'inline-block' }}>
              Visit Website ↗
            </a>
            <Link href="/get-started" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '14px' }}>
              Start Your Project
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}