import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type ProgressTab = 'overview' | 'cases' | 'skills' | 'activity' | 'goals';
type CaseStatus = 'No iniciado' | 'En progreso' | 'Completado';
type CaseTone = 'purple' | 'blue' | 'red' | 'orange' | 'green';
type ActivityType = 'case' | 'badge' | 'report' | 'evidence' | 'streak';
type ActivityFilter = 'Todas' | ActivityType;
type GoalStatus = 'Activa' | 'Completada';

interface CaseProgress {
  id: number;
  number: string;
  title: string;
  description: string;
  route: string;
  tone: CaseTone;
  progress: number;
  status: CaseStatus;
  completedPhases: number;
  totalPhases: number;
  points: number;
  maxPoints: number;
  timeSpentMinutes: number;
  evidenceCount: number;
  reportCompleted: boolean;
  lastActivity: string;
}

interface SkillProgress {
  id: number;
  name: string;
  description: string;
  tone: CaseTone;
  value: number;
  previousValue: number;
  completedTasks: number;
  totalTasks: number;
}

interface ProgressActivity {
  id: number;
  title: string;
  description: string;
  date: string;
  points: number;
  icon: string;
  tone: CaseTone | 'gold';
  type: ActivityType;
}

interface LearningGoal {
  id: number;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  status: GoalStatus;
}

interface WeeklyPoint {
  day: string;
  value: number;
}

@Component({
  selector: 'app-progress',
  imports: [RouterLink],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress {
  selectedTab: ProgressTab = 'overview';
  selectedCaseStatus: 'Todos' | CaseStatus = 'Todos';
  selectedActivityFilter: ActivityFilter = 'Todas';
  caseSearch = '';
  activitySearch = '';

  selectedCase: CaseProgress | null = null;
  showGoalForm = false;
  editingGoalId: number | null = null;
  showResetModal = false;

  goalTitle = '';
  goalDescription = '';
  goalTarget = 10;
  goalCurrent = 0;
  goalUnit = 'tareas';
  goalDeadline = '';

  readonly todayIso = this.getTodayIso();

  readonly tabs: { id: ProgressTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Resumen', icon: '▦' },
    { id: 'cases', label: 'Casos', icon: '▣' },
    { id: 'skills', label: 'Habilidades', icon: '↗' },
    { id: 'activity', label: 'Actividad', icon: '◷' },
    { id: 'goals', label: 'Objetivos', icon: '◎' },
  ];

  cases: CaseProgress[] = [
    {
      id: 1,
      number: '01',
      title: 'OSINT Investigation',
      description: 'Investigación de fuentes abiertas, análisis de dominios y elaboración de hallazgos.',
      route: '/cases/osint',
      tone: 'purple',
      progress: 100,
      status: 'Completado',
      completedPhases: 5,
      totalPhases: 5,
      points: 900,
      maxPoints: 900,
      timeSpentMinutes: 145,
      evidenceCount: 8,
      reportCompleted: true,
      lastActivity: '10 julio 2026',
    },
    {
      id: 2,
      number: '02',
      title: 'Blue Team Analyst',
      description: 'Análisis de alertas, logs, IoCs y respuesta defensiva.',
      route: '/cases/blue-team',
      tone: 'blue',
      progress: 100,
      status: 'Completado',
      completedPhases: 5,
      totalPhases: 5,
      points: 850,
      maxPoints: 850,
      timeSpentMinutes: 170,
      evidenceCount: 12,
      reportCompleted: true,
      lastActivity: '12 julio 2026',
    },
    {
      id: 3,
      number: '03',
      title: 'Red Team Assessment',
      description: 'Reconocimiento autorizado, evaluación de vulnerabilidades y documentación técnica.',
      route: '/cases/red-team',
      tone: 'red',
      progress: 65,
      status: 'En progreso',
      completedPhases: 3,
      totalPhases: 5,
      points: 520,
      maxPoints: 800,
      timeSpentMinutes: 95,
      evidenceCount: 5,
      reportCompleted: false,
      lastActivity: '12 julio 2026',
    },
    {
      id: 4,
      number: '04',
      title: 'Security Engineer',
      description: 'Hardening, implementación de controles y validación de configuraciones.',
      route: '/cases/security-engineer',
      tone: 'orange',
      progress: 40,
      status: 'En progreso',
      completedPhases: 2,
      totalPhases: 5,
      points: 280,
      maxPoints: 700,
      timeSpentMinutes: 55,
      evidenceCount: 4,
      reportCompleted: false,
      lastActivity: '11 julio 2026',
    },
    {
      id: 5,
      number: '05',
      title: 'Incident Response',
      description: 'Identificación, contención, erradicación, recuperación y lecciones aprendidas.',
      route: '/cases/incident-response',
      tone: 'green',
      progress: 25,
      status: 'En progreso',
      completedPhases: 1,
      totalPhases: 5,
      points: 100,
      maxPoints: 400,
      timeSpentMinutes: 35,
      evidenceCount: 2,
      reportCompleted: false,
      lastActivity: '12 julio 2026',
    },
  ];

  skills: SkillProgress[] = [
    {
      id: 1,
      name: 'OSINT',
      description: 'Búsqueda, verificación y análisis de información pública.',
      tone: 'purple',
      value: 88,
      previousValue: 72,
      completedTasks: 22,
      totalTasks: 25,
    },
    {
      id: 2,
      name: 'Blue Team',
      description: 'Monitorización, detección y análisis defensivo.',
      tone: 'blue',
      value: 92,
      previousValue: 78,
      completedTasks: 24,
      totalTasks: 26,
    },
    {
      id: 3,
      name: 'Red Team',
      description: 'Reconocimiento, enumeración y explotación controlada.',
      tone: 'red',
      value: 61,
      previousValue: 48,
      completedTasks: 14,
      totalTasks: 23,
    },
    {
      id: 4,
      name: 'Security Engineering',
      description: 'Diseño, aplicación y validación de controles.',
      tone: 'orange',
      value: 52,
      previousValue: 38,
      completedTasks: 11,
      totalTasks: 21,
    },
    {
      id: 5,
      name: 'Incident Response',
      description: 'Contención, recuperación, evidencias y documentación.',
      tone: 'green',
      value: 45,
      previousValue: 30,
      completedTasks: 9,
      totalTasks: 20,
    },
  ];

  activities: ProgressActivity[] = [
    {
      id: 1,
      title: 'Blue Team Analyst completado',
      description: 'Has completado las cinco fases y el informe final.',
      date: 'Hoy, 12:45',
      points: 850,
      icon: '▣',
      tone: 'blue',
      type: 'case',
    },
    {
      id: 2,
      title: 'Insignia Defensa activa',
      description: 'Has desbloqueado una nueva insignia defensiva.',
      date: 'Hoy, 12:46',
      points: 150,
      icon: '★',
      tone: 'gold',
      type: 'badge',
    },
    {
      id: 3,
      title: 'Informe OSINT finalizado',
      description: 'Resumen, alcance, metodología y conclusiones completados.',
      date: '10 julio, 17:05',
      points: 180,
      icon: '▤',
      tone: 'purple',
      type: 'report',
    },
    {
      id: 4,
      title: 'Evidencia Red Team añadida',
      description: 'Has documentado una vulnerabilidad con impacto y recomendación.',
      date: '10 julio, 15:10',
      points: 90,
      icon: '◎',
      tone: 'red',
      type: 'evidence',
    },
    {
      id: 5,
      title: 'Control de hardening validado',
      description: 'Has validado un control dentro de Security Engineer.',
      date: '9 julio, 20:30',
      points: 140,
      icon: '⚙',
      tone: 'orange',
      type: 'evidence',
    },
    {
      id: 6,
      title: 'Racha de 8 días',
      description: 'Has practicado durante ocho días consecutivos.',
      date: '9 julio, 09:10',
      points: 100,
      icon: '↗',
      tone: 'green',
      type: 'streak',
    },
    {
      id: 7,
      title: 'Evidencia Incident Response',
      description: 'Has añadido una evidencia al incidente simulado.',
      date: '8 julio, 11:15',
      points: 90,
      icon: '⚠',
      tone: 'green',
      type: 'evidence',
    },
    {
      id: 8,
      title: 'Caso OSINT completado',
      description: 'Has terminado la investigación y generado el informe.',
      date: '7 julio, 18:00',
      points: 900,
      icon: '⌕',
      tone: 'purple',
      type: 'case',
    },
  ];

  goals: LearningGoal[] = [
    {
      id: 1,
      title: 'Completar Red Team',
      description: 'Finalizar las fases restantes y generar el informe.',
      target: 5,
      current: 3,
      unit: 'fases',
      deadline: '2026-07-18',
      status: 'Activa',
    },
    {
      id: 2,
      title: 'Registrar 15 evidencias',
      description: 'Documentar evidencias verificadas en todos los casos.',
      target: 15,
      current: 11,
      unit: 'evidencias',
      deadline: '2026-07-20',
      status: 'Activa',
    },
    {
      id: 3,
      title: 'Completar dos informes',
      description: 'Finalizar informes técnicos dentro del laboratorio.',
      target: 2,
      current: 2,
      unit: 'informes',
      deadline: '2026-07-12',
      status: 'Completada',
    },
  ];

  weeklyPoints: WeeklyPoint[] = [
    { day: 'Lun', value: 180 },
    { day: 'Mar', value: 320 },
    { day: 'Mié', value: 140 },
    { day: 'Jue', value: 450 },
    { day: 'Vie', value: 260 },
    { day: 'Sáb', value: 540 },
    { day: 'Dom', value: 390 },
  ];

  selectTab(tab: ProgressTab): void {
    this.selectedTab = tab;
  }

  updateCaseSearch(value: string): void {
    this.caseSearch = value.slice(0, 100);
  }

  updateActivitySearch(value: string): void {
    this.activitySearch = value.slice(0, 100);
  }

  openCaseDetails(caseItem: CaseProgress): void {
    this.selectedCase = caseItem;
  }

  closeCaseDetails(): void {
    this.selectedCase = null;
  }

  openNewGoal(): void {
    this.resetGoalForm();
    this.showGoalForm = true;
  }

  editGoal(goal: LearningGoal): void {
    this.editingGoalId = goal.id;
    this.goalTitle = goal.title;
    this.goalDescription = goal.description;
    this.goalTarget = goal.target;
    this.goalCurrent = goal.current;
    this.goalUnit = goal.unit;
    this.goalDeadline = goal.deadline;
    this.showGoalForm = true;
  }

  closeGoalForm(): void {
    this.showGoalForm = false;
    this.resetGoalForm();
  }

  saveGoal(): void {
    if (!this.canSaveGoal) {
      return;
    }

    const safeTarget = Math.max(1, Number(this.goalTarget));
    const safeCurrent = Math.max(
      0,
      Math.min(Number(this.goalCurrent), safeTarget)
    );

    const goalData = {
      title: this.clean(this.goalTitle, 100),
      description: this.clean(this.goalDescription, 300),
      target: safeTarget,
      current: safeCurrent,
      unit: this.clean(this.goalUnit, 40),
      deadline: this.goalDeadline,
    };

    if (this.editingGoalId !== null) {
      this.goals = this.goals.map((goal) =>
        goal.id === this.editingGoalId
          ? {
              ...goal,
              ...goalData,
              status:
                goalData.current >= goalData.target
                  ? 'Completada'
                  : 'Activa',
            }
          : goal
      );
    } else {
      this.goals = [
        {
          id: Date.now(),
          ...goalData,
          status:
            goalData.current >= goalData.target
              ? 'Completada'
              : 'Activa',
        },
        ...this.goals,
      ];
    }

    this.closeGoalForm();
  }

  incrementGoal(goalId: number): void {
    this.goals = this.goals.map((goal) => {
      if (goal.id !== goalId || goal.status === 'Completada') {
        return goal;
      }

      const current = Math.min(goal.target, goal.current + 1);
      return {
        ...goal,
        current,
        status: current >= goal.target ? 'Completada' : 'Activa',
      };
    });
  }

  deleteGoal(goalId: number): void {
    if (window.confirm('¿Eliminar este objetivo?')) {
      this.goals = this.goals.filter((goal) => goal.id !== goalId);
    }
  }

  printProgress(): void {
    window.print();
  }

  confirmReset(): void {
    this.showResetModal = true;
  }

  cancelReset(): void {
    this.showResetModal = false;
  }

  resetProgress(): void {
    this.cases = this.cases.map((caseItem) => ({
      ...caseItem,
      progress: 0,
      status: 'No iniciado',
      completedPhases: 0,
      points: 0,
      timeSpentMinutes: 0,
      evidenceCount: 0,
      reportCompleted: false,
      lastActivity: 'Sin actividad',
    }));

    this.skills = this.skills.map((skill) => ({
      ...skill,
      value: 0,
      completedTasks: 0,
    }));

    this.activities = [];
    this.goals = this.goals.map((goal) => ({
      ...goal,
      current: 0,
      status: 'Activa',
    }));

    this.showResetModal = false;
    this.selectedTab = 'overview';
  }

  get filteredCases(): CaseProgress[] {
    const query = this.caseSearch.trim().toLowerCase();

    return this.cases.filter((caseItem) => {
      const matchesStatus =
        this.selectedCaseStatus === 'Todos' ||
        caseItem.status === this.selectedCaseStatus;

      const matchesSearch =
        !query ||
        caseItem.title.toLowerCase().includes(query) ||
        caseItem.description.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }

  get filteredActivities(): ProgressActivity[] {
    const query = this.activitySearch.trim().toLowerCase();

    return this.activities.filter((activity) => {
      const matchesType =
        this.selectedActivityFilter === 'Todas' ||
        activity.type === this.selectedActivityFilter;

      const matchesSearch =
        !query ||
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }

  get completedCases(): number {
    return this.cases.filter((caseItem) => caseItem.status === 'Completado').length;
  }

  get activeCases(): number {
    return this.cases.filter((caseItem) => caseItem.status === 'En progreso').length;
  }

  get totalPoints(): number {
    return this.cases.reduce((sum, caseItem) => sum + caseItem.points, 0);
  }

  get totalPossiblePoints(): number {
    return this.cases.reduce((sum, caseItem) => sum + caseItem.maxPoints, 0);
  }

  get totalTimeMinutes(): number {
    return this.cases.reduce((sum, caseItem) => sum + caseItem.timeSpentMinutes, 0);
  }

  get totalEvidences(): number {
    return this.cases.reduce((sum, caseItem) => sum + caseItem.evidenceCount, 0);
  }

  get completedReports(): number {
    return this.cases.filter((caseItem) => caseItem.reportCompleted).length;
  }

  get globalProgress(): number {
    if (this.cases.length === 0) {
      return 0;
    }

    return Math.round(
      this.cases.reduce((sum, caseItem) => sum + caseItem.progress, 0) /
        this.cases.length
    );
  }

  get averageSkill(): number {
    if (this.skills.length === 0) {
      return 0;
    }

    return Math.round(
      this.skills.reduce((sum, skill) => sum + skill.value, 0) /
        this.skills.length
    );
  }

  get bestSkill(): SkillProgress | null {
    if (this.skills.length === 0) {
      return null;
    }

    return [...this.skills].sort((a, b) => b.value - a.value)[0];
  }

  get activeGoals(): number {
    return this.goals.filter((goal) => goal.status === 'Activa').length;
  }

  get completedGoals(): number {
    return this.goals.filter((goal) => goal.status === 'Completada').length;
  }

  get maxWeeklyPoints(): number {
    return Math.max(...this.weeklyPoints.map((point) => point.value), 1);
  }

  get canSaveGoal(): boolean {
    return (
      this.goalTitle.trim().length >= 3 &&
      this.goalDescription.trim().length >= 10 &&
      Number(this.goalTarget) > 0 &&
      Number(this.goalCurrent) >= 0 &&
      Number(this.goalCurrent) <= Number(this.goalTarget) &&
      this.goalUnit.trim().length >= 2 &&
      this.goalDeadline.trim().length > 0 &&
      this.goalDeadline >= this.todayIso
    );
  }

  get formattedTotalTime(): string {
    const hours = Math.floor(this.totalTimeMinutes / 60);
    const minutes = this.totalTimeMinutes % 60;
    return `${hours} h ${minutes} min`;
  }

  goalProgress(goal: LearningGoal): number {
    if (goal.target <= 0) {
      return 0;
    }

    return Math.min(100, Math.round((goal.current / goal.target) * 100));
  }

  casePointProgress(caseItem: CaseProgress): number {
    if (caseItem.maxPoints <= 0) {
      return 0;
    }

    return Math.min(
      100,
      Math.round((caseItem.points / caseItem.maxPoints) * 100)
    );
  }

  private resetGoalForm(): void {
    this.editingGoalId = null;
    this.goalTitle = '';
    this.goalDescription = '';
    this.goalTarget = 10;
    this.goalCurrent = 0;
    this.goalUnit = 'tareas';
    this.goalDeadline = '';
  }

  private clean(value: string, maxLength: number): string {
    return value.trim().slice(0, maxLength);
  }

  private getTodayIso(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}