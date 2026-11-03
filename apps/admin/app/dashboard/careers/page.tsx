import { dbSelect } from "@/lib/db";
import CareersClient from "./careers-client";

export default async function CareersPage() {
  const applications = await dbSelect("CareerApplication", { order: "created_at.desc" });
  return <CareersClient applications={applications} />;
}