import { AccessibilitySettings, IAccessibilityRepository } from "@/domain/entities/AccessibilitySettings";

export class ManageSettingsUseCase {
  constructor(private repository: IAccessibilityRepository) {}

  executeSave(settings: AccessibilitySettings) {
    this.repository.saveSettings(settings);
  }

  executeLoad(): AccessibilitySettings {
    return this.repository.getSettings();
  }
}