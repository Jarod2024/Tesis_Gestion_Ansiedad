import { useState, useEffect } from 'react';

export function useScrollNavigation() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const infoSection = document.getElementById('info');
      const recursosSection = document.getElementById('recursos');
      const heroBoundary = 400;

      if (window.scrollY < heroBoundary) {
        setActiveSection('inicio');
      } else if (window.scrollY < (infoSection?.offsetTop || 0) + (recursosSection?.offsetTop || 0) / 2) {
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
