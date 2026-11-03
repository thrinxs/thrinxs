import { dbSelect } from "@/lib/db";
import SubmissionsClient from "./submissions-client";

export default async function SubmissionsPage() {
  const [getStarted, contacts] = await Promise.all([
    dbSelect("GetStartedSubmission", { order: "created_at.desc" }),
    dbSelect("ContactSubmission", { order: "created_at.desc" }),
  ]);
  return <SubmissionsClient getStarted={getStarted} contacts={contacts} />;
}