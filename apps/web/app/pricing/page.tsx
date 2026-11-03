import PricingPage from "@/components/pricing/pricing-page";

export const metadata = {
  title: "Pricing — Thrinxs",
  description: "Transparent pricing for websites, SaaS platforms, and digital services. Nigeria and international pricing available. Promo rates through December 2026.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "Pricing — Thrinxs",
    description: "Transparent pricing for websites, SaaS platforms, and digital services. Nigeria and international pricing available. Promo rates through December 2026.",
    url: "https://thrinxs.com.ng/pricing",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Thrinxs",
    description: "Transparent pricing for websites, SaaS platforms, and digital services. Nigeria and international pricing available. Promo rates through December 2026.",
  },
};

export default function Page() {
  return <PricingPage />;
}