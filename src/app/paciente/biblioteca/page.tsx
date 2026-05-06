'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PatientHeader } from '@/presentation/components/patient/PatientHeader';
import { Biblioteca } from '@/presentation/components/biblioteca/Biblioteca';
import { ArrowLeft } from 'lucide-react';
import { navigateAndScroll } from '@/presentation/utils/scrollWithOffset';

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
    navigateAndScroll(router, '/dashboard/paciente#recursos', 'recursos', 150);
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
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="mb-6">
            <button
              onClick={handleHomeClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#1E4D8C] font-semibold rounded-lg shadow-sm border border-[#71A5D9] hover:bg-[#71A5D9] hover:text-white transition"
            >
              <ArrowLeft size={18} /> Volver a Recursos
            </button>
          </div>
        </div>
        <Biblioteca onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}
