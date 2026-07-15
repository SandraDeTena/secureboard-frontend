import {
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CurrentUserService } from '../../core/services/current-user.service';

type PlayerRole =
  | 'SOC Analyst'
  | 'Blue Team Analyst'
  | 'Red Team Operator'
  | 'Security Engineer'
  | 'Incident Responder';

type ProfileModal = 'edit' | 'progress' | 'skills' | 'activity' | null;
type Tone = 'purple' | 'blue' | 'red' | 'orange' | 'green' | 'gold';

interface Skill {
  name: string;
  value: number;
  tone: Tone;
}

interface Badge {
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  tone: Tone;
}

interface Activity {
  title: string;
  description: string;
  date: string;
  points: number;
  icon: string;
  tone: Tone;
}

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private readonly currentUserService = inject(CurrentUserService);

  @ViewChild('avatarInput')
  avatarInput?: ElementRef<HTMLInputElement>;

  readonly user = this.currentUserService.user;
  readonly userInitials = this.currentUserService.initials;

  activeModal: ProfileModal = null;

  avatarPreview: string | null = null;
  avatarFile: File | null = null;
  avatarError = '';
  avatarSuccess = '';

  editName = '';
  editUsername = '';
  editRole: PlayerRole = 'SOC Analyst';
  editBiography = '';
  editLocation = '';

  private readonly allowedAvatarTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];

  private readonly maxAvatarSize = 2 * 1024 * 1024;

  readonly currentXp = 2450;
  readonly nextLevelXp = 3000;
  readonly completedCases = 3;
  readonly activeCases = 2;
  readonly unlockedBadges = 7;
  readonly totalBadges = 12;
  readonly streakDays = 8;
  readonly rank = 'Top 18%';

  readonly roles: PlayerRole[] = [
    'SOC Analyst',
    'Blue Team Analyst',
    'Red Team Operator',
    'Security Engineer',
    'Incident Responder',
  ];

  readonly skills: Skill[] = [
    { name: 'OSINT', value: 78, tone: 'purple' },
    { name: 'Blue Team', value: 86, tone: 'blue' },
    { name: 'Red Team', value: 54, tone: 'red' },
    { name: 'Security Engineering', value: 68, tone: 'orange' },
    { name: 'Incident Response', value: 72, tone: 'green' },
  ];

  readonly badges: Badge[] = [
    { name: 'Primer análisis', description: 'Completa tu primer caso práctico.', icon: '✓', unlocked: true, progress: 100, tone: 'green' },
    { name: 'Investigador OSINT', description: 'Finaliza el caso de investigación OSINT.', icon: '⌕', unlocked: true, progress: 100, tone: 'purple' },
    { name: 'Defensa activa', description: 'Analiza y contiene una amenaza Blue Team.', icon: '▣', unlocked: true, progress: 100, tone: 'blue' },
    { name: 'Pentester ético', description: 'Documenta una evaluación Red Team.', icon: '◎', unlocked: false, progress: 65, tone: 'red' },
    { name: 'Arquitectura segura', description: 'Valida cinco controles de seguridad.', icon: '⚙', unlocked: false, progress: 40, tone: 'orange' },
    { name: 'Respuesta eficaz', description: 'Completa un caso de Incident Response.', icon: '⚠', unlocked: false, progress: 25, tone: 'green' },
  ];

  readonly caseProgress = [
    { number: '01', name: 'OSINT Investigation', progress: 100, status: 'Completado', tone: 'purple' },
    { number: '02', name: 'Blue Team Analyst', progress: 100, status: 'Completado', tone: 'blue' },
    { number: '03', name: 'Red Team Assessment', progress: 65, status: 'En progreso', tone: 'red' },
    { number: '04', name: 'Security Engineer', progress: 40, status: 'En progreso', tone: 'orange' },
    { number: '05', name: 'Incident Response', progress: 25, status: 'En progreso', tone: 'green' },
  ];

  readonly activities: Activity[] = [
    { title: 'Caso Blue Team completado', description: 'Has finalizado el análisis de alertas y evidencias.', date: 'Hoy, 12:45', points: 850, icon: '▣', tone: 'blue' },
    { title: 'Nueva insignia desbloqueada', description: 'Has conseguido la insignia “Defensa activa”.', date: 'Hoy, 12:46', points: 150, icon: '★', tone: 'gold' },
    { title: 'Fase Red Team completada', description: 'Reconocimiento y enumeración finalizados.', date: 'Ayer, 18:20', points: 220, icon: '◎', tone: 'red' },
    { title: 'Racha de aprendizaje', description: 'Has practicado durante 8 días consecutivos.', date: 'Ayer, 09:10', points: 100, icon: '↗', tone: 'green' },
    { title: 'Informe OSINT guardado', description: 'Has completado el resumen ejecutivo y las recomendaciones.', date: '10 jul, 17:05', points: 180, icon: '▤', tone: 'purple' },
    { title: 'Control de seguridad validado', description: 'Has validado un control de hardening del sistema.', date: '9 jul, 20:30', points: 140, icon: '⚙', tone: 'orange' },
    { title: 'Evidencia registrada', description: 'Has añadido una evidencia al caso Incident Response.', date: '8 jul, 11:15', points: 90, icon: '⚠', tone: 'green' },
    { title: 'Perfil SOC creado', description: 'Has configurado tu identidad y rol dentro de SecureBoard.', date: '7 jul, 18:00', points: 50, icon: '◆', tone: 'purple' },
  ];

  get playerName(): string {
    return this.user().displayName;
  }

  get username(): string {
    return `@${this.user().username}`;
  }

  get role(): PlayerRole {
    return this.toPlayerRole(this.user().roleLabel);
  }

  get biography(): string {
    return this.user().bio;
  }

  get location(): string {
    return this.user().location;
  }

  get level(): number {
    return this.user().level;
  }

  get totalPoints(): number {
    return this.user().points;
  }

  get initials(): string {
    return this.userInitials();
  }

  get displayedAvatar(): string | null {
    return this.avatarPreview ?? this.user().avatarUrl;
  }

  openEdit(): void {
    const currentUser = this.user();

    this.editName = currentUser.displayName;
    this.editUsername = currentUser.username;
    this.editRole = this.toPlayerRole(currentUser.roleLabel);
    this.editBiography = currentUser.bio;
    this.editLocation = currentUser.location;
    this.avatarError = '';
    this.avatarSuccess = '';
    this.activeModal = 'edit';
  }

  closeModal(): void {
    this.cancelAvatarPreview();
    this.activeModal = null;
  }

  openProgress(): void {
    this.activeModal = 'progress';
  }

  openSkills(): void {
    this.activeModal = 'skills';
  }

  openActivity(): void {
    this.activeModal = 'activity';
  }

  saveProfile(): void {
    if (!this.canSaveProfile) {
      return;
    }

    this.currentUserService.updateProfile({
      displayName: this.clean(this.editName, 80),
      username: this.normalizeUsername(this.editUsername),
      roleLabel: this.editRole,
      bio: this.clean(this.editBiography, 300),
      location: this.clean(this.editLocation, 100),
    });

    if (this.avatarPreview && this.avatarFile) {
      this.currentUserService.saveAvatar(this.avatarPreview);
    }

    this.activeModal = null;
    this.avatarPreview = null;
    this.avatarFile = null;
    this.avatarError = '';
    this.avatarSuccess = '';

    if (this.avatarInput) {
      this.avatarInput.nativeElement.value = '';
    }
  }

  openAvatarSelector(): void {
    this.avatarInput?.nativeElement.click();
  }

  onAvatarSelected(event: Event): void {
    this.avatarError = '';
    this.avatarSuccess = '';

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!this.allowedAvatarTypes.includes(file.type)) {
      this.avatarError = 'El archivo debe ser JPG, JPEG, PNG o WEBP.';
      input.value = '';
      return;
    }

    if (file.size > this.maxAvatarSize) {
      this.avatarError = 'La fotografía no puede superar los 2 MB.';
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.avatarError = 'No se ha podido leer la fotografía seleccionada.';
        return;
      }

      this.avatarFile = file;
      this.avatarPreview = reader.result;
      this.avatarSuccess = 'Vista previa preparada. Pulsa Guardar cambios.';
    };

    reader.onerror = () => {
      this.avatarError = 'Ha ocurrido un error al procesar la fotografía.';
    };

    reader.readAsDataURL(file);
  }

  cancelAvatarPreview(): void {
    this.avatarPreview = null;
    this.avatarFile = null;
    this.avatarError = '';
    this.avatarSuccess = '';

    if (this.avatarInput) {
      this.avatarInput.nativeElement.value = '';
    }
  }

  removeAvatar(): void {
    this.currentUserService.removeAvatar();
    this.cancelAvatarPreview();
    this.avatarSuccess = 'La fotografía se ha eliminado correctamente.';
  }

  get levelProgress(): number {
    return Math.round((this.currentXp / this.nextLevelXp) * 100);
  }

  get pointsToNextLevel(): number {
    return this.nextLevelXp - this.currentXp;
  }

  get badgeProgress(): number {
    return Math.round((this.unlockedBadges / this.totalBadges) * 100);
  }

  get canSaveProfile(): boolean {
    return (
      this.editName.trim().length >= 3 &&
      this.editUsername.trim().length >= 3 &&
      this.editBiography.trim().length >= 20 &&
      this.editLocation.trim().length >= 3
    );
  }

  private clean(value: string, maxLength: number): string {
    return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
  }

  private normalizeUsername(value: string): string {
    return value
      .trim()
      .replace(/^@+/, '')
      .replace(/\s+/g, '.')
      .replace(/[^a-zA-Z0-9._-]/g, '')
      .slice(0, 40);
  }

  private toPlayerRole(roleLabel: string): PlayerRole {
    return this.roles.includes(roleLabel as PlayerRole)
      ? (roleLabel as PlayerRole)
      : 'SOC Analyst';
  }
}