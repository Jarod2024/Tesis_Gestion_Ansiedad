'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'hideOnboardingBanner_v1';

export function OnboardingBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const hidden = localStorage.getItem(STORAGE_KEY);
      setVisible(!hidden);
    } catch (e) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleClose = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {}
    setVisible(false);
  };

  return (
    <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h3 className="text-xl font-bold text-[#1E4D8C]">Bienvenido a MindPeace</h3>
        <p className="text-sm text-slate-600 mt-1">Te recomendamos comenzar por estos pasos para aprovechar la plataforma:</p>
        <ol className="mt-3 text-sm text-slate-700 list-decimal pl-5 space-y-1">
          <li>Revisa <strong>Infórmate</strong> para entender recursos y temas clave.</li>
          <li>Explora <strong>Recursos</strong> para guías y materiales rápidos.</li>
          <li>Si necesitas ayuda, programa una cita desde <strong>Dashboard</strong>.</li>
        </ol>
      </div>

      <div className="flex-shrink-0 flex gap-3">
        <Link href="/biblioteca" className="py-2 px-4 bg-[#71A5D9] text-white rounded-md font-semibold hover:bg-[#1E4D8C] transition">Ver recursos</Link>
        <Link href="/ansiedad" className="py-2 px-4 border border-blue-200 text-[#1E4D8C] rounded-md font-semibold hover:bg-blue-50 transition">Ir a infórmate</Link>
        <button onClick={handleClose} className="py-2 px-3 text-sm text-slate-500 hover:text-slate-700">No mostrar</button>
      </div>
    </div>
  );
}
