'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Eye, BookOpen, Video, Zap, Home, Heart, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavigationSidebarProps {
  isPatient?: boolean;
  lastVisited?: string | null;
}

export function NavigationSidebar({ isPatient = false, lastVisited }: NavigationSidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [lastVisitedSection, setLastVisitedSection] = useState<string>('Inicio');
  
  const isPacient = isPatient || session?.user?.role === 'PACIENTE';

  const allowedLabels = [
    'Inicio',
    'Características',
    '¿Qué es MindPeace?',
    'Infórmate',
    'Recursos',
    'Ansiedad',
    'Salud Mental',
    'Análisis Personal',
    'Guías de Autoayuda',
    'Videos Educativos',
    'Técnicas Rápidas'
  ];

  const legacyValuesToLabels: Record<string, string> = {
    inicio: 'Inicio',
    caracteristicas: 'Características',
    'que-es': '¿Qué es MindPeace?',
    info: 'Infórmate',
    recursos: 'Recursos',
    '/ansiedad': 'Ansiedad',
    '/salud-mental': 'Salud Mental',
    '/test': 'Análisis Personal',
    '/biblioteca': 'Guías de Autoayuda',
    '/videos': 'Videos Educativos',
    '/paciente/ansiedad': 'Ansiedad',
    '/paciente/salud-mental': 'Salud Mental',
    '/paciente/test': 'Análisis Personal',
    '/paciente/biblioteca': 'Guías de Autoayuda',
    '/paciente/videos': 'Videos Educativos',
  };

  const pathToLabel: Record<string, string> = {
    '/ansiedad': 'Ansiedad',
    '/salud-mental': 'Salud Mental',
    '/test': 'Análisis Personal',
    '/biblioteca': 'Guías de Autoayuda',
    '/videos': 'Videos Educativos',
    '/paciente/ansiedad': 'Ansiedad',
    '/paciente/salud-mental': 'Salud Mental',
    '/paciente/test': 'Análisis Personal',
    '/paciente/biblioteca': 'Guías de Autoayuda',
    '/paciente/videos': 'Videos Educativos',
  };

  const homeSectionTargets: Record<string, string> = {
    'Inicio': 'inicio',
    'Características': 'caracteristicas',
    '¿Qué es MindPeace?': 'que-es',
    'Infórmate': 'info',
    'Recursos': 'recursos',
  };

  const detailRouteTargets: Record<string, string> = {
    'Ansiedad': isPacient ? '/paciente/ansiedad' : '/ansiedad',
    'Salud Mental': isPacient ? '/paciente/salud-mental' : '/salud-mental',
    'Análisis Personal': isPacient ? '/paciente/test' : '/test',
    'Guías de Autoayuda': isPacient ? '/paciente/biblioteca' : '/biblioteca',
    'Videos Educativos': isPacient ? '/paciente/videos' : '/videos',
    'Técnicas Rápidas': isPacient ? '/paciente/salud-mental#tecnicas' : '/salud-mental#tecnicas',
  };

  const normalizeLabel = (value: string) => legacyValuesToLabels[value] ?? value;

  // Guardar última visita SOLO si es uno de los permitidos
  const saveLastVisited = (label: string) => {
    const normalized = normalizeLabel(label);

    if (allowedLabels.includes(normalized)) {
      setLastVisitedSection(normalized);
      localStorage.setItem('lastVisitedSection', normalized);
    }
  };

  useEffect(() => {
    if (pathname && pathToLabel[pathname]) {
      const label = pathToLabel[pathname];
      saveLastVisited(label);
    }
  }, [pathname]);

  useEffect(() => {
    if (lastVisited) {
      saveLastVisited(lastVisited);
    }
  }, [lastVisited]);

  useEffect(() => {
    const saved = localStorage.getItem('lastVisitedSection');
    const normalized = saved ? normalizeLabel(saved) : '';
    if (normalized && allowedLabels.includes(normalized)) {
      setLastVisitedSection(normalized);
    } else {
      setLastVisitedSection('Inicio');
    }
  }, []);

  const displayLastVisited = lastVisitedSection;

  const handleLastVisitedClick = () => {
    const sectionId = homeSectionTargets[displayLastVisited];

    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (sectionId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    const route = detailRouteTargets[displayLastVisited];
    if (route) {
      router.push(route);
    }
  };

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

  // RUTA DE INICIO CORRECTA
  const inicioPath = isPacient ? '/dashboard/paciente' : '/#inicio';

  const handleInicioClick = () => {
    if (isPacient) {
      // if already on dashboard patient, scroll to the hero section
      if (pathname === '/dashboard/paciente' || pathname?.startsWith('/dashboard/paciente')) {
        const el = document.getElementById('inicio');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      // otherwise navigate to dashboard patient
      router.push('/dashboard/paciente');
      return;
    }

    // Public home case
    if (pathname === '/' || pathname === '/#inicio') {
      const el = document.getElementById('inicio');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    router.push('/#inicio');
  };

  return (
    <nav className="space-y-6">
      {/* Inicio - BOTÓN */}
      <div>
        <button
          onClick={handleInicioClick}
          className="inline-flex items-center gap-3 rounded-lg bg-[#1E4D8C] px-5 py-3 text-base font-black text-white hover:bg-[#0f3468] transition-all duration-300 shadow-md"
        >
          <Home size={16} />
          Inicio
        </button>
      </div>

      {/* Última visita - SIEMPRE visible */}
      <div className="rounded-xl bg-gradient-to-r from-[#1E4D8C] to-[#2d6cb0] p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Eye size={16} className="text-white" />
          <p className="text-xs font-black text-white uppercase tracking-wider">
            Última visita
          </p>
        </div>
        <button
          onClick={handleLastVisitedClick}
          className="text-left text-lg font-black text-white tracking-wide hover:underline"
        >
          {displayLastVisited}
        </button>
        <div className="mt-3 h-px w-full bg-white/20 rounded-full"></div>
      </div>

      {/* Infórmate */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={18} className="text-[#1E4D8C]" />
          <h4 className="text-base font-black text-[#1E4D8C] uppercase tracking-wide">
            Infórmate
          </h4>
        </div>
        <div className="h-px w-full bg-white/20 mb-4"></div>
        <ul className="space-y-2">
          {routes.informate.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-base font-semibold text-white hover:bg-[#1E4D8C] hover:text-white transition-all duration-200"
              >
                <span className="text-[#1E4D8C] group-hover:text-white">
                  {item.id === 'ansiedad' ? <Zap size={16} /> : item.id === 'salud-mental' ? <Heart size={16} /> : <FileText size={16} />}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recursos */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <BookOpen size={16} className="text-[#1E4D8C]" />
          </div>
          <h4 className="text-base font-black text-[#1E4D8C] uppercase tracking-wide">
            Recursos
          </h4>
        </div>
        <div className="h-px w-full bg-white/20 mb-4"></div>
        <ul className="space-y-2">
          {routes.recursos.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-base font-semibold text-white hover:bg-[#1E4D8C] hover:text-white transition-all duration-200"
              >
                <span className="text-[#1E4D8C] group-hover:text-white">
                  {item.id === 'biblioteca' ? <BookOpen size={16} /> : item.id === 'videos' ? <Video size={16} /> : <Zap size={16} />}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}