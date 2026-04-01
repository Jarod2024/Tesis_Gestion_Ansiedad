import Link from 'next/link';
import Image from 'next/image';
import { LogOut, UserRound, Users, GraduationCap, CalendarCheck } from "lucide-react";

export function AdminNavbar() {
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
            <Link href="/dashboard/admin" className="px-4 py-1.5 rounded-md bg-blue-200 text-blue-900 font-bold text-sm">Inicio</Link>
            <div className="w-[1px] h-4 bg-gray-300 mx-2" />
            <Link href="/dashboard/admin/psicologos" className="px-4 py-1.5 text-gray-600 hover:text-blue-800 text-sm">Psicólogos</Link>
            <div className="w-[1px] h-4 bg-gray-300 mx-2" />
            <Link href="/dashboard/admin/pacientes" className="px-4 py-1.5 text-gray-600 hover:text-blue-800 text-sm">Pacientes</Link>
            <div className="w-[1px] h-4 bg-gray-300 mx-2" />
            <Link href="/dashboard/admin/actividades" className="px-4 py-1.5 text-gray-600 hover:text-blue-800 text-sm">Actividades</Link>
            <div className="w-[1px] h-4 bg-gray-300 mx-2" />
            <Link href="/dashboard/admin/reportes" className="px-4 py-1.5 text-gray-600 hover:text-blue-800 text-sm">Reportes</Link>
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