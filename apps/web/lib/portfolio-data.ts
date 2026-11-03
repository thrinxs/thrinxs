export type ProjectStat = { v: string; l: string }

export type Project = {
  slug: string
  number: string
  category: string
  founderProject?: boolean
  url: string
  location: string
  name: string
  tagline: string
  description: string
  logo: string
  color: string
  stats: ProjectStat[]
  deliverables: string[]
  founderNote?: { quote: string; author: string; title: string }
  testimonial?: { quote: string; author: string; title: string }
}

export const projects: Project[] = [
  {
    slug: 'dr-josh-therapy-centre',
    number: '01',
    category: 'Healthcare & Wellness',
    founderProject: true,
    url: 'https://drjoshtherapycentre.com.ng',
    location: 'Port Harcourt, Nigeria',
    name: 'Dr. Josh Therapy Centre',
    tagline: 'Built by our founder — a unified digital platform for Port Harcourt’s leading therapy centre.',
    description: 'Dr. Josh Therapy Centre is one of Port Harcourt’s leading therapy and wellness brands — and it was founded by our own CEO, Baridubari Joshua Joe-Amos. When it came time to build the digital platform, Josh didn’t outsource it. He built it himself, applying the same standards and principles Thrinxs brings to every client project. The platform unifies four distinct brand verticals — therapy services, a nonprofit foundation, a podcast, and a matchmaking platform — with secure online booking, Paystack payments, and a seamless experience across all four brands.',
    logo: '/images/logos/dr-josh.png',
    color: '#0891b2',
    stats: [
      { v: '1,000+', l: 'Clients Served' },
      { v: '4', l: 'Brand Verticals' },
      { v: '2020', l: 'Est. Year' },
    ],
    deliverables: [
      'Website Design & Development',
      'Brand Identity',
      'UX Architecture',
      'Payment Integration',
    ],
    founderNote: {
      quote: 'I built Dr. Josh Therapy Centre’s platform the same way I’d build it for any client — with the same level of care, architecture, and attention to detail. I mapped out every user flow, every page, every design decision before writing a single line of code. The goal was a platform our brand could genuinely scale on. Four brand verticals, one seamless experience, Paystack-integrated payments, and 1,000+ clients served. This is the standard we hold ourselves to — and it’s the same standard we bring to every project we take on.',
      author: 'Baridubari Joshua Joe-Amos',
      title: 'Founder & CEO, Thrinxs — Founder, Dr. Josh Therapy Centre',
    },
  },
  {
    slug: 'amyserves',
    number: '02',
    category: 'Business Support',
    url: 'https://amyserves.com',
    location: 'Abuja, Nigeria',
    name: 'AmyServes Group',
    tagline: 'One digital home for a business support group with two specialist brands.',
    description: 'AmyServes brings professional cleaning and HR consulting under one roof for growing businesses across Nigeria. We designed and built their full marketing website, creating a clear structure that communicates two specialist brands — Pura-Kle’N (professional cleaning) and Yourfirm Consults (HR & workforce consulting) — without overwhelming visitors. The site covers services, client trust signals, nationwide locations, and a clear enquiry flow.',
    logo: '/images/logos/amyserves.png',
    color: '#059669',
    stats: [
      { v: '50+', l: 'Clients' },
      { v: '2,000+', l: 'Staff Managed' },
      { v: '6+', l: 'Years in Operation' },
    ],
    deliverables: [
      'Website Design & Development',
      'UX / Information Architecture',
      'Brand & Content Structure',
      'Conversion-focused Layout',
    ],
  },
  {
    slug: 'tomparo',
    number: '03',
    category: 'SaaS / AI Platform',
    url: 'https://tomparo.com',
    location: 'Nigeria',
    name: 'Tomparo',
    tagline: 'Nigeria’s first AI-native career intelligence platform, built end-to-end by our team.',
    description: 'Tomparo is Nigeria’s first AI-native career intelligence platform — built to help job seekers get hired faster and recruiters hire smarter. We designed and engineered the entire platform from scratch: product architecture, brand identity, UX design, and full-stack development. The result is a modern SaaS product that uses artificial intelligence to transform how Nigerian professionals navigate their careers.',
    logo: '/images/logos/tomparo.png',
    color: '#7c3aed',
    stats: [
      { v: 'AI-First', l: 'Career Platform' },
      { v: '2026', l: 'Launch Year' },
      { v: 'Full', l: 'End-to-End Build' },
    ],
    deliverables: [
      'Full-Stack SaaS Development',
      'Brand Identity & Design',
      'UX Architecture',
      'Product Architecture',
    ],
  },
  {
    slug: 'thrinxs',
    number: '04',
    category: 'SaaS / Agency Platform',
    url: 'https://thrinxs.com.ng',
    location: 'Port Harcourt, Nigeria',
    name: 'Thrinxs',
    tagline: 'Our own platform — from marketing site to CMS, AI builder, and hosted infrastructure.',
    description: 'We didn’t just build a website for ourselves — we built an entire digital platform. Thrinxs.com.ng is the marketing front for a full SaaS ecosystem that includes a headless CMS, an AI website builder, hosted website infrastructure for clients, and a multi-tenant user role system. Every part of it was designed, engineered, and shipped by our own team.',
    logo: '/logo.png',
    color: '#d97706',
    stats: [
      { v: '2023', l: 'Founded' },
      { v: 'Full', l: 'SaaS Platform' },
      { v: '100%', l: 'Built In-House' },
    ],
    deliverables: [
      'Full-Stack SaaS Development',
      'Brand Identity & Design',
      'Product Architecture',
      'SEO & Performance',
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}