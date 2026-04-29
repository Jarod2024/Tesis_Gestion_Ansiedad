import { useState, useEffect } from 'react';

const SECTION_LABELS: Record<string, string> = {
  inicio: 'Inicio',
  caracteristicas: 'Características',
  'que-es': '¿Qué es MindPeace?',
  info: 'Infórmate',
  recursos: 'Recursos',
};

export function useScrollNavigation() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [lastVisitedSection, setLastVisitedSection] = useState<string | null>(null);

  useEffect(() => {
    // Cargar última sección visitada desde localStorage
    const saved = localStorage.getItem('lastVisitedSection');
    if (saved) {
      setLastVisitedSection(SECTION_LABELS[saved] ?? saved);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'inicio', element: document.getElementById('inicio') },
        { id: 'caracteristicas', element: document.getElementById('caracteristicas') },
        { id: 'que-es', element: document.getElementById('que-es') },
        { id: 'info', element: document.getElementById('info') },
        { id: 'recursos', element: document.getElementById('recursos') },
      ];

      let currentSection = 'inicio';
      let minDistance = Infinity;

      sections.forEach(({ id, element }) => {
        if (element) {
          const distance = Math.abs(element.getBoundingClientRect().top - 100);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);

      if (currentSection !== 'inicio') {
        const label = SECTION_LABELS[currentSection] ?? currentSection;
        localStorage.setItem('lastVisitedSection', label);
        setLastVisitedSection(label);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, setActiveSection, lastVisitedSection };
}
