import { dbSelect } from "@/lib/db";
import AffiliatesClient from "./affiliates-client";

export default async function AffiliatesPage() {
  const [applications, active] = await Promise.all([
    dbSelect("AffiliateApplication", { order: "created_at.desc" }),
    dbSelect("affiliates", { order: "created_at.desc" }),
  ]);
  return <AffiliatesClient applications={applications} active={active} />;
}