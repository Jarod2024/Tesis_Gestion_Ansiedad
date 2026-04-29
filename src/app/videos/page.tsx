'use client';

import { useRouter } from 'next/navigation';
import { VideosEducativos } from '@/presentation/components/videos';

export default function VideosPage() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/#recursos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8">
      <VideosEducativos onHomeClick={handleHomeClick} />
    </div>
  );
}