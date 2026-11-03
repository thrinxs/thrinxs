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

export default function CareersClient({ applications }: { applications: Row[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const statuses = ["all", "pending", "reviewing", "approved", "rejected"];
  const filtered = filter === "all" ? applications : applications.filter(r => String(r.status || "pending") === filter);

  const counts: Record<string, number> = { all: applications.length };
  statuses.slice(1).forEach(s => {
    counts[s] = applications.filter(r => String(r.status || "pending") === s).length;
  });

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Career Applications</h1>
        <p style={{ color: "#555", fontSize: 14 }}>All Business Development Partner applications.</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" as const }}>
        {statuses.map(s => {
          const active = filter === s;
          const color = STATUS_COLORS[s] || "#f59e0b";
          return (
            <button key={s} onClick={() => setFilter(s)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: active ? `${color}15` : "transparent", border: `1px solid ${active ? color + "40" : "#1a1a1a"}`, color: active ? color : "#555", fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", transition: "all 0.15s", textTransform: "capitalize" as const }}>
              {s}
              <span style={{ background: active ? `${color}25` : "#1a1a1a", color: active ? color : "#444", fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 999 }}>{counts[s] || 0}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 && <p style={{ color: "#555", fontSize: 14, padding: "32px 0" }}>No applications found.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((row, i) => {
          const id = String(row.id || i);
          const open = expanded === id;
          const status = String(row.status || "pending");
          const color = STATUS_COLORS[status] || "#555";
          return (
            <div key={id} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, overflow: "hidden" }}>
              <div onClick={() => setExpanded(open ? null : id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", cursor: "pointer", gap: 16, flexWrap: "wrap" as const }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
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
                      { label: "Location", value: row.location },
                      { label: "LinkedIn", value: row.linkedin },
                      { label: "Portfolio", value: row.portfolio },
                      { label: "Submitted", value: row.created_at ? formatDate(String(row.created_at)) : null },
                    ].map(f => f.value ? (
                      <div key={f.label}>
                        <p style={{ color: "#555", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 4 }}>{f.label}</p>
                        <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.6, wordBreak: "break-word" as const }}>{String(f.value)}</p>
                      </div>
                    ) : null)}
                  </div>
                  {row.cover_letter && (
                    <div style={{ marginBottom: 20 }}>
                      <p style={{ color: "#555", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8 }}>Cover Letter</p>
                      <div style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 10, padding: "16px 20px" }}>
                        <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap" as const }}>{String(row.cover_letter)}</p>
                      </div>
                    </div>
                  )}
                  {/* Action buttons */}
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