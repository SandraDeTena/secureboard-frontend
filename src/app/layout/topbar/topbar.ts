import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

import { CurrentUserService } from '../../core/services/current-user.service';

interface SearchItem {
  title: string;
  description: string;
  category: string;
  route: string;
  keywords: string[];
}

interface NotificationItem {
  id: number;
  title: string;
  text: string;
  time: string;
  unread: boolean;
  route: string;
  tone: 'purple' | 'blue' | 'green' | 'orange';
}

type OpenMenu = 'search' | 'notifications' | 'help' | 'user' | null;

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  private readonly router = inject(Router);
  private readonly currentUserService = inject(CurrentUserService);

  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  readonly user = this.currentUserService.user;
  readonly userInitials = this.currentUserService.initials;

  searchQuery = '';
  activeMenu: OpenMenu = null;

  readonly searchItems: SearchItem[] = [
    {
      title: 'Dashboard SOC',
      description: 'Resumen general del laboratorio',
      category: 'Página',
      route: '/dashboard',
      keywords: ['inicio', 'home', 'dashboard', 'soc'],
    },
    {
      title: 'Casos Prácticos',
      description: 'Listado completo de escenarios',
      category: 'Página',
      route: '/cases',
      keywords: ['casos', 'prácticas', 'escenarios'],
    },
    {
      title: 'OSINT Investigation',
      description: 'Investigación de fuentes abiertas',
      category: 'Caso práctico',
      route: '/cases/osint',
      keywords: ['osint', 'dominios', 'whois', 'dns'],
    },
    {
      title: 'Blue Team Analyst',
      description: 'Detección y análisis defensivo',
      category: 'Caso práctico',
      route: '/cases/blue-team',
      keywords: ['blue', 'logs', 'siem', 'defensa'],
    },
    {
      title: 'Red Team Assessment',
      description: 'Evaluación ofensiva autorizada',
      category: 'Caso práctico',
      route: '/cases/red-team',
      keywords: ['red', 'nmap', 'pentesting', 'vulnerabilidades'],
    },
    {
      title: 'Security Engineer',
      description: 'Hardening y controles de seguridad',
      category: 'Caso práctico',
      route: '/cases/security-engineer',
      keywords: ['security', 'engineer', 'hardening', 'controles'],
    },
    {
      title: 'Incident Response',
      description: 'Respuesta y recuperación ante incidentes',
      category: 'Caso práctico',
      route: '/cases/incident-response',
      keywords: ['incident', 'ransomware', 'respuesta', 'recuperación'],
    },
    {
      title: 'Mi Portfolio',
      description: 'Proyectos profesionales y personales',
      category: 'Portfolio',
      route: '/portfolio',
      keywords: ['portfolio', 'proyectos', 'frontend'],
    },
    {
      title: 'Certificaciones',
      description: 'Formación y credenciales',
      category: 'Portfolio',
      route: '/certifications',
      keywords: ['certificados', 'formación', 'cursos'],
    },
    {
      title: 'Perfil',
      description: 'Identidad, nivel e insignias',
      category: 'Mi perfil',
      route: '/profile',
      keywords: ['perfil', 'jugador', 'nivel', 'insignias'],
    },
    {
      title: 'Progreso',
      description: 'Casos, habilidades y objetivos',
      category: 'Mi perfil',
      route: '/progress',
      keywords: ['progreso', 'puntos', 'actividad', 'objetivos'],
    },
    {
      title: 'Ajustes',
      description: 'Cuenta, seguridad y privacidad',
      category: 'Mi perfil',
      route: '/settings',
      keywords: ['ajustes', 'configuración', 'cuenta', 'seguridad'],
    },
    {
      title: '¿Qué es SecureBoard?',
      description: 'Información sobre el proyecto',
      category: 'Ayuda',
      route: '/about-secureboard',
      keywords: ['acerca', 'secureboard', 'ayuda', 'proyecto'],
    },
  ];

  notifications: NotificationItem[] = [
    {
      id: 1,
      title: 'Nueva insignia desbloqueada',
      text: 'Has obtenido la insignia Analista Defensiva.',
      time: 'Hace 10 min',
      unread: true,
      route: '/profile',
      tone: 'purple',
    },
    {
      id: 2,
      title: 'Blue Team completado',
      text: 'El caso ha alcanzado el 100 % de progreso.',
      time: 'Hace 1 h',
      unread: true,
      route: '/progress',
      tone: 'blue',
    },
    {
      id: 3,
      title: 'Objetivo próximo a finalizar',
      text: 'Completar Red Team vence próximamente.',
      time: 'Hace 3 h',
      unread: true,
      route: '/progress',
      tone: 'orange',
    },
  ];

  emitSidebarToggle(): void {
    this.closeAllMenus();
    this.toggleSidebar.emit();
  }

  updateSearch(value: string): void {
    this.searchQuery = value.slice(0, 80);
    this.activeMenu = this.searchQuery.trim() ? 'search' : null;
  }

  openSearch(): void {
    if (this.searchQuery.trim()) {
      this.activeMenu = 'search';
    }
  }

  submitSearch(): void {
    const firstResult = this.filteredSearchItems[0];

    if (firstResult) {
      this.chooseSearchResult(firstResult);
    }
  }

  chooseSearchResult(item: SearchItem): void {
    this.searchQuery = '';
    this.closeAllMenus();
    this.router.navigateByUrl(item.route);
  }

  toggleMenu(
    menu: Exclude<OpenMenu, 'search' | null>,
    event: MouseEvent,
  ): void {
    event.stopPropagation();
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }

  openNotification(notification: NotificationItem): void {
    this.notifications = this.notifications.map((item) =>
      item.id === notification.id
        ? { ...item, unread: false }
        : item,
    );

    this.navigateTo(notification.route);
  }

  markAllNotificationsAsRead(): void {
    this.notifications = this.notifications.map((notification) => ({
      ...notification,
      unread: false,
    }));
  }

  navigateTo(route: string): void {
    this.closeAllMenus();
    this.router.navigateByUrl(route);
  }

  logout(): void {
    this.closeAllMenus();

    // Cuando exista AuthService, aquí se invalidará la sesión real.
    this.router.navigateByUrl('/');
  }

  closeAllMenus(): void {
    this.activeMenu = null;
  }

  get searchOpen(): boolean {
    return this.activeMenu === 'search';
  }

  get notificationsOpen(): boolean {
    return this.activeMenu === 'notifications';
  }

  get helpOpen(): boolean {
    return this.activeMenu === 'help';
  }

  get userMenuOpen(): boolean {
    return this.activeMenu === 'user';
  }

  get filteredSearchItems(): SearchItem[] {
    const query = this.normalize(this.searchQuery);

    if (!query) {
      return [];
    }

    return this.searchItems
      .filter((item) => {
        const content = this.normalize(
          [
            item.title,
            item.description,
            item.category,
            ...item.keywords,
          ].join(' '),
        );

        return content.includes(query);
      })
      .slice(0, 7);
  }

  get unreadNotifications(): number {
    return this.notifications.filter(
      (notification) => notification.unread,
    ).length;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardShortcut(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    const elementTag = target?.tagName.toLowerCase();
    const isWriting =
      elementTag === 'input' ||
      elementTag === 'textarea' ||
      elementTag === 'select';

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === 'k'
    ) {
      event.preventDefault();
      this.focusGlobalSearch();
      return;
    }

    if (event.key === 'Escape') {
      this.closeAllMenus();
      return;
    }

    if (!isWriting && event.key === '/') {
      event.preventDefault();
      this.focusGlobalSearch();
    }
  }

  @HostListener('document:click')
  handleDocumentClick(): void {
    this.closeAllMenus();
  }

  private focusGlobalSearch(): void {
    const input = document.getElementById(
      'global-search-input',
    ) as HTMLInputElement | null;

    input?.focus();

    if (this.searchQuery.trim()) {
      this.activeMenu = 'search';
    }
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}