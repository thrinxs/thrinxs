import AffiliatePage from "@/components/affiliate/affiliate-page";



export const metadata = {
  title: "Affiliate Program — Thrinxs",
  description: "Earn 5% on every completed sale you refer to Thrinxs. Paid every Friday. No cap. Open to individuals and businesses in Nigeria and worldwide.",
  metadataBase: new URL("https://thrinxs.com.ng"),
  openGraph: {
    title: "Affiliate Program — Thrinxs",
    description: "Earn 5% on every completed sale you refer to Thrinxs. Paid every Friday. No cap. Open to individuals and businesses in Nigeria and worldwide.",
    url: "https://thrinxs.com.ng/affiliate",
    siteName: "Thrinxs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Program — Thrinxs",
    description: "Earn 5% on every completed sale you refer to Thrinxs. Paid every Friday. No cap. Open to individuals and businesses in Nigeria and worldwide.",
  },
};
export default function Affiliate() {
  return <AffiliatePage />;
}