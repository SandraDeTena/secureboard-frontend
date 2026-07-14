import { Component } from '@angular/core';

type SettingsTab = 'account' | 'security' | 'appearance' | 'notifications' | 'privacy';
type ThemeMode = 'Oscuro' | 'Claro' | 'Sistema';
type DensityMode = 'Cómoda' | 'Compacta';
type LanguageOption = 'Español' | 'English';
type SessionStatus = 'Actual' | 'Activa';

interface SettingsTabItem {
  id: SettingsTab;
  label: string;
  icon: string;
  description: string;
}

interface SessionItem {
  id: number;
  device: string;
  browser: string;
  location: string;
  lastActivity: string;
  status: SessionStatus;
  current: boolean;
}

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Settings {
  selectedTab: SettingsTab = 'account';

  readonly tabs: SettingsTabItem[] = [
    { id: 'account', label: 'Cuenta', icon: '◉', description: 'Información del jugador y preferencias generales.' },
    { id: 'security', label: 'Seguridad', icon: '⌾', description: 'Contraseña, acceso y sesiones abiertas.' },
    { id: 'appearance', label: 'Apariencia', icon: '◐', description: 'Tema, densidad y personalización visual.' },
    { id: 'notifications', label: 'Notificaciones', icon: '♧', description: 'Alertas, recordatorios y comunicaciones.' },
    { id: 'privacy', label: 'Privacidad', icon: '◇', description: 'Datos, visibilidad y eliminación de cuenta.' },
  ];

  displayName = 'Sandra De Tena';
  username = 'sandra.soc';
  email = 'sandra.detena@email.com';
  role = 'SOC Analyst';
  language: LanguageOption = 'Español';
  timezone = 'Europe/Madrid';
  bio = 'Analista en formación especializada en investigación, análisis de alertas y respuesta a incidentes.';
  savedAccountMessage = '';

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  showPasswords = false;
  twoFactorEnabled = false;
  loginAlerts = true;
  autoLogout = true;
  autoLogoutMinutes = 30;
  passwordMessage = '';

  sessions: SessionItem[] = [
    { id: 1, device: 'Windows 11 · Equipo principal', browser: 'Chrome 149', location: 'Madrid, España', lastActivity: 'Ahora', status: 'Actual', current: true },
    { id: 2, device: 'Android · Móvil', browser: 'Chrome Mobile', location: 'Madrid, España', lastActivity: 'Hace 2 horas', status: 'Activa', current: false },
  ];

  theme: ThemeMode = 'Oscuro';
  density: DensityMode = 'Cómoda';
  reduceAnimations = false;
  highContrast = false;
  accentColor = 'Morado';
  sidebarCollapsed = false;
  appearanceMessage = '';

  readonly accentOptions = [
    { name: 'Morado', value: '#8b5cf6' },
    { name: 'Azul', value: '#2f9dff' },
    { name: 'Rojo', value: '#ef4444' },
    { name: 'Naranja', value: '#f97316' },
    { name: 'Verde', value: '#22c55e' },
  ];

  notifyCaseProgress = true;
  notifyNewBadges = true;
  notifyGoals = true;
  notifySecurity = true;
  notifyReports = false;
  emailNotifications = false;
  weeklySummary = true;
  notificationMessage = '';

  profileVisible = true;
  showRanking = true;
  shareActivity = false;
  analyticsConsent = false;
  dataRetention = '12 meses';
  privacyMessage = '';

  showDeleteModal = false;
  showExportModal = false;
  deleteConfirmation = '';
  exportReady = false;

  selectTab(tab: SettingsTab): void {
    this.selectedTab = tab;
    this.clearMessages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  saveAccount(): void {
    if (!this.canSaveAccount) {
      this.savedAccountMessage = 'Revisa los campos obligatorios antes de guardar.';
      return;
    }
    this.displayName = this.clean(this.displayName, 80);
    this.username = this.normalizeUsername(this.username);
    this.email = this.email.trim().toLowerCase();
    this.bio = this.clean(this.bio, 300);
    this.savedAccountMessage = 'Cambios de cuenta guardados correctamente.';
  }

  savePassword(): void {
    this.passwordMessage = '';
    if (!this.canSavePassword) {
      this.passwordMessage = 'La contraseña debe tener al menos 8 caracteres y ambas deben coincidir.';
      return;
    }
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordMessage = 'Contraseña actualizada correctamente.';
  }

  togglePasswords(): void { this.showPasswords = !this.showPasswords; }
  toggleTwoFactor(): void { this.twoFactorEnabled = !this.twoFactorEnabled; }

  closeSession(sessionId: number): void {
    const session = this.sessions.find((item) => item.id === sessionId);
    if (!session || session.current) return;
    this.sessions = this.sessions.filter((item) => item.id !== sessionId);
  }

  closeAllOtherSessions(): void {
    this.sessions = this.sessions.filter((session) => session.current);
  }

  saveAppearance(): void { this.appearanceMessage = 'Preferencias visuales aplicadas en esta sesión.'; }
  saveNotifications(): void { this.notificationMessage = 'Preferencias de notificaciones guardadas.'; }
  savePrivacy(): void { this.privacyMessage = 'Preferencias de privacidad guardadas.'; }

  openExportModal(): void { this.exportReady = false; this.showExportModal = true; }
  prepareExport(): void { this.exportReady = true; }
  closeExportModal(): void { this.showExportModal = false; this.exportReady = false; }
  openDeleteModal(): void { this.deleteConfirmation = ''; this.showDeleteModal = true; }
  closeDeleteModal(): void { this.showDeleteModal = false; this.deleteConfirmation = ''; }

  deleteAccount(): void {
    if (!this.canDeleteAccount) return;
    this.closeDeleteModal();
    this.privacyMessage = 'Solicitud de eliminación preparada. Se conectará al backend para ejecutarla.';
  }

  resetSection(): void {
    switch (this.selectedTab) {
      case 'account':
        this.displayName = 'Sandra De Tena'; this.username = 'sandra.soc'; this.email = 'sandra.detena@email.com'; this.role = 'SOC Analyst'; this.language = 'Español'; this.timezone = 'Europe/Madrid'; this.bio = 'Analista en formación especializada en investigación, análisis de alertas y respuesta a incidentes.'; break;
      case 'security':
        this.currentPassword = ''; this.newPassword = ''; this.confirmPassword = ''; this.twoFactorEnabled = false; this.loginAlerts = true; this.autoLogout = true; this.autoLogoutMinutes = 30; break;
      case 'appearance':
        this.theme = 'Oscuro'; this.density = 'Cómoda'; this.reduceAnimations = false; this.highContrast = false; this.accentColor = 'Morado'; this.sidebarCollapsed = false; break;
      case 'notifications':
        this.notifyCaseProgress = true; this.notifyNewBadges = true; this.notifyGoals = true; this.notifySecurity = true; this.notifyReports = false; this.emailNotifications = false; this.weeklySummary = true; break;
      case 'privacy':
        this.profileVisible = true; this.showRanking = true; this.shareActivity = false; this.analyticsConsent = false; this.dataRetention = '12 meses'; break;
    }
    this.clearMessages();
  }

  get selectedTabInfo(): SettingsTabItem {
    return this.tabs.find((tab) => tab.id === this.selectedTab) ?? this.tabs[0];
  }

  get canSaveAccount(): boolean {
    return this.displayName.trim().length >= 3 && this.username.trim().length >= 3 && this.isValidEmail(this.email) && this.bio.trim().length >= 20;
  }

  get passwordStrength(): number {
    const password = this.newPassword;
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  }

  get passwordStrengthLabel(): string {
    if (this.passwordStrength === 0) return 'Sin evaluar';
    if (this.passwordStrength <= 25) return 'Débil';
    if (this.passwordStrength <= 50) return 'Media';
    if (this.passwordStrength <= 75) return 'Buena';
    return 'Fuerte';
  }

  get canSavePassword(): boolean {
    return this.currentPassword.trim().length > 0 && this.newPassword.length >= 8 && this.newPassword === this.confirmPassword;
  }

  get canDeleteAccount(): boolean {
    return this.deleteConfirmation.trim() === 'ELIMINAR';
  }

  private normalizeUsername(value: string): string {
    return value.trim().replace(/\s+/g, '.').replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 40);
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  private clean(value: string, maxLength: number): string {
    return value.trim().slice(0, maxLength);
  }

  private clearMessages(): void {
    this.savedAccountMessage = '';
    this.passwordMessage = '';
    this.appearanceMessage = '';
    this.notificationMessage = '';
    this.privacyMessage = '';
  }
}