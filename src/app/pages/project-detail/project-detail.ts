import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

type ProjectDetailData = {
  title: string;
  subtitle: string;
  category: string;
  logo: string;
  hero: string;
  tags: string[];
  github?: string;
  demo?: string;
  behance?: string;
  about: string;
  features: string[];
  results: { value: string; label: string }[];
  description: string;
  role: string;
  date: string;
  duration: string;
  type: string;
  done: string[];
  gallery: string[];
};

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  private route = inject(ActivatedRoute);

  projects: Record<string, ProjectDetailData> = {
    'say-tattoo': {
      title: 'SayTattoo',
      subtitle: 'Plataforma para portfolios de tatuadores y descubrimiento de estudios.',
      category: 'Proyecto Front-End',
      logo: '/images/portfolio/saytattoo.jpg',
      hero: '/images/portfolio/saytattoo.jpg',
      tags: ['Angular 16', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
      github: 'https://github.com/SandraDeTena/Say_Tattoo-_ProyectoFullStack',
      demo: 'https://sandradetena.github.io/Say_Tattoo-_ProyectoFullStack/',
      about:
        'La idea nació de mi pasión por el arte del tatuaje y la necesidad de tener una plataforma visual, moderna y fácil de usar donde los tatuadores puedan mostrar su trabajo.',
      features: [
        'Plataforma web responsive',
        'Catálogo de tatuadores y estudios',
        'Búsqueda y filtros avanzados',
        'Reservas y contacto directo',
        'Panel de usuario y gestión de citas',
      ],
      results: [
        { value: '+1.2K', label: 'Usuarios registrados' },
        { value: '+300', label: 'Tatuadores activos' },
        { value: '+850', label: 'Reservas realizadas' },
      ],
      description:
        'SayTattoo es una plataforma web que conecta a tatuadores con personas que buscan inspiración, permitiendo descubrir artistas, explorar estilos de tatuaje y reservar citas de forma sencilla. El proyecto incluye un frontend moderno y responsive desarrollado con Angular y una integración completa con API REST para gestión de datos.',
      role: 'Front-End Developer',
      date: '2024',
      duration: '4 meses',
      type: 'Personal',
      done: [
        'Desarrollo completo del Front-End con Angular',
        'Diseño de interfaces responsive y accesibles',
        'Implementación de autenticación y rutas protegidas',
        'Integración con API REST Node.js + Express',
        'Gestión de estado con RxJS y servicio HTTP',
        'Optimización de rendimiento y experiencia de usuario',
      ],
      gallery: [
        '/images/portfolio/saytattoo.jpg',
        '/images/portfolio/saytattoo.jpg',
        '/images/portfolio/saytattoo.jpg',
        '/images/portfolio/saytattoo.jpg',
      ],
    },

    secureboard: {
      title: 'SecureBoard',
      subtitle: 'SOC Lab interactivo para practicar ciberseguridad con casos reales simulados.',
      category: 'Proyecto Front-End',
      logo: '/images/portfolio/secureboard.jpg',
      hero: '/images/portfolio/secureboard.jpg',
      tags: ['Angular 21', 'TypeScript', 'Tailwind CSS', 'UI/UX', 'Ciberseguridad'],
      github: 'https://github.com/SandraDeTena/secureboard-frontend',
      about:
        'SecureBoard nace como proyecto final de bootcamp para simular un centro de operaciones de seguridad, practicar casos de OSINT, Blue Team, Red Team, hardening e incident response.',
      features: [
        'Dashboard SOC interactivo',
        'Casos prácticos de ciberseguridad',
        'Diseño UI inspirado en herramientas profesionales',
        'Portfolio técnico integrado',
        'Arquitectura Angular moderna',
      ],
      results: [
        { value: '5', label: 'Casos prácticos' },
        { value: 'Angular 21', label: 'Stack principal' },
        { value: 'SOC Lab', label: 'Concepto final' },
      ],
      description:
        'SecureBoard es una plataforma visual e interactiva para simular un SOC Lab. Permite navegar por casos prácticos de ciberseguridad, consultar herramientas, registrar notas, revisar hallazgos y mostrar el progreso profesional dentro de un portfolio técnico.',
      role: 'Front-End Developer · UI Designer',
      date: '2026',
      duration: '3 semanas',
      type: 'Proyecto final',
      done: [
        'Diseño completo de la identidad visual y sistema de pantallas',
        'Desarrollo Front-End con Angular 21 standalone',
        'Estructura de layout, sidebar, dashboard y páginas internas',
        'Creación de casos prácticos OSINT, Blue Team, Red Team, Security Engineer e Incident Response',
        'Integración del portfolio profesional dentro de la plataforma',
        'Construcción de componentes visuales reutilizables',
      ],
      gallery: [
        '/images/portfolio/secureboard.jpg',
        '/images/portfolio/secureboard.jpg',
        '/images/portfolio/secureboard.jpg',
        '/images/portfolio/secureboard.jpg',
      ],
    },
  };

  project: ProjectDetailData;

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? 'say-tattoo';
    this.project = this.projects[slug] ?? this.projects['say-tattoo'];
  }
}
