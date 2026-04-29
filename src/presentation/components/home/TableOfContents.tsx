import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TableOfContentsProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isPatient?: boolean;
  lastVisitedSection?: string | null;
}

export function TableOfContents({
  activeSection,
  onSectionClick,
  isPatient = false,
  lastVisitedSection,
}: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = [
    { id: 'inicio', label: '🏠 Inicio' },
    { id: 'caracteristicas', label: '✨ Características' },
    { id: 'que-es', label: '❓ ¿Qué es MindPeace?' },
    { id: 'info', label: '📚 Infórmate' },
    { id: 'recursos', label: '🎯 Recursos' },
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  if (isMobile) {
    return (
      <div className="fixed top-24 left-4 z-40">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-[#71A5D9] text-white p-3 rounded-full shadow-lg hover:bg-[#71A5D9] transition flex items-center gap-2"
        >
          <span>📑</span>
          <ChevronDown
            size={20}
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        {isExpanded && (
          <nav className="absolute top-14 left-0 bg-white border-2 border-[#71A5D9] rounded-lg shadow-xl p-2 min-w-56">
            <ul className="space-y-1">
              {lastVisitedSection && (
                <li className="pb-2 mb-2 border-b border-[#71A5D9]">
                  <button
                    onClick={() => handleSectionClick(lastVisitedSection)}
                    className="w-full text-left px-3 py-2 text-sm bg-yellow-50 text-yellow-800 rounded hover:bg-yellow-100 transition font-medium"
                  >
                    ⏱️ Última visita: {sections.find(s => s.id === lastVisitedSection)?.label}
                  </button>
                </li>
              )}
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full text-left px-3 py-2 rounded transition text-sm ${
                      activeSection === section.id
                        ? 'bg-[#71A5D9] text-white font-bold'
                        : 'text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }

  return (
    <aside className="sticky top-20 hidden lg:block w-56 h-fit">
      <nav className="bg-white rounded-xl border-2 border-[#71A5D9] p-4 shadow-lg">
        <h3 className="text-lg font-black text-[#1E4D8C] mb-4">📑 En esta página</h3>

        <ul className="space-y-2">
          {lastVisitedSection && (
            <li className="pb-3 mb-3 border-b border-[#71A5D9]">
              <button
                onClick={() => handleSectionClick(lastVisitedSection)}
                className="w-full text-left px-3 py-2 text-sm bg-yellow-50 text-yellow-800 rounded-lg hover:bg-yellow-100 transition font-medium border border-yellow-300"
              >
                <span className="block font-bold mb-1">⏱️ Última visita</span>
                {sections.find(s => s.id === lastVisitedSection)?.label}
              </button>
            </li>
          )}

          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => handleSectionClick(section.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition font-medium text-sm ${
                  activeSection === section.id
                    ? 'bg-[#71A5D9] text-white shadow-md'
                    : 'text-slate-700 hover:bg-blue-50'
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>

        {isPatient && (
          <div className="mt-6 pt-4 border-t border-[#71A5D9]">
            <p className="text-xs text-slate-600 text-center">
              ✨ Bienvenido, estudiante. Tu privacidad es nuestra prioridad.
            </p>
          </div>
        )}
      </nav>
    </aside>
  );
}