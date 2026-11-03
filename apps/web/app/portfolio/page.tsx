import PortfolioPage from '@/components/portfolio/portfolio-page'


export const metadata = {
  title: "Portfolio — Thrinxs",
  description: "Browse the platforms, products, and brands we've built. From healthcare SaaS to AI career tools — Thrinxs delivers at every scale.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "Portfolio — Thrinxs",
    description: "Browse the platforms, products, and brands we've built. From healthcare SaaS to AI career tools — Thrinxs delivers at every scale.",
    url: "https://thrinxs.com.ng/portfolio",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Thrinxs",
    description: "Browse the platforms, products, and brands we've built. From healthcare SaaS to AI career tools — Thrinxs delivers at every scale.",
  },
};
export default function Page() {
  return <PortfolioPage />
}