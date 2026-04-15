'use client';

import {
  HeroSection,
  VideoFeatureSection,
  WelcomeBox,
} from '@/presentation/components/home';
import { PacienteInformateSection, PacienteRecursosSection } from '@/presentation/components/patient';

export default function PatientPage() {
  return (
    <>
      <HeroSection />
      <VideoFeatureSection />
      <WelcomeBox />
      <PacienteInformateSection />
      <PacienteRecursosSection />
    </>
  );
}