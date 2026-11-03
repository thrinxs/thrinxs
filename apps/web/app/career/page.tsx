import CareerPage from "@/components/career/career-page";



export const metadata = {
  title: "Careers — Thrinxs",
  description: "Join the Thrinxs team as a Business Development Partner. Fully remote, performance-based, and built for ambitious self-starters.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "Careers — Thrinxs",
    description: "Join the Thrinxs team as a Business Development Partner. Fully remote, performance-based, and built for ambitious self-starters.",
    url: "https://thrinxs.com.ng/career",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — Thrinxs",
    description: "Join the Thrinxs team as a Business Development Partner. Fully remote, performance-based, and built for ambitious self-starters.",
  },
};
export default function Career() {
  return <CareerPage />;
}