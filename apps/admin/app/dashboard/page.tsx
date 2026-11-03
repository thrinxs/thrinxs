import { dbCount, dbSelect } from "@/lib/db";

async function getStats() {
  const [getStarted, contacts, careers, affiliates] = await Promise.all([
    dbCount("GetStartedSubmission"),
    dbCount("ContactSubmission"),
    dbCount("CareerApplication"),
    dbCount("AffiliateApplication"),
  ]);
  return { getStarted, contacts, careers, affiliates };
}

async function getRecent() {
  const [gs, ct] = await Promise.all([
    dbSelect("GetStartedSubmission", { order: "created_at.desc", limit: "5" }),
    dbSelect("ContactSubmission", { order: "created_at.desc", limit: "5" }),
  ]);
  return { gs, ct };
}

function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) {
  return (
    <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 16, padding: "28px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: color }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
          {icon}
        </div>
      </div>
      <p style={{ fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 6 }}>{value}</p>
      <p style={{ color: "#555", fontSize: 13, fontWeight: 600 }}>{label}</p>
    </div>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default async function DashboardPage() {
  const [stats, recent] = await Promise.all([getStats(), getRecent()]);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Overview</h1>
        <p style={{ color: "#555", fontSize: 14 }}>Welcome back, Josh. Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 48 }}>
        <StatCard label="Get Started Submissions" value={stats.getStarted} color="#f59e0b"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
        />
        <StatCard label="Contact Messages" value={stats.contacts} color="#3b82f6"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
        />
        <StatCard label="Career Applications" value={stats.careers} color="#10b981"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>}
        />
        <StatCard label="Affiliate Applications" value={stats.affiliates} color="#a78bfa"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
      </div>

      {/* Recent activity */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>

        {/* Recent Get Started */}
        <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 16, padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Recent Get Started</h2>
            <a href="/dashboard/submissions?tab=getstarted" style={{ fontSize: 12, color: "#f59e0b", textDecoration: "none", fontWeight: 600 }}>View all →</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {recent.gs.length === 0 && <p style={{ color: "#555", fontSize: 13 }}>No submissions yet.</p>}
            {recent.gs.map((row: Record<string, unknown>, i: number) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #141414" }}>
                <div>
                  <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{String(row.name || row.full_name || "—")}</p>
                  <p style={{ color: "#555", fontSize: 12 }}>{String(row.email || "—")}</p>
                </div>
                <span style={{ color: "#555", fontSize: 11 }}>{row.created_at ? timeAgo(String(row.created_at)) : ""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contact */}
        <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 16, padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Recent Contact Messages</h2>
            <a href="/dashboard/submissions?tab=contact" style={{ fontSize: 12, color: "#f59e0b", textDecoration: "none", fontWeight: 600 }}>View all →</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {recent.ct.length === 0 && <p style={{ color: "#555", fontSize: 13 }}>No messages yet.</p>}
            {recent.ct.map((row: Record<string, unknown>, i: number) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #141414" }}>
                <div>
                  <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{String(row.name || "—")}</p>
                  <p style={{ color: "#555", fontSize: 12 }}>{String(row.subject || row.message || "—").slice(0, 48)}{String(row.subject || row.message || "").length > 48 ? "..." : ""}</p>
                </div>
                <span style={{ color: "#555", fontSize: 11 }}>{row.created_at ? timeAgo(String(row.created_at)) : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}