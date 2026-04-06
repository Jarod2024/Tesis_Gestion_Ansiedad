"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { LogOut, UserRound, Users, GraduationCap, CalendarCheck } from "lucide-react";

export function AdminNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Inicio", href: "/dashboard/admin" },
    { name: "Psicólogos", href: "/dashboard/admin/psicologos" },
    { name: "Pacientes", href: "/dashboard/admin/pacientes" },
    { name: "Actividades", href: "/dashboard/admin/actividades" },
    { name: "Reportes", href: "/dashboard/admin/reportes" },
  ];

  return (
    <>
      {/* HEADER FIJO */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-blue-100 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Logo del proyecto */}
          <div className="flex flex-col items-center">
            <Image src="/images/logo-.png" alt="Mindpeace Logo" width={50} height={50} className="rounded-full" />
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-tighter">Mindpeace</span>
          </div>

          {/* Navegación Estilo Mockup */}
          <nav className="flex items-center bg-blue-50 rounded-lg p-1 border border-blue-100">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <div key={link.name} className="flex items-center">
                  <Link
                    href={link.href}
                    className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                      isActive
                        ? "bg-blue-200 text-blue-900 font-bold"
                        : "text-gray-600 hover:text-blue-800"
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Separador (menos en el último) */}
                  {index < navLinks.length - 1 && (
                    <div className="w-[1px] h-4 bg-gray-300 mx-2" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Perfil y Salir */}
        <div className="flex items-center gap-6">
          <span className="font-bold text-gray-700">Admin</span>
          <button className="flex flex-col items-center text-gray-600 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            <span className="text-[10px] font-bold">Salir</span>
          </button>
        </div>
      </header>
    </>
  );
}