'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PatientHeader } from '@/presentation/components/patient/PatientHeader';
import { ArrowLeft } from 'lucide-react';
import { navigateAndScroll } from '@/presentation/utils/scrollWithOffset';
import { GAD7Test } from '@/presentation/components/test';

export default function PacienteTestPage() {
  const [activeSection, setActiveSection] = useState('inicio');
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
    navigateAndScroll(router, '/dashboard/paciente#info', 'info', 150);
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
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <button
              onClick={handleHomeClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#1E4D8C] font-semibold rounded-lg shadow-sm border border-[#71A5D9] hover:bg-[#71A5D9] hover:text-white transition"
            >
              <ArrowLeft size={18} /> Volver a Infórmate
            </button>
          </div>
          <GAD7Test onHomeClick={handleHomeClick} />
        </div>
      </div>
    </div>
  );
}
