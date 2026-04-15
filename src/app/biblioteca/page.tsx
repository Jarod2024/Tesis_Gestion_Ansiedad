'use client';

import { useRouter } from 'next/navigation';
import { Biblioteca } from '@/presentation/components/biblioteca/Biblioteca';

export default function BibliotecaPage() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8">
      <Biblioteca onHomeClick={handleHomeClick} />
    </div>
  );
}