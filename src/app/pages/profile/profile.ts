import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type PlayerRole = 'SOC Analyst' | 'Blue Team Analyst' | 'Red Team Operator' | 'Security Engineer' | 'Incident Responder';
type Tone = 'purple' | 'blue' | 'red' | 'orange' | 'green' | 'gold';

interface Skill { name: string; value: number; tone: Tone; }
interface Badge { name: string; description: string; icon: string; unlocked: boolean; progress: number; tone: Tone; }
interface Activity { title: string; description: string; date: string; points: number; icon: string; tone: Tone; }

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  editOpen = false;

  playerName = 'Sandra De Tena';
  username = '@sandra.soc';
  role: PlayerRole = 'SOC Analyst';
  biography = 'Analista en formación especializada en investigación, análisis de alertas y respuesta a incidentes dentro de entornos simulados.';
  location = 'Madrid, España';

  editName = this.playerName;
  editUsername = this.username;
  editRole: PlayerRole = this.role;
  editBiography = this.biography;
  editLocation = this.location;

  readonly level = 5;
  readonly currentXp = 2450;
  readonly nextLevelXp = 3000;
  readonly totalPoints = 4850;
  readonly completedCases = 3;
  readonly activeCases = 2;
  readonly unlockedBadges = 7;
  readonly totalBadges = 12;
  readonly streakDays = 8;
  readonly rank = 'Top 18%';

  roles: PlayerRole[] = ['SOC Analyst', 'Blue Team Analyst', 'Red Team Operator', 'Security Engineer', 'Incident Responder'];

  skills: Skill[] = [
    { name: 'OSINT', value: 78, tone: 'purple' },
    { name: 'Blue Team', value: 86, tone: 'blue' },
    { name: 'Red Team', value: 54, tone: 'red' },
    { name: 'Security Engineering', value: 68, tone: 'orange' },
    { name: 'Incident Response', value: 72, tone: 'green' },
  ];

  badges: Badge[] = [
    { name: 'Primer análisis', description: 'Completa tu primer caso práctico.', icon: '✓', unlocked: true, progress: 100, tone: 'green' },
    { name: 'Investigador OSINT', description: 'Finaliza el caso de investigación OSINT.', icon: '⌕', unlocked: true, progress: 100, tone: 'purple' },
    { name: 'Defensa activa', description: 'Analiza y contiene una amenaza Blue Team.', icon: '▣', unlocked: true, progress: 100, tone: 'blue' },
    { name: 'Pentester ético', description: 'Documenta una evaluación Red Team.', icon: '◎', unlocked: false, progress: 65, tone: 'red' },
    { name: 'Arquitectura segura', description: 'Valida cinco controles de seguridad.', icon: '⚙', unlocked: false, progress: 40, tone: 'orange' },
    { name: 'Respuesta eficaz', description: 'Completa un caso de Incident Response.', icon: '⚠', unlocked: false, progress: 25, tone: 'green' },
  ];

  activities: Activity[] = [
    { title: 'Caso Blue Team completado', description: 'Has finalizado el análisis de alertas y evidencias.', date: 'Hoy, 12:45', points: 850, icon: '▣', tone: 'blue' },
    { title: 'Nueva insignia desbloqueada', description: 'Has conseguido la insignia “Defensa activa”.', date: 'Hoy, 12:46', points: 150, icon: '★', tone: 'gold' },
    { title: 'Fase Red Team completada', description: 'Reconocimiento y enumeración finalizados.', date: 'Ayer, 18:20', points: 220, icon: '◎', tone: 'red' },
    { title: 'Racha de aprendizaje', description: 'Has practicado durante 8 días consecutivos.', date: 'Ayer, 09:10', points: 100, icon: '↗', tone: 'green' },
  ];

  openEdit(): void {
    this.editName = this.playerName;
    this.editUsername = this.username;
    this.editRole = this.role;
    this.editBiography = this.biography;
    this.editLocation = this.location;
    this.editOpen = true;
  }

  closeEdit(): void { this.editOpen = false; }

  saveProfile(): void {
    if (!this.canSaveProfile) return;
    this.playerName = this.clean(this.editName);
    this.username = this.normalizeUsername(this.editUsername);
    this.role = this.editRole;
    this.biography = this.clean(this.editBiography);
    this.location = this.clean(this.editLocation);
    this.closeEdit();
  }

  get levelProgress(): number { return Math.round((this.currentXp / this.nextLevelXp) * 100); }
  get pointsToNextLevel(): number { return this.nextLevelXp - this.currentXp; }
  get badgeProgress(): number { return Math.round((this.unlockedBadges / this.totalBadges) * 100); }
  get canSaveProfile(): boolean {
    return this.editName.trim().length >= 3 && this.editUsername.trim().length >= 3 && this.editBiography.trim().length >= 20 && this.editLocation.trim().length >= 3;
  }
  get initials(): string {
    return this.playerName.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('');
  }

  private clean(value: string): string { return value.trim().slice(0, 300); }
  private normalizeUsername(value: string): string {
    const cleanValue = value.trim().replace(/\s+/g, '.').replace(/[^a-zA-Z0-9._@-]/g, '');
    return cleanValue.startsWith('@') ? cleanValue : `@${cleanValue}`;
  }
}