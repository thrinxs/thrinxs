"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { projects } from '@/lib/portfolio-data'

export default function PortfolioPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section style={{ background: '#05050a', minHeight: '100vh', padding: isMobile ? '48px 20px 80px' : '64px 32px 100px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? '48px' : '72px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '100px', padding: '8px 20px', marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', color: '#fcd34d', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Work</span>
          </div>
          <h1 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, color: '#ffffff', letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: '20px' }}>
            Work We’re <span className="gold-gradient">Proud Of</span>
          </h1>
          <p style={{ fontSize: isMobile ? '15px' : '18px', color: '#9ca3af', lineHeight: 1.75, maxWidth: '560px' }}>
            A selection of projects we’ve designed, built, and shipped for clients across Nigeria and beyond.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
          {projects.map((project, i) => {
            const hovered = hoveredIndex === i
            return (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{
                  background: hovered ? '#0d0d1a' : '#080810',
                  border: `1px solid ${hovered ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '20px',
                  padding: '36px',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}18` : '0 4px 24px rgba(0,0,0,0.3)',
                  transform: hovered ? 'translateY(-4px)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '28px',
                  boxSizing: 'border-box',
                }}>

                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', color: '#4b5563', fontWeight: 700, letterSpacing: '0.15em', fontFamily: 'monospace' }}>{project.number}</span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {project.founderProject && (
                        <span style={{ fontSize: '10px', color: '#fcd34d', fontWeight: 700, letterSpacing: '0.06em', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '100px', padding: '4px 10px' }}>
                          ★ Founder’s Project
                        </span>
                      )}
                      <span style={{ fontSize: '11px', color: project.color, fontWeight: 600, letterSpacing: '0.06em', background: `${project.color}14`, border: `1px solid ${project.color}30`, borderRadius: '100px', padding: '4px 12px' }}>{project.category}</span>
                    </div>
                  </div>

                  {/* Logo + Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '14px', background: `${project.color}18`, border: `1px solid ${project.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      <img
                        src={project.logo}
                        alt={project.name}
                        style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '4px' }}>{project.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{project.location}</div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.7, margin: 0 }}>{project.tagline}</p>

                  {/* Stats */}
                  <div style={{ display: 'flex', gap: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {project.stats.map((stat, j) => (
                      <div key={j}>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: project.color, lineHeight: 1 }}>{stat.v}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', letterSpacing: '0.04em' }}>{stat.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span style={{ fontSize: '13px', color: project.color, fontWeight: 700, letterSpacing: '0.02em' }}>
                      View Case Study →
                    </span>
                    <span style={{ fontSize: '11px', color: '#4b5563' }}>{project.url.replace('https://', '')}</span>
                  </div>

                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: isMobile ? '64px' : '96px', textAlign: 'center', padding: isMobile ? '40px 24px' : '64px', background: '#080810', border: '1px solid rgba(245,158,11,0.12)', borderRadius: '24px' }}>
          <div style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 900, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Ready to be our next case study?
          </div>
          <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '36px', lineHeight: 1.7 }}>
            Let’s build something you’ll be proud of.
          </p>
          <Link href="/get-started" className="btn-primary" style={{ padding: '16px 48px', fontSize: '15px' }}>
            Start Your Project →
          </Link>
        </div>

      </div>
    </section>
  )
}