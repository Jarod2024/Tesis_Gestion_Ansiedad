import { AccessibilitySettings, IAccessibilityRepository } from "@/domain/entities/AccessibilitySettings";

const STORAGE_KEY = 'mindpeace_settings';

const defaultSettings: AccessibilitySettings = {
  theme: 'light',
  fontSize: 'medium',
  fontFamily: 'sans',
  language: 'es'
};

export class LocalStorageAccessibilityRepository implements IAccessibilityRepository {
  saveSettings(settings: AccessibilitySettings): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }

  getSettings(): AccessibilitySettings {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultSettings;
    }
    return defaultSettings;
  }
}