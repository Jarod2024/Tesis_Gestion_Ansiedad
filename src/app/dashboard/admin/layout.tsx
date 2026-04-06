import { AdminNavbar } from "@/presentation/components/shared/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0F7FF]">
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
}