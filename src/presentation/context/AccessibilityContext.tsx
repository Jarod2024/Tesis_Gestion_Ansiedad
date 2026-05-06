'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings } from '@/domain/entities/AccessibilitySettings';
import { LocalStorageAccessibilityRepository } from '@/infrastructure/repositories/LocalStorageAccessibilityRepository';
import { ManageSettingsUseCase } from '@/application/use-cases/accessibility/ManageSettings';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setSettings: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
}

const defaultSettings: AccessibilitySettings = {
  theme: 'light',
  fontSize: 'medium',
  fontFamily: 'sans',
};

const AccessibilityContext = createContext<AccessibilityContextType>(null as unknown as AccessibilityContextType);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const repository = new LocalStorageAccessibilityRepository();
    const useCase = new ManageSettingsUseCase(repository);
    
    const savedSettings = useCase.executeLoad();
    if (savedSettings && savedSettings.theme) {
      setSettings(savedSettings);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const repository = new LocalStorageAccessibilityRepository();
    const useCase = new ManageSettingsUseCase(repository);
    useCase.executeSave(settings);
    
    const root = window.document.documentElement;
    
    // Eliminamos solo las clases viejas de accesibilidad sin tocar las fuentes propias de Next (Geist)
    root.className = root.className.replace(/\b(theme|font-size|font-family)-\S+/g, '').trim(); 
    
    // Inyectamos las clases nuevas al HTML
    if (settings.theme !== 'light') root.classList.add(`theme-${settings.theme}`);
    if (settings.fontSize !== 'medium') root.classList.add(`font-size-${settings.fontSize}`);
    if (settings.fontFamily !== 'sans') root.classList.add(`font-family-${settings.fontFamily}`);
    
  }, [settings, isHydrated]);

  return (
    <AccessibilityContext.Provider value={{ settings, setSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility debe usarse dentro de un AccessibilityProvider');
  }
  return context;
};