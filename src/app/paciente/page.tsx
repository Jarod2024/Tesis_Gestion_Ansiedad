'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PacienteHomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/paciente');
  }, [router]);

  return null;
}
