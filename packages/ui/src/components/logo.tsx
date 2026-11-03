'use client'

import Image from 'next/image'

interface LogoProps {
  size?:    'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon'
  animate?: boolean
  white?:   boolean
}

const sizes = {
  sm: { height: 28,  textSize: '16px' },
  md: { height: 36,  textSize: '20px' },
  lg: { height: 48,  textSize: '26px' },
  xl: { height: 64,  textSize: '34px' },
}

export function Logo({ size = 'md', variant = 'full', animate = false, white = false }: LogoProps) {
  const s = sizes[size]

  return (
    <div style={{
      display:    'flex',
      alignItems: 'center',
      gap:        '10px',
      animation:  animate ? 'logoFloat 3s ease-in-out infinite' : 'none',
    }}>
      {/* Logo image */}
      <img
        src="/logo.png"
        alt="Thrinxs"
        style={{
          height:    `${s.height}px`,
          width:     'auto',
          objectFit: 'contain',
          filter:    white ? 'brightness(0) invert(1)' : 'none',
        }}
      />

      {/* Wordmark — only show if no logo or as fallback */}
      {variant === 'full' && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            fontSize:             s.textSize,
            fontWeight:           900,
            background:           white
              ? 'white'
              : 'linear-gradient(135deg, #fcd34d, #d97706)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
          }}>
            Thrinxs
          </span>
          <span style={{
            fontSize:      '9px',
            fontWeight:    700,
            letterSpacing: '0.2em',
            color:         white ? 'rgba(255,255,255,0.6)' : '#d97706',
            textTransform: 'uppercase',
            marginTop:     '3px',
          }}>
            CMS
          </span>
        </div>
      )}

      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  )
}
