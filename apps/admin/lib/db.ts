const SUPA_URL = process.env.SUPABASE_URL || "https://mvmbzzdfrxfczwblhlep.supabase.co";
const SUPA_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_JVXWI7gc1bGkPRqhBT06xg_hwSEG6aD";

const headers = {
  apikey: SUPA_KEY,
  Authorization: `Bearer ${SUPA_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export async function dbSelect<T = Record<string, unknown>>(
  table: string,
  params: Record<string, string> = {},
  select = "*"
): Promise<T[]> {
  const url = new URL(`${SUPA_URL}/rest/v1/${table}`);
  url.searchParams.set("select", select);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`dbSelect ${table} failed: ${res.status}`);
  return res.json();
}

export async function dbCount(table: string, params: Record<string, string> = {}): Promise<number> {
  const url = new URL(`${SUPA_URL}/rest/v1/${table}`);
  url.searchParams.set("select", "id");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: { ...headers, Prefer: "count=exact" },
    cache: "no-store",
  });
  const count = res.headers.get("content-range");
  if (!count) return 0;
  const total = count.split("/")[1];
  return total === "*" ? 0 : parseInt(total, 10);
}