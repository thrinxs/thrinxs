import { dbSelect } from "@/lib/db";
import RepsClient from "./reps-client";

export default async function RepsPage() {
  const reps = await dbSelect("reps", { order: "created_at.desc" });
  return <RepsClient reps={reps} />;
}