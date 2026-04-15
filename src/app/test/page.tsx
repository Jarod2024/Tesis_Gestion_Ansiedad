'use client';

import { useRouter } from 'next/navigation';
import { GAD7Test } from '@/presentation/components/test';

export default function TestPage() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <GAD7Test onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}