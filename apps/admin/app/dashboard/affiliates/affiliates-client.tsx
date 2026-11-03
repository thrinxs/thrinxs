"use client";
import { useState } from "react";

type Row = Record<string, unknown>;

const STATUS_COLORS: Record<string, string> = {
  pending:  "#f59e0b",
  approved: "#10b981",
  rejected: "#ef4444",
  reviewing: "#3b82f6",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] || "#555";
  return (
    <span style={{ background: `${color}18`, border: `1px solid ${color}40`, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, textTransform: "capitalize" as const, whiteSpace: "nowrap" as const }}>
      {status || "pending"}
    </span>
  );
}

function ApplicationsTab({ rows }: { rows: Row[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const statuses = ["all", "pending", "reviewing", "approved", "rejected"];
  const filtered = filter === "all" ? rows : rows.filter(r => String(r.status || "pending") === filter);
  const counts: Record<string, number> = { all: rows.length };
  statuses.slice(1).forEach(s => { counts[s] = rows.filter(r => String(r.status || "pending") === s).length; });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" as const }}>
        {statuses.map(s => {
          const active = filter === s;
          const color = STATUS_COLORS[s] || "#a78bfa";
          return (
            <button key={s} onClick={() => setFilter(s)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: active ? `${color}15` : "transparent", border: `1px solid ${active ? color + "40" : "#1a1a1a"}`, color: active ? color : "#555", fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", textTransform: "capitalize" as const }}>
              {s}
              <span style={{ background: active ? `${color}25` : "#1a1a1a", color: active ? color : "#444", fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 999 }}>{counts[s] || 0}</span>
            </button>
          );
        })}
      </div>
      {filtered.length === 0 && <p style={{ color: "#555", fontSize: 14, padding: "32px 0" }}>No applications found.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((row, i) => {
          const id = String(row.id || i);
          const open = expanded === id;
          const status = String(row.status || "pending");
          return (
            <div key={id} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, overflow: "hidden" }}>
              <div onClick={() => setExpanded(open ? null : id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", cursor: "pointer", gap: 16, flexWrap: "wrap" as const }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(167,139,250,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 2 }}>{String(row.name || "—")}</p>
                    <p style={{ color: "#555", fontSize: 12 }}>{String(row.email || "—")} {row.phone ? "· " + String(row.phone) : ""}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <StatusBadge status={status} />
                  <span style={{ color: "#444", fontSize: 12 }}>{row.created_at ? timeAgo(String(row.created_at)) : ""}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              {open && (
                <div style={{ padding: "0 24px 28px", borderTop: "1px solid #141414" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 20, marginBottom: 20 }}>
                    {[
                      { label: "Platform / Channel", value: row.platform },
                      { label: "Audience Size", value: row.audience_size },
                      { label: "Website", value: row.website },
                      { label: "Submitted", value: row.created_at ? formatDate(String(row.created_at)) : null },
                    ].map(f => f.value ? (
                      <div key={f.label}>
                        <p style={{ color: "#555", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 4 }}>{f.label}</p>
                        <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.6 }}>{String(f.value)}</p>
                      </div>
                    ) : null)}
                  </div>
                  {row.message && (
                    <div style={{ marginBottom: 20 }}>
                      <p style={{ color: "#555", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8 }}>Message</p>
                      <div style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 10, padding: "16px 20px" }}>
                        <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap" as const }}>{String(row.message)}</p>
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
                    {["reviewing", "approved", "rejected"].map(s => (
                      <button key={s} disabled style={{ padding: "9px 18px", borderRadius: 8, background: `${STATUS_COLORS[s]}15`, border: `1px solid ${STATUS_COLORS[s]}30`, color: STATUS_COLORS[s], fontSize: 12, fontWeight: 700, cursor: "not-allowed", textTransform: "capitalize" as const, opacity: status === s ? 1 : 0.5 }}>
                        Mark {s}
                      </button>
                    ))}
                    <span style={{ color: "#444", fontSize: 11, alignSelf: "center", marginLeft: 4 }}>Status updates coming in Phase 3</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActiveTab({ rows }: { rows: Row[] }) {
  if (rows.length === 0) return <p style={{ color: "#555", fontSize: 14, padding: "32px 0" }}>No active affiliates yet.</p>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {rows.map((row, i) => (
        <div key={i} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 4 }}>{String(row.name || "—")}</p>
            <p style={{ color: "#555", fontSize: 12 }}>{String(row.email || "—")}</p>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#555", fontSize: 11, marginBottom: 2 }}>Referral Code</p>
              <p style={{ color: "#a78bfa", fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>{String(row.referral_code || "—")}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#555", fontSize: 11, marginBottom: 2 }}>Total Earned</p>
              <p style={{ color: "#10b981", fontSize: 13, fontWeight: 700 }}>{String(row.total_earned || "0")}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#555", fontSize: 11, marginBottom: 2 }}>Joined</p>
              <p style={{ color: "#ccc", fontSize: 13 }}>{row.created_at ? timeAgo(String(row.created_at)) : "—"}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AffiliatesClient({ applications, active }: { applications: Row[]; active: Row[] }) {
  const [tab, setTab] = useState<"applications" | "active">("applications");
  const tabs = [
    { key: "applications", label: "Applications", count: applications.length, color: "#a78bfa" },
    { key: "active", label: "Active Affiliates", count: active.length, color: "#10b981" },
  ] as const;

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Affiliates</h1>
        <p style={{ color: "#555", fontSize: 14 }}>Manage affiliate applications and active affiliates.</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 32, borderBottom: "1px solid #1a1a1a" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "transparent", border: "none", borderBottom: tab === t.key ? `2px solid ${t.color}` : "2px solid transparent", color: tab === t.key ? "#fff" : "#555", fontWeight: tab === t.key ? 700 : 500, fontSize: 14, cursor: "pointer", marginBottom: -1 }}>
            {t.label}
            <span style={{ background: tab === t.key ? `${t.color}25` : "#1a1a1a", color: tab === t.key ? t.color : "#555", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{t.count}</span>
          </button>
        ))}
      </div>
      {tab === "applications" && <ApplicationsTab rows={applications} />}
      {tab === "active" && <ActiveTab rows={active} />}
    </div>
  );
}