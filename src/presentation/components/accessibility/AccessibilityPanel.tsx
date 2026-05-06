'use client';
import { useEffect, useState } from 'react';
import { useAccessibility } from '@/presentation/context/AccessibilityContext';
import { Settings, Type, Palette, Scaling } from 'lucide-react';

export function AccessibilityPanel() {
  const { settings, setSettings } = useAccessibility();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  const updateSetting = (key: keyof typeof settings, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  if (!mounted) return null;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 mt-4 shadow-sm">
      {/* ENCABEZADO IDÉNTICO AL NAVIGATION SIDEBAR */}
      <div className="flex items-center gap-2 mb-3">
        <Settings size={22} className="text-[#1E4D8C]" />
        <h4 className="text-lg font-black text-[#1E4D8C]">
          Accesibilidad
        </h4>
      </div>
      <div className="h-0.5 w-12 bg-[#1E4D8C] rounded-full mb-5"></div>

      <div className="space-y-6">
        {/* COLORES */}
        <div>
          <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Palette size={16} className="opacity-90" /> Color de Pantalla
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => updateSetting('theme', 'light')}
              className={`py-2 px-1 text-xs font-bold rounded-md transition-all duration-200 ${settings.theme === 'light' ? 'bg-[#1E4D8C] text-white shadow-md' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >Claro</button>
            <button 
              onClick={() => updateSetting('theme', 'dark')}
              className={`py-2 px-1 text-xs font-bold rounded-md transition-all duration-200 ${settings.theme === 'dark' ? 'bg-[#1E4D8C] text-white shadow-md' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >Oscuro</button>
            <button 
              onClick={() => updateSetting('theme', 'high-contrast')}
              className={`py-2 px-1 text-xs font-bold rounded-md transition-all duration-200 ${settings.theme === 'high-contrast' ? 'bg-black text-yellow-400 shadow-md border border-yellow-400' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >Contraste</button>
          </div>
        </div>

        {/* FUENTE */}
        <div>
          <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Type size={16} className="opacity-90" /> Tipo de Letra
          </label>
          <select 
            value={settings.fontFamily}
            onChange={(e) => updateSetting('fontFamily', e.target.value)}
            className="w-full bg-white/20 text-white text-sm p-2.5 rounded-md outline-none focus:ring-2 focus:ring-[#1E4D8C] transition-all cursor-pointer [&>option]:text-slate-900"
          >
            <option value="sans">Predeterminada</option>
            <option value="serif">Lectura (Serif)</option>
            <option value="dyslexic">OpenDyslexic</option>
          </select>
        </div>

        {/* TAMAÑO */}
        <div>
          <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Scaling size={16} className="opacity-90" /> Tamaño de Letra
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => updateSetting('fontSize', 'small')}
              className={`py-2 px-1 text-xs font-bold rounded-md transition-all duration-200 ${settings.fontSize === 'small' ? 'bg-[#1E4D8C] text-white shadow-md' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >A-</button>
            <button 
              onClick={() => updateSetting('fontSize', 'medium')}
              className={`py-2 px-1 text-sm font-bold rounded-md transition-all duration-200 ${settings.fontSize === 'medium' ? 'bg-[#1E4D8C] text-white shadow-md' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >A</button>
            <button 
              onClick={() => updateSetting('fontSize', 'large')}
              className={`py-2 px-1 text-base font-bold rounded-md transition-all duration-200 ${settings.fontSize === 'large' ? 'bg-[#1E4D8C] text-white shadow-md' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >A+</button>
          </div>
        </div>

      </div>
    </div>
  );
}