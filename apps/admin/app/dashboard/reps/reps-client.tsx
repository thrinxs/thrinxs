"use client";
import { useState } from "react";

type Row = Record<string, unknown>;

const LEVEL_COLORS: Record<string, string> = {
  intern:    "#6b7280",
  junior:    "#3b82f6",
  associate: "#10b981",
  senior:    "#f59e0b",
};

const STATUS_COLORS: Record<string, string> = {
  active:    "#10b981",
  inactive:  "#6b7280",
  suspended: "#ef4444",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span style={{ background: `${color}18`, border: `1px solid ${color}40`, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, textTransform: "capitalize" as const, whiteSpace: "nowrap" as const }}>
      {text}
    </span>
  );
}

export default function RepsClient({ reps }: { reps: Row[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const levels = ["all", "intern", "junior", "associate", "senior"];
  const filtered = filter === "all" ? reps : reps.filter(r => String(r.level || "intern").toLowerCase() === filter);
  const counts: Record<string, number> = { all: reps.length };
  levels.slice(1).forEach(l => { counts[l] = reps.filter(r => String(r.level || "intern").toLowerCase() === l).length; });

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Sales Reps</h1>
        <p style={{ color: "#555", fontSize: 14 }}>All active Business Development Partners.</p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 36 }}>
        {[
          { label: "Total Reps", value: reps.length, color: "#f59e0b" },
          { label: "Senior", value: counts.senior || 0, color: "#f59e0b" },
          { label: "Associate", value: counts.associate || 0, color: "#10b981" },
          { label: "Junior", value: counts.junior || 0, color: "#3b82f6" },
          { label: "Intern", value: counts.intern || 0, color: "#6b7280" },
        ].map(s => (
          <div key={s.label} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 12, padding: "18px 20px" }}>
            <p style={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
            <p style={{ color: "#555", fontSize: 12 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Level filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" as const }}>
        {levels.map(l => {
          const active = filter === l;
          const color = LEVEL_COLORS[l] || "#f59e0b";
          return (
            <button key={l} onClick={() => setFilter(l)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: active ? `${color}15` : "transparent", border: `1px solid ${active ? color + "40" : "#1a1a1a"}`, color: active ? color : "#555", fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", textTransform: "capitalize" as const }}>
              {l}
              <span style={{ background: active ? `${color}25` : "#1a1a1a", color: active ? color : "#444", fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 999 }}>{counts[l] || 0}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && <p style={{ color: "#555", fontSize: 14, padding: "32px 0" }}>No reps found.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((row, i) => {
          const id = String(row.id || i);
          const open = expanded === id;
          const level = String(row.level || "intern").toLowerCase();
          const status = String(row.status || "active").toLowerCase();
          const levelColor = LEVEL_COLORS[level] || "#6b7280";
          const statusColor = STATUS_COLORS[status] || "#6b7280";
          return (
            <div key={id} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, overflow: "hidden" }}>
              <div onClick={() => setExpanded(open ? null : id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", cursor: "pointer", gap: 16, flexWrap: "wrap" as const }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: `${levelColor}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={levelColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 2 }}>{String(row.name || "—")}</p>
                    <p style={{ color: "#555", fontSize: 12 }}>{String(row.email || "—")}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <Badge text={level} color={levelColor} />
                  <Badge text={status} color={statusColor} />
                  {row.referral_code && <span style={{ color: "#444", fontSize: 12, fontFamily: "monospace" }}>{String(row.referral_code)}</span>}
                  <span style={{ color: "#444", fontSize: 12 }}>{row.created_at ? timeAgo(String(row.created_at)) : ""}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              {open && (
                <div style={{ padding: "0 24px 28px", borderTop: "1px solid #141414" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 20 }}>
                    {[
                      { label: "Phone", value: row.phone },
                      { label: "Referral Code", value: row.referral_code },
                      { label: "Total Sales", value: row.total_sales },
                      { label: "Total Commission", value: row.total_commission },
                      { label: "Monthly Target", value: row.monthly_target },
                      { label: "Joined", value: row.created_at ? timeAgo(String(row.created_at)) : null },
                    ].map(f => f.value !== undefined && f.value !== null ? (
                      <div key={f.label}>
                        <p style={{ color: "#555", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 4 }}>{f.label}</p>
                        <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.6 }}>{String(f.value)}</p>
                      </div>
                    ) : null)}
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