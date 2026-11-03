import Navbar from '@/components/navbar'
import Hero from '@/components/home/hero'
import ServicesSection from '@/components/home/services-section'
import WhyUs from '@/components/home/why-us'
import PricingSnapshot from '@/components/home/pricing-snapshot'
import CaseStudy from '@/components/home/case-study'
import SalesRepBanner from '@/components/home/sales-rep-banner'
import FinalCta from '@/components/home/final-cta'
import Footer from '@/components/footer'



export const metadata = {
  title: "Thrinxs — We Build, Grow & Manage Your Digital Presence",
  description: "Thrinxs is a full-service digital agency based in Port Harcourt, Nigeria. We build websites, SaaS platforms, and digital growth systems for businesses worldwide.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "Thrinxs — We Build, Grow & Manage Your Digital Presence",
    description: "Thrinxs is a full-service digital agency based in Port Harcourt, Nigeria. We build websites, SaaS platforms, and digital growth systems for businesses worldwide.",
    url: "https://thrinxs.com.ng",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thrinxs — We Build, Grow & Manage Your Digital Presence",
    description: "Thrinxs is a full-service digital agency based in Port Harcourt, Nigeria. We build websites, SaaS platforms, and digital growth systems for businesses worldwide.",
  },
};
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesSection />
      <WhyUs />
      <PricingSnapshot />
      <CaseStudy />
      <SalesRepBanner />
      <FinalCta />
      <Footer />
    </main>
  )
}
