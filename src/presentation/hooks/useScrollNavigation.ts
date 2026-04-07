import { useState, useEffect } from 'react';

export function useScrollNavigation() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const infoSection = document.getElementById('info');
      const recursosSection = document.getElementById('recursos');
      const heroBoundary = 400;

      const infoOffset = infoSection?.offsetTop || 0;
      const recursosOffset = recursosSection?.offsetTop || 0;
      const midpoint = (infoOffset + recursosOffset) / 2;

      if (window.scrollY < heroBoundary) {
        setActiveSection('inicio');
      } else if (window.scrollY < midpoint) {
        setActiveSection('info');
      } else {
        setActiveSection('recursos');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, setActiveSection };
}
