"use client";

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com/thrinxs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/thrinxs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com/thrinxs",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/thrinxs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/2349033440966",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
];

const footerLinks = {
  Services: [
    { label: "Website Development", href: "/services#web" },
    { label: "App Development", href: "/services#app" },
    { label: "SEO & Analytics", href: "/services#seo" },
    { label: "Social Media", href: "/services#social" },
    { label: "Ads Management", href: "/services#ads" },
    { label: "Brand & Identity", href: "/services#brand" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/careers" },
    { label: "Affiliate Program", href: "/affiliate" },
    { label: "Sales Rep Program", href: "/sales-rep-program" },
  ],
  Resources: [
    { label: "Get Started", href: "/get-started" },
    { label: "Contact Us", href: "/contact" },
    { label: "Documentation", href: "https://docs.thrinxs.com.ng" },
    { label: "Thrinxs CMS", href: "https://cms.thrinxs.com.ng" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      background: "#050505",
      borderTop: "1px solid rgba(245,158,11,0.1)",
      padding: "80px 0 32px",
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .footer-links-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-bottom { flex-direction: column !important; gap: 12px !important; text-align: center; }
        }
        @media (max-width: 480px) {
          .footer-links-grid { grid-template-columns: 1fr !important; }
        }
        .footer-social-icon:hover { background: rgba(245,158,11,0.2) !important; color: #f59e0b !important; border-color: rgba(245,158,11,0.4) !important; }
        .footer-link:hover { color: #f59e0b !important; }
      ` }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "80px", marginBottom: "64px" }}>

          {/* brand col */}
          <div>
            <img src="/logo-white.png" alt="Thrinxs" style={{ height: "36px", marginBottom: "16px", objectFit: "contain" }} />
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.75, marginBottom: "28px" }}>
              A team of designers, developers, and digital strategists helping businesses build, grow, and manage their digital presence.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" as const }}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="footer-social-icon"
                  style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#9ca3af", textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div style={{ marginTop: "28px", display: "flex", flexDirection: "column" as const, gap: "8px" }}>
              <a href="mailto:info@thrinxs.com.ng" style={{ color: "#6b7280", fontSize: "13px", textDecoration: "none" }}>
                info@thrinxs.com.ng
              </a>
              <a href="tel:+2349033440966" style={{ color: "#6b7280", fontSize: "13px", textDecoration: "none" }}>
                +234 903 344 0966
              </a>
              <p style={{ color: "#4b5563", fontSize: "12px", margin: 0, lineHeight: 1.6 }}>
                No. 26 Elekahia Road, off Stadium Road,<br />Port Harcourt, Rivers State, Nigeria
              </p>
            </div>
          </div>

          {/* links grid */}
          <div className="footer-links-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4 style={{ color: "#ffffff", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "16px" }}>
                  {group}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="footer-link"
                        style={{ color: "#6b7280", fontSize: "14px", textDecoration: "none", transition: "color 0.2s ease" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "28px" }}>
          <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: "#4b5563", fontSize: "13px", margin: 0 }}>
              © {new Date().getFullYear()} Thrinxs Ltd. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "24px" }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
                <a key={t} href="#" style={{ color: "#4b5563", fontSize: "13px", textDecoration: "none" }}>{t}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
