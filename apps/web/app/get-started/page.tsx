import GetStartedPage from "../../components/get-started/get-started-page"


export const metadata = {
  title: "Get Started — Thrinxs",
  description: "Tell us about your project. Choose your services, share your requirements, and we'll be in touch within 24 hours with a tailored proposal.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "Get Started — Thrinxs",
    description: "Tell us about your project. Choose your services, share your requirements, and we'll be in touch within 24 hours with a tailored proposal.",
    url: "https://thrinxs.com.ng/get-started",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Started — Thrinxs",
    description: "Tell us about your project. Choose your services, share your requirements, and we'll be in touch within 24 hours with a tailored proposal.",
  },
};
export default function Page() {
  return <GetStartedPage />
}