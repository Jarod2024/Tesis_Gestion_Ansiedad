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

export default function HomePage() {
  const { activeSection, setActiveSection, lastVisitedSection } = useScrollNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* Header */}
      <Header activeSection={activeSection} onNavClick={setActiveSection} />
      
      {/* Main Layout - Sidebar + Content */}
      <div className="flex flex-1 relative">
        
        {/* Sidebar Left - Fixed con fondo CELESTE como pediste */}
        <aside className="hidden lg:block fixed left-0 top-20 w-80 h-[calc(100vh-80px)] bg-[#71A5D9] border-r border-[#1E4D8C] overflow-y-auto z-10">
          <div className="p-6">
            {/* ✅ "Contenido" en AZUL OSCURO NEGRILLA */}
            <h3 className="text-sm font-black text-[#1E4D8C] uppercase tracking-wide mb-6">Contenido</h3>
            <NavigationSidebar lastVisited={lastVisitedSection} />
          </div>
        </aside>

        {/* Main Content - Scrolleable */}
        <main className="flex-1 overflow-y-auto lg:ml-80">
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