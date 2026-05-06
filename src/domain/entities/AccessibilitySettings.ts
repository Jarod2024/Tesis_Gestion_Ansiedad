export interface AccessibilitySettings {
  theme: 'light' | 'dark' | 'high-contrast';
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'sans' | 'serif' | 'dyslexic';
  language?: string; 
}

export interface IAccessibilityRepository {
  saveSettings(settings: AccessibilitySettings): void;
  getSettings(): AccessibilitySettings;
}