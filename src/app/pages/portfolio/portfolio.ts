import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type PortfolioProject = {
  number: number;
  title: string;
  type: string;
  tone: string;
  image: string;
  description: string;
  tags: string[];
  categories: string[];
  github?: string;
  demo?: string;
  behance?: string;
  locked: boolean;
};

type DesignProject = {
  number: number;
  title: string;
  tone: string;
  image: string;
  description: string;
  tags: string[];
  categories: string[];
  behance: string;
};


@Component({
  selector: 'app-portfolio',
  imports: [RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  selectedFilter = 'Todos';
  searchTerm = '';

  filters = [
    'Todos',
    'Front-End',
    'Angular',
    'UI/UX',
    'Diseño gráfico',
    'Branding',
  ];

  frontendProjects: PortfolioProject[] = [
    {
      number: 1,
      title: 'SayTattoo',
      type: 'Personal',
      tone: 'purple',
      image: '/images/portfolio/Say_Tattoo!.png',
      description:
        'Plataforma para portfolios de tatuadores y descubrimiento de estudios.',
      tags: ['Angular', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
      categories: ['Front-End', 'Angular', 'UI/UX'],
      github:
        'https://github.com/SandraDeTena/Say_Tattoo-_ProyectoFullStack',
      demo: '/portfolio/say-tattoo',
      locked: false,
    },
    {
      number: 2,
      title: 'ServiceBooster',
      type: 'Trabajo',
      tone: 'orange',
      image: '/images/portfolio/servicebooster.jpg',
      description:
        'Modernización de aplicación interna con dashboards y métricas en tiempo real.',
      tags: ['Angular', 'Bootstrap', 'MySQL', 'MongoDB', 'Node.js'],
      categories: ['Front-End', 'Angular', 'UI/UX'],
      locked: true,
    },
    {
      number: 3,
      title: 'SL2000E',
      type: 'Trabajo',
      tone: 'orange',
      image: '/images/portfolio/sl2000e.jpg',
      description:
        'Aplicación modular para gestión de procesos del Ejército del Aire.',
      tags: ['Angular', 'PrimeNG', 'RxJS', 'Swagger', 'JWT'],
      categories: ['Front-End', 'Angular', 'UI/UX'],
      locked: true,
    },
    {
      number: 4,
      title: 'CHRONOS',
      type: 'Trabajo',
      tone: 'orange',
      image: '/images/portfolio/chronos.jpg',
      description:
        'Sistema de atención y gestión de emergencias sanitarias.',
      tags: ['Angular', 'PrimeNG', 'REST API', 'PWA', 'Accesibilidad'],
      categories: ['Front-End', 'Angular', 'UI/UX'],
      locked: true,
    },
    {
      number: 5,
      title: 'SecureBoard',
      type: 'Personal',
      tone: 'purple',
      image: '/images/portfolio/01. Hero_SecureBoard.png',
      description:
        'Plataforma de laboratorio de ciberseguridad con casos prácticos y herramientas integradas.',
      tags: ['Angular 21', 'TypeScript', 'Tailwind CSS', 'Java', 'MySQL'],
      categories: ['Front-End', 'Angular', 'UI/UX'],
      github:
        'https://github.com/SandraDeTena/secureboard-frontend',
      demo: '/portfolio/secureboard',
      locked: false,
    },
  ];

  designProjects: DesignProject[] = [
    {
      number: 1,
      title: 'NI9 ART Movement',
      tone: 'purple',
      image: '/images/portfolio/NI9_ART_Movement.PNG',
      description:
        'Proyecto de identidad visual y experimentación gráfica.',
      tags: ['Branding', 'Logotipo', 'Tipografía', 'Color'],
      categories: ['Diseño gráfico', 'Branding', 'UI/UX'],
      behance:
        'https://www.behance.net/gallery/110384961/NI9-ART-Movement',
    },
    {
      number: 2,
      title: 'Identidad de tarjetas de Jesús',
      tone: 'orange',
      image: '/images/portfolio/jesus_lara_oliver.PNG',
      description:
        'Diseño de identidad visual y tarjetas de presentación personalizadas.',
      tags: ['Branding', 'Papelería', 'Diseño gráfico'],
      categories: ['Diseño gráfico', 'Branding'],
      behance:
        'https://www.behance.net/gallery/252242763/Jesus-Lara-Oliver',
    },
    {
      number: 3,
      title: 'CosmoNatur',
      tone: 'green',
      image: '/images/portfolio/CosmiNatur.PNG',
      description:
        'Identidad visual para marca de estética y bienestar natural.',
      tags: ['Branding', 'Logotipo', 'Packaging', 'Diseño'],
      categories: ['Diseño gráfico', 'Branding', 'UI/UX'],
      behance:
        'https://www.behance.net/gallery/245711549/CosmiNatur',
    },
    {
      number: 4,
      title: 'Fragmentos del Prado',
      tone: 'purple',
      image: '/images/portfolio/Museo del prado.PNG',
      description:
        'Proyecto visual inspirado en arte, cultura y reinterpretación gráfica.',
      tags: ['Ilustración', 'Arte digital', 'Diseño'],
      categories: ['Diseño gráfico', 'UI/UX'],
      behance:
        'https://www.behance.net/gallery/99811455/FragmentosDelPrado',
    },
    {
      number: 5,
      title: 'Dulce Oasis',
      tone: 'red',
      image: '/images/portfolio/Dulce_oasis.PNG',
      description:
        'Branding y diseño de marca para producto dulce y visualmente atractivo.',
      tags: ['Branding', 'Packaging', 'Diseño'],
      categories: ['Diseño gráfico', 'Branding'],
      behance:
        'https://www.behance.net/gallery/119476627/Dulce-Oasis-_Identidad-de-Marca',
    },
  ];

  setFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  onSearch(value: string): void {
    this.searchTerm = value.trim().toLowerCase();
  }

  get filteredFrontendProjects(): PortfolioProject[] {
    return this.frontendProjects.filter((project) =>
      this.matchesFilters(project)
    );
  }

  get filteredDesignProjects(): DesignProject[] {
    return this.designProjects.filter((project) =>
      this.matchesFilters(project)
    );
  }

  get hasFrontendProjects(): boolean {
    return this.filteredFrontendProjects.length > 0;
  }

  get hasDesignProjects(): boolean {
    return this.filteredDesignProjects.length > 0;
  }

  private matchesFilters(
    project: PortfolioProject | DesignProject
  ): boolean {
    const matchesCategory =
      this.selectedFilter === 'Todos' ||
      project.categories.includes(this.selectedFilter);

    const searchableText = [
      project.title,
      project.description,
      ...project.tags,
      ...project.categories,
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch =
      this.searchTerm === '' || searchableText.includes(this.searchTerm);

    return matchesCategory && matchesSearch;
  }
}