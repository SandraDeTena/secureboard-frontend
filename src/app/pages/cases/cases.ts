import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type CaseTone = 'purple' | 'blue' | 'red' | 'orange' | 'green';
type CaseTab = 'all' | 'not-started' | 'in-progress' | 'completed';
type ViewMode = 'grid' | 'list';

interface CaseCard {
  number: string;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  time: string;
  progress: number;
  tone: CaseTone;
  icon: string;
  dots: number;
  route: string;
  recommendedOrder: number;
}

@Component({
  selector: 'app-cases',
  imports: [RouterLink],
  templateUrl: './cases.html',
  styleUrl: './cases.css',
})
export class Cases {
  selectedTab: CaseTab = 'all';
  selectedDifficulty = 'Todas';
  selectedOrder = 'Recomendados';
  searchTerm = '';
  viewMode: ViewMode = 'grid';

  cases: CaseCard[] = [
    {
      number: '01',
      title: 'OSINT Investigation',
      description:
        'Investiga un dominio sospechoso y recopila información pública para identificar posibles riesgos.',
      difficulty: 'Fácil',
      time: '60 - 90 min',
      progress: 0,
      tone: 'purple',
      icon: 'osint',
      dots: 4,
      route: '/cases/osint',
      recommendedOrder: 1,
    },
    {
      number: '02',
      title: 'Blue Team Analyst',
      description:
        'Analiza alertas y logs para detectar, contener y responder a amenazas en un entorno simulado.',
      difficulty: 'Media',
      time: '90 - 120 min',
      progress: 0,
      tone: 'blue',
      icon: 'blue',
      dots: 3,
      route: '/cases/blue-team',
      recommendedOrder: 2,
    },
    {
      number: '03',
      title: 'Red Team Assessment',
      description:
        'Realiza un reconocimiento autorizado y evalúa vulnerabilidades en los sistemas objetivo.',
      difficulty: 'Difícil',
      time: '120 - 150 min',
      progress: 0,
      tone: 'red',
      icon: 'red',
      dots: 4,
      route: '/cases/red-team',
      recommendedOrder: 3,
    },
    {
      number: '04',
      title: 'Security Engineer',
      description:
        'Evalúa la configuración de seguridad y aplica medidas de hardening en un sistema simulado.',
      difficulty: 'Media',
      time: '60 - 90 min',
      progress: 0,
      tone: 'orange',
      icon: 'engineer',
      dots: 4,
      route: '/cases/security-engineer',
      recommendedOrder: 4,
    },
    {
      number: '05',
      title: 'Incident Response',
      description:
        'Responde a un incidente de ransomware, contiene el ataque y recupera la operación.',
      difficulty: 'Difícil',
      time: '120 - 180 min',
      progress: 0,
      tone: 'green',
      icon: 'incident',
      dots: 4,
      route: '/cases/incident-response',
      recommendedOrder: 5,
    },
  ];

  setTab(tab: CaseTab): void {
    this.selectedTab = tab;
  }

  setDifficulty(value: string): void {
    this.selectedDifficulty = value;
  }

  setOrder(value: string): void {
    this.selectedOrder = value;
  }

  setSearch(value: string): void {
    this.searchTerm = value.trim().toLowerCase();
  }

  setViewMode(mode: ViewMode): void {
    this.viewMode = mode;
  }

  resetFilters(): void {
    this.selectedTab = 'all';
    this.selectedDifficulty = 'Todas';
    this.selectedOrder = 'Recomendados';
    this.searchTerm = '';
  }

  get notStartedCount(): number {
    return this.cases.filter((item) => item.progress === 0).length;
  }

  get inProgressCount(): number {
    return this.cases.filter((item) => item.progress > 0 && item.progress < 100).length;
  }

  get completedCount(): number {
    return this.cases.filter((item) => item.progress === 100).length;
  }

  get filteredCases(): CaseCard[] {
    const filtered = this.cases.filter((item) => {
      const matchesTab = this.matchesSelectedTab(item);

      const matchesDifficulty =
        this.selectedDifficulty === 'Todas' || item.difficulty === this.selectedDifficulty;

      const searchableText = [item.title, item.description, item.difficulty, item.time]
        .join(' ')
        .toLowerCase();

      const matchesSearch = this.searchTerm === '' || searchableText.includes(this.searchTerm);

      return matchesTab && matchesDifficulty && matchesSearch;
    });

    return this.sortCases(filtered);
  }

  private matchesSelectedTab(item: CaseCard): boolean {
    switch (this.selectedTab) {
      case 'not-started':
        return item.progress === 0;

      case 'in-progress':
        return item.progress > 0 && item.progress < 100;

      case 'completed':
        return item.progress === 100;

      default:
        return true;
    }
  }

  private sortCases(items: CaseCard[]): CaseCard[] {
    const sortedItems = [...items];

    switch (this.selectedOrder) {
      case 'Nombre A-Z':
        return sortedItems.sort((a, b) => a.title.localeCompare(b.title));

      case 'Más fáciles':
        return sortedItems.sort(
          (a, b) => this.getDifficultyValue(a.difficulty) - this.getDifficultyValue(b.difficulty),
        );

      case 'Más difíciles':
        return sortedItems.sort(
          (a, b) => this.getDifficultyValue(b.difficulty) - this.getDifficultyValue(a.difficulty),
        );

      case 'Menor duración':
        return sortedItems.sort(
          (a, b) => this.getMinimumMinutes(a.time) - this.getMinimumMinutes(b.time),
        );

      case 'Mayor duración':
        return sortedItems.sort(
          (a, b) => this.getMaximumMinutes(b.time) - this.getMaximumMinutes(a.time),
        );

      default:
        return sortedItems.sort((a, b) => a.recommendedOrder - b.recommendedOrder);
    }
  }

  private getDifficultyValue(difficulty: CaseCard['difficulty']): number {
    const values: Record<CaseCard['difficulty'], number> = {
      Fácil: 1,
      Media: 2,
      Difícil: 3,
    };

    return values[difficulty];
  }

  private getMinimumMinutes(time: string): number {
    const firstNumber = time.match(/\d+/);
    return firstNumber ? Number(firstNumber[0]) : 0;
  }

  private getMaximumMinutes(time: string): number {
    const numbers = time.match(/\d+/g);

    if (!numbers?.length) {
      return 0;
    }

    return Number(numbers[numbers.length - 1]);
  }
}
