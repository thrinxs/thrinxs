import { dbSelect } from "@/lib/db";
import ClientsClient from "./clients-client";

export default async function ClientsPage() {
  const [getStarted, contacts] = await Promise.all([
    dbSelect("GetStartedSubmission", { order: "created_at.desc" }),
    dbSelect("ContactSubmission", { order: "created_at.desc" }),
  ]);
  return <ClientsClient getStarted={getStarted} contacts={contacts} />;
}