import ContactPage from "@/components/contact/contact-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Thrinxs",
  description: "Get in touch with the Thrinxs team. We're ready to help you build, grow, and manage your digital presence.",
}



export const metadata = {
  title: "Contact Us — Thrinxs",
  description: "Get in touch with the Thrinxs team. Based in Port Harcourt, Nigeria, working with clients globally. WhatsApp, email, or fill out the form.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "Contact Us — Thrinxs",
    description: "Get in touch with the Thrinxs team. Based in Port Harcourt, Nigeria, working with clients globally. WhatsApp, email, or fill out the form.",
    url: "https://thrinxs.com.ng/contact",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — Thrinxs",
    description: "Get in touch with the Thrinxs team. Based in Port Harcourt, Nigeria, working with clients globally. WhatsApp, email, or fill out the form.",
  },
};
export default function Page() {
  return <ContactPage />
}
