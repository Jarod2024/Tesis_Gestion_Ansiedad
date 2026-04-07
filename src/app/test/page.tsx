'use client';

import { GAD7Test } from '@/presentation/components/test';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <GAD7Test />
      </div>
    </div>
  );
}