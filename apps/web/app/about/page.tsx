import AboutPage from "@/components/about/about-page";



export const metadata = {
  title: "About Us — Thrinxs",
  description: "Thrinxs is a digital agency founded in 2023 in Port Harcourt, Nigeria. Meet the team behind the builds and learn what we stand for.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "About Us — Thrinxs",
    description: "Thrinxs is a digital agency founded in 2023 in Port Harcourt, Nigeria. Meet the team behind the builds and learn what we stand for.",
    url: "https://thrinxs.com.ng/about",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — Thrinxs",
    description: "Thrinxs is a digital agency founded in 2023 in Port Harcourt, Nigeria. Meet the team behind the builds and learn what we stand for.",
  },
};
export default function About() {
  return <AboutPage />;
}