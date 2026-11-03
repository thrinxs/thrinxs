import SalesRepPage from "../../components/sales-rep/sales-rep-page"


export const metadata = {
  title: "Business Development Partner Program — Thrinxs",
  description: "Earn 10–30% commission introducing businesses to Thrinxs. No cap. Performance-based promotions. Fully remote. Apply today.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "Business Development Partner Program — Thrinxs",
    description: "Earn 10–30% commission introducing businesses to Thrinxs. No cap. Performance-based promotions. Fully remote. Apply today.",
    url: "https://thrinxs.com.ng/sales-rep",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Development Partner Program — Thrinxs",
    description: "Earn 10–30% commission introducing businesses to Thrinxs. No cap. Performance-based promotions. Fully remote. Apply today.",
  },
};
export default function Page() {
  return <SalesRepPage />
}