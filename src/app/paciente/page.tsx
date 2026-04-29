'use client';

import { useScrollNavigation } from '@/presentation/hooks/useScrollNavigation';
import {
  Header,
  HeroSection,
  VideoFeatureSection,
  WelcomeBox,
  InformateSection,
  RecursosSection,
  Footer,
  NavigationSidebar,
} from '@/presentation/components/home';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PacienteHomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { activeSection, setActiveSection, lastVisitedSection } = useScrollNavigation();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'PACIENTE') {
      router.push('/dashboard/' + session?.user?.role?.toLowerCase());
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* Header */}
      <Header activeSection={activeSection} onNavClick={setActiveSection} />
      
      {/* Main Layout - Sidebar + Content */}
      <div className="flex flex-1 relative">
        {/* Sidebar Left - Fixed */}
          <aside className="hidden lg:block fixed left-0 top-20 w-80 h-[calc(100vh-80px)] bg-gradient-to-b from-[#173e72] via-[#1E4D8C] to-[#2d6cb0] border-r border-[#71A5D9]/40 overflow-y-auto z-10">
          <div className="p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-6">Contenido</h3>
            <NavigationSidebar isPatient={true} lastVisited={lastVisitedSection} />
          </div>
        </aside>

        {/* Main Content - Scrolleable */}
        <main className="flex-1 overflow-y-auto ml-80">
          <div className="max-w-7xl mx-auto px-6 py-4 md:py-6">
            <div className="space-y-8 md:space-y-10">
              <HeroSection />
              <VideoFeatureSection />
              <WelcomeBox />
              <InformateSection />
              <RecursosSection />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
