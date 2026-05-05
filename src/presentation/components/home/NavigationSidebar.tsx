'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface NavigationSidebarProps {
  isPatient?: boolean;
  lastVisited?: string | null;
}

export function NavigationSidebar({ isPatient = false, lastVisited }: NavigationSidebarProps) {
  const { data: session } = useSession();
  
  // Determinar si es paciente basado en la sesión
  const isPacient = isPatient || session?.user?.role === 'PACIENTE';

  // Rutas - Los endpoints son diferentes para pacientes logueados
  const routes = {
    informate: [
      { id: 'ansiedad', label: 'Ansiedad', path: isPacient ? '/paciente/ansiedad' : '/ansiedad' },
      { id: 'salud-mental', label: 'Salud Mental', path: isPacient ? '/paciente/salud-mental' : '/salud-mental' },
      { id: 'analisis-personal', label: 'Análisis Personal', path: isPacient ? '/paciente/test' : '/test' },
    ],
    recursos: [
      { id: 'biblioteca', label: 'Guías de Autoayuda', path: isPacient ? '/paciente/biblioteca' : '/biblioteca' },
      { id: 'videos', label: 'Videos Educativos', path: isPacient ? '/paciente/videos' : '/videos' },
      { id: 'tecnicas', label: 'Técnicas Rápidas', path: isPacient ? '/paciente/salud-mental#tecnicas' : '/salud-mental#tecnicas' },
    ],
  };

  const sectionLabels: Record<string, string> = {
    inicio: 'Inicio',
    ansiedad: 'Ansiedad',
    'salud-mental': 'Salud Mental',
    'analisis-personal': 'Análisis Personal',
    biblioteca: 'Guías de Autoayuda',
    videos: 'Videos Educativos',
    tecnicas: 'Técnicas Rápidas',
  };

  const lastVisitedLabel = lastVisited ? sectionLabels[lastVisited] ?? null : null;

  // Ruta de inicio CORRECTA
  const inicioPath = isPacient ? '/dashboard/paciente' : '/#inicio';

  return (
    <nav className="space-y-6">
      {/* Inicio - Link directo, no botón */}
      <div>
        <Link
          href={inicioPath}
          className="inline-flex items-center rounded-lg bg-[#1E4D8C] px-5 py-3 text-base font-black text-white hover:bg-[#0f3468] transition-all duration-300 shadow-md"
        >
          Inicio
        </Link>
      </div>

      {/* Visitado por última vez */}
      {lastVisitedLabel && (
        <div className="p-4 bg-white/20 backdrop-blur-sm border-l-4 border-yellow-400 rounded-lg">
          <p className="text-xs font-black text-[#1E4D8C] uppercase tracking-wide mb-1">Visitado por última vez</p>
          <p className="text-base font-bold text-white leading-snug">{lastVisitedLabel}</p>
        </div>
      )}

      {/* Infórmate */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
        <h4 className="text-lg font-black text-[#1E4D8C] mb-3">
          Infórmate
        </h4>
        <div className="h-0.5 w-12 bg-[#1E4D8C] rounded-full mb-4"></div>
        <ul className="space-y-2">
          {routes.informate.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#1E4D8C] hover:text-white transition-all duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recursos */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
        <h4 className="text-lg font-black text-[#1E4D8C] mb-3">
          Recursos
        </h4>
        <div className="h-0.5 w-12 bg-[#1E4D8C] rounded-full mb-4"></div>
        <ul className="space-y-2">
          {routes.recursos.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#1E4D8C] hover:text-white transition-all duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}