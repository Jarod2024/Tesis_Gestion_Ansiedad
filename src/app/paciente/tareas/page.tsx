'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PatientHeader } from '@/presentation/components/patient/PatientHeader';

export default function TareasPage() {
  const [activeSection, setActiveSection] = useState('tareas');
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <PatientHeader
        activeSection={activeSection}
        onNavClick={setActiveSection}
        userName={session?.user?.name || 'Paciente'}
        userRole={session?.user?.role || 'ESTUDIANTE'}
      />
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-black text-[#1E4D8C] mb-8">Mis Tareas</h1>
          <p className="text-lg text-slate-700">Las tareas asignadas por tu psicólogo aparecerán aquí.</p>
        </div>
      </div>
    </div>
  );
}
