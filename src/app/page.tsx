'use client';

import { useScrollNavigation } from '@/presentation/hooks/useScrollNavigation';
import {
  Header,
  HeroSection,
  WelcomeBox,
  InformateSection,
  RecursosSection,
  Footer,
} from '@/presentation/components/home';

export default function HomePage() {
  const { activeSection, setActiveSection } = useScrollNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Header activeSection={activeSection} onNavClick={setActiveSection} />
      <HeroSection />
      <WelcomeBox />
      <InformateSection />
      <RecursosSection />
      <Footer />
    </div>
  );
}