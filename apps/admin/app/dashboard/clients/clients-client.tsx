"use client";
import { useState } from "react";

type Row = Record<string, unknown>;

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ClientsClient({ getStarted, contacts }: { getStarted: Row[]; contacts: Row[] }) {
  const [search, setSearch] = useState("");

  const allLeads = [
    ...getStarted.map(r => ({ ...r, _source: "Get Started" })),
    ...contacts.map(r => ({ ...r, _source: "Contact" })),
  ].sort((a, b) => {
    const aDate = a.created_at ? new Date(String(a.created_at)).getTime() : 0;
    const bDate = b.created_at ? new Date(String(b.created_at)).getTime() : 0;
    return bDate - aDate;
  });

  const filtered = search.trim() === "" ? allLeads : allLeads.filter(r => {
    const q = search.toLowerCase();
    return (
      String(r.name || "").toLowerCase().includes(q) ||
      String(r.email || "").toLowerCase().includes(q) ||
      String(r.company || "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Clients</h1>
        <p style={{ color: "#555", fontSize: 14 }}>All inbound leads from Get Started and Contact forms.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 36 }}>
        {[
          { label: "Total Leads", value: allLeads.length, color: "#f59e0b" },
          { label: "Get Started", value: getStarted.length, color: "#10b981" },
          { label: "Contact", value: contacts.length, color: "#3b82f6" },
        ].map(s => (
          <div key={s.label} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 12, padding: "18px 20px" }}>
            <p style={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
            <p style={{ color: "#555", fontSize: 12 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 28 }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          placeholder="Search by name, email, or company..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "12px 16px 12px 42px", borderRadius: 10, background: "#0d0d0d", border: "1px solid #1a1a1a", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" as const }}
        />
      </div>

      {filtered.length === 0 && <p style={{ color: "#555", fontSize: 14, padding: "32px 0" }}>No leads found.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((row, i) => {
          const source = String(row._source || "");
          const sourceColor = source === "Get Started" ? "#10b981" : "#3b82f6";
          return (
            <div key={i} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 12, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${sourceColor}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={sourceColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 2 }}>{String(row.name || "—")}</p>
                  <p style={{ color: "#555", fontSize: 12 }}>{String(row.email || "—")}{row.company ? " · " + String(row.company) : ""}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <span style={{ background: `${sourceColor}15`, border: `1px solid ${sourceColor}30`, color: sourceColor, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>{source}</span>
                {row.budget && <span style={{ background: "#f59e0b15", border: "1px solid #f59e0b30", color: "#f59e0b", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>{String(row.budget)}</span>}
                <span style={{ color: "#444", fontSize: 12 }}>{row.created_at ? timeAgo(String(row.created_at)) : ""}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}