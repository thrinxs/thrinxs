import Sidebar from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080808" }}>
      <Sidebar />
      <main style={{ flex: 1, minWidth: 0, padding: "40px 36px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}