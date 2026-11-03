import ServicesPage from "../../components/services/services-page"


export const metadata = {
  title: "Services — Thrinxs",
  description: "From full-stack development to SEO, branding, marketing, and growth strategy — explore everything Thrinxs builds for businesses in Nigeria and internationally.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "Services — Thrinxs",
    description: "From full-stack development to SEO, branding, marketing, and growth strategy — explore everything Thrinxs builds for businesses in Nigeria and internationally.",
    url: "https://thrinxs.com.ng/services",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Thrinxs",
    description: "From full-stack development to SEO, branding, marketing, and growth strategy — explore everything Thrinxs builds for businesses in Nigeria and internationally.",
  },
};
export default function Page() {
  return <ServicesPage />
}