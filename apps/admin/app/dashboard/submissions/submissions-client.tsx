"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Row = Record<string, unknown>;

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

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span style={{ background: `${color}18`, border: `1px solid ${color}40`, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap" as const }}>
      {text}
    </span>
  );
}

function GetStartedTable({ rows }: { rows: Row[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  if (rows.length === 0) return <p style={{ color: "#555", fontSize: 14, padding: "32px 0" }}>No submissions yet.</p>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {rows.map((row, i) => {
        const id = String(row.id || i);
        const open = expanded === id;
        return (
          <div key={id} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14, overflow: "hidden" }}>
            <div
              onClick={() => setExpanded(open ? null : id)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", cursor: "pointer", gap: 16, flexWrap: "wrap" as const }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 2 }}>{String(row.name || row.full_name || "—")}</p>
                  <p style={{ color: "#555", fontSize: 12 }}>{String(row.email || "—")}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                {row.budget && <Badge text={String(row.budget)} color="#f59e0b" />}
                {row.timeline && <Badge text={String(row.timeline)} color="#3b82f6" />}
                <span style={{ color: "#444", fontSize: 12 }}>{row.created_at ? timeAgo(String(row.created_at)) : ""}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            {open && (
              <div style={{ padding: "0 24px 24px", borderTop: "1px solid #1a1a1a" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 20 }}>
                  {Object.entries(row).map(([k, v]) => {
                    if (k === "id") return null;
                    return (
                      <div key={k}>
                        <p style={{ color: "#555", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 4 }}>{k.replace(/_/g, " ")}</p>
                        <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.6, wordBreak: "break-word" as const }}>{String(v ?? "—")}</p>
                      </div>
                    );
                  })}
                </div>
                {row.created_at && (
                  <p style={{ color: "#444", fontSize: 12, marginTop: 16 }}>Submitted: {formatDate(String(row.created_at))}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ContactTable({ rows }: { rows: Row[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  if (rows.length === 0) return <p style={{ color: "#555", fontSize: 14, padding: "32px 0" }}>No messages yet.</p>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {rows.map((row, i) => {
        const id = String(row.id || i);
        const open = expanded === id;
        return (
          <div key={id} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 14, overflow: "hidden" }}>
            <div
              onClick={() => setExpanded(open ? null : id)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", cursor: "pointer", gap: 16, flexWrap: "wrap" as const }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(59,130,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 2 }}>{String(row.name || "—")}</p>
                  <p style={{ color: "#555", fontSize: 12 }}>{String(row.subject || String(row.message || "").slice(0, 60))}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <span style={{ color: "#444", fontSize: 12 }}>{row.created_at ? timeAgo(String(row.created_at)) : ""}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            {open && (
              <div style={{ padding: "0 24px 24px", borderTop: "1px solid #1a1a1a" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 20 }}>
                  {Object.entries(row).map(([k, v]) => {
                    if (k === "id") return null;
                    return (
                      <div key={k}>
                        <p style={{ color: "#555", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 4 }}>{k.replace(/_/g, " ")}</p>
                        <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.6, wordBreak: "break-word" as const }}>{String(v ?? "—")}</p>
                      </div>
                    );
                  })}
                </div>
                {row.created_at && (
                  <p style={{ color: "#444", fontSize: 12, marginTop: 16 }}>Submitted: {formatDate(String(row.created_at))}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function SubmissionsClient({ getStarted, contacts }: { getStarted: Row[]; contacts: Row[] }) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"getstarted" | "contact">(
    (searchParams.get("tab") as "getstarted" | "contact") || "getstarted"
  );

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "contact" || t === "getstarted") setTab(t);
  }, [searchParams]);

  const tabs = [
    { key: "getstarted", label: "Get Started", count: getStarted.length, color: "#f59e0b" },
    { key: "contact", label: "Contact Messages", count: contacts.length, color: "#3b82f6" },
  ] as const;

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Submissions</h1>
        <p style={{ color: "#555", fontSize: 14 }}>All inbound form submissions from the marketing site.</p>
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, borderBottom: "1px solid #1a1a1a", paddingBottom: 0 }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "transparent", border: "none", borderBottom: tab === t.key ? `2px solid ${t.color}` : "2px solid transparent", color: tab === t.key ? "#fff" : "#555", fontWeight: tab === t.key ? 700 : 500, fontSize: 14, cursor: "pointer", marginBottom: -1, transition: "all 0.15s" }}
          >
            {t.label}
            <span style={{ background: tab === t.key ? `${t.color}25` : "#1a1a1a", color: tab === t.key ? t.color : "#555", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{t.count}</span>
          </button>
        ))}
      </div>
      {tab === "getstarted" && <GetStartedTable rows={getStarted} />}
      {tab === "contact" && <ContactTable rows={contacts} />}
    </div>
  );
}