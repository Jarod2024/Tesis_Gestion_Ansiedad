'use client';

import { useScrollNavigation } from '@/presentation/hooks/useScrollNavigation';
import {
  HeroSection,
  VideoFeatureSection,
  WelcomeBox,
  NavigationSidebar,
} from '@/presentation/components/home';
import { PacienteInformateSection, PacienteRecursosSection } from '@/presentation/components/patient';

export default function PatientPage() {
  return (
    <DashboardContent />
  );
}

function DashboardContent() {
  const { activeSection, lastVisitedSection } = useScrollNavigation();

  return (
    <div className="flex flex-1 relative">
      {/* Sidebar con fondo CELESTE (azul medio) */}
      <aside className="hidden lg:block fixed left-0 top-20 w-80 h-[calc(100vh-80px)] bg-[#71A5D9] border-r border-[#1E4D8C] overflow-y-auto z-10">
        <div className="p-6">
          <h3 className="text-sm font-black text-[#1E4D8C] uppercase tracking-wide mb-6">Contenido</h3>
          <NavigationSidebar isPatient={true} lastVisited={lastVisitedSection} />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto lg:ml-80">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-16">
            <HeroSection variant="patient" />
            <VideoFeatureSection />
            <WelcomeBox />
            <PacienteInformateSection />
            <PacienteRecursosSection />
          </div>
        </div>
      </main>
    </div>
  );
}