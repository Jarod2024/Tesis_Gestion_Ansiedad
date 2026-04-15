'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { PatientHeader } from "@/presentation/components/patient/PatientHeader";
import { PatientFooter } from "@/presentation/components/patient/PatientFooter";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState('inicio');
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <PatientHeader
        activeSection={activeSection}
        onNavClick={setActiveSection}
        userName={session?.user?.name || 'Paciente'}
        userRole={session?.user?.role || 'ESTUDIANTE'}
      />
      <main className="p-8 flex-1">{children}</main>
      <PatientFooter />
    </div>
  );
}