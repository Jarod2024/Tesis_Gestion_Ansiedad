// src/presentation/components/psychologist/PsychologistNavbar.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Users, Calendar, FolderHeart } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function PsychologistNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = [
    { name: "Inicio", href: "/dashboard/psicologo", icon: LayoutDashboard },
    { name: "Mis Pacientes", href: "/dashboard/psicologo/pacientes", icon: Users },
    { name: "Agenda", href: "/dashboard/psicologo/citas", icon: Calendar },
    { name: "Actividades", href: "/dashboard/psicologo/actividades", icon: FolderHeart },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-blue-100 px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center">
          <Image src="/images/logo-.png" alt="Logo" width={45} height={45} className="rounded-full" />
          <span className="text-[9px] font-bold text-blue-900 uppercase">Mindpeace</span>
        </div>

        <nav className="flex items-center bg-blue-50/50 rounded-xl p-1 border border-blue-100">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  isActive ? "bg-white text-blue-700 font-bold shadow-sm" : "text-gray-500 hover:text-blue-700"
                }`}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase">Psicólogo</p>
          <p className="text-sm font-bold text-gray-800">{session?.user?.name || "..."}</p>
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        >
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
}