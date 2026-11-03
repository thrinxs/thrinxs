"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed"); setLoading(false); return; }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  const inp: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10,
    background: "#111", border: "1px solid #2a2a2a",
    color: "#fff", fontSize: 15, outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Logo + title */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 14, background: "#f59e0b", marginBottom: 20 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Thrinxs Admin</h1>
          <p style={{ color: "#555", fontSize: 14 }}>Restricted access — authorised personnel only</p>
        </div>

        {/* Card */}
        <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 18, padding: "40px 36px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", color: "#888", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="info.thrinxs@gmail.com"
                required
                style={inp}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#888", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={inp}
              />
            </div>
            {error && (
              <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "10px 14px", color: "#ef4444", fontSize: 13 }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "14px", borderRadius: 10, background: loading ? "#7a5c10" : "#f59e0b", color: "#000", fontWeight: 800, fontSize: 15, border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", color: "#333", fontSize: 12, marginTop: 32 }}>
          © {new Date().getFullYear()} Thrinxs Ltd. Internal use only.
        </p>
      </div>
    </div>
  );
}