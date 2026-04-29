'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PatientHeaderProps {
  activeSection?: string;
  onNavClick?: (section: string) => void;
  userName?: string;
  userRole?: string;
}

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio', href: '/dashboard/paciente' },
  { id: 'tareas', label: 'Mis tareas', href: '/paciente/tareas' },
  { id: 'citas', label: 'Agendar citas', href: '/paciente/citas' },
];

export function PatientHeader({ activeSection, onNavClick, userName = 'Paciente', userRole = 'ESTUDIANTE' }: PatientHeaderProps) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1));
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  let currentActiveSection = activeSection || 'inicio';

  if (pathname.includes('/paciente/tareas')) {
    currentActiveSection = 'tareas';
  } else if (pathname.includes('/paciente/citas')) {
    currentActiveSection = 'citas';
  } else if (pathname.includes('/dashboard/paciente')) {
    if (currentHash === 'info') {
      currentActiveSection = 'info';
    } else if (currentHash === 'recursos') {
      currentActiveSection = 'recursos';
    } else {
      currentActiveSection = 'inicio';
    }
  }
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-md border-b-2 border-[#71A5D9]">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/dashboard/paciente" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="relative h-12 w-12">
            <Image 
              src="/images/Logo-.png" 
              alt="MindPeace" 
              fill 
              className="object-contain"
              sizes="48px"
              priority
            />
          </div>
          <span className="font-black text-xl text-[#1E4D8C]">MindPeace</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => onNavClick?.(item.id)}
                className={`font-semibold text-sm px-4 py-2 rounded-full transition ${
                  currentActiveSection === item.id
                    ? 'bg-[#71A5D9] text-white'
                    : 'text-[#1E4D8C] hover:bg-blue-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="w-px h-6 bg-[#d0e4fc] mx-1"></div>

          {/* User Info and Logout */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#1E4D8C]">{userName}</p>
              <p className="text-xs text-slate-500 font-bold">{userRole}</p>
            </div>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
              className="flex items-center gap-2 text-sm font-bold text-white bg-[#71A5D9] px-4 py-2 rounded-lg hover:bg-[#1E4D8C] shadow-lg transition"
            >
              <LogOut size={16} />
              Salir
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
