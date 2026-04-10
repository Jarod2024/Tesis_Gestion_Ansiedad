// src/app/dashboard/admin/layout.tsx
import { AdminNavbar } from "@/presentation/components/admin/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0F7FF]">
      {/* El Navbar ahora podrá mostrar "Hola, Admin" usando la sesión */}
      <AdminNavbar />
      <main className="p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}