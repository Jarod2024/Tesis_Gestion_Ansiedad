'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PatientHeader } from '@/presentation/components/patient/PatientHeader';
import { Biblioteca } from '@/presentation/components/biblioteca/Biblioteca';

export default function PacienteBibliotecaPage() {
  const [activeSection, setActiveSection] = useState('recursos');
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (!mounted || status === 'loading' || !session) {
    return null;
  }

  const handleHomeClick = () => {
    router.push('/dashboard/paciente#recursos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <PatientHeader
        activeSection={activeSection}
        onNavClick={setActiveSection}
        userName={session?.user?.name || 'Paciente'}
        userRole={session?.user?.role || 'ESTUDIANTE'}
      />
      <div className="py-8">
        <Biblioteca onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}
