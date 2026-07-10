import { Component } from '@angular/core';

type CertItem = {
  logo: string;
  title: string;
  center: string;
  year: string;
  sortYear: number;
  status?: string;
  category: string;
  tone: string;
  description: string;
  tags: string[];
  credential?: string;
};

@Component({
  selector: 'app-certifications',
  imports: [],
  templateUrl: './certifications.html',
  styleUrl: './certifications.css',
})
export class Certifications {
  selectedFilter = 'Todos';

  filters = [
    'Todos',
    'Formación oficial',
    'Front-End',
    'Diseño & UI/UX',
    'IA',
    'Ciberseguridad',
  ];

  officialEducation: CertItem[] = [
    {
      logo: '/images/logos/ilerna-logo.jfif',
      title: 'Técnico Superior en Desarrollo de Aplicaciones Web',
      center: 'iLERNA Online · IES CIFP a Distancia Ignacio Ellacuría',
      year: '2023 – actualidad',
      sortYear: 2026,
      status: 'En curso · 5 módulos pendientes',
      category: 'Formación oficial',
      tone: 'purple',
      description:
        'Formación oficial de Grado Superior orientada al desarrollo de aplicaciones web. Actualmente en curso, con foco en Front-End, Angular, TypeScript, APIs REST, bases de datos y diseño de interfaces.',
      tags: ['DAW', 'Angular', 'TypeScript', 'APIs REST', 'Bases de datos'],
    },
    {
      logo: '/images/logos/universidadcomplutense_logo.jfif',
      title: 'Grado en Publicidad y Relaciones Públicas',
      center: 'Universidad Complutense de Madrid',
      year: '2011 – 2018',
      sortYear: 2018,
      status: 'Finalizado',
      category: 'Formación oficial',
      tone: 'pink',
      description:
        'Formación universitaria en comunicación, estrategia, marketing, creatividad, marca y comportamiento del usuario.',
      tags: ['Comunicación', 'Branding', 'Marketing', 'UX'],
    },
    {
      logo: '/images/logos/sigloxxi_logo.png',
      title: 'Técnico Superior en Iluminación, Captación y Tratamiento de Imagen',
      center: 'Instituto Siglo XXI',
      year: '2012 – 2014',
      sortYear: 2014,
      status: 'Finalizado',
      category: 'Formación oficial',
      tone: 'orange',
      description:
        'Formación oficial centrada en tratamiento visual, fotografía, iluminación, edición y lenguaje gráfico.',
      tags: ['Fotografía', 'Imagen', 'Edición', 'Diseño visual'],
    },
    {
      logo: '/images/logos/sigloxxi_logo.png',
      title: 'Técnico Superior en Realización de Audiovisuales y Espectáculos',
      center: 'Instituto Siglo XXI',
      year: '2009 – 2011',
      sortYear: 2011,
      status: 'Finalizado',
      category: 'Formación oficial',
      tone: 'blue',
      description:
        'Formación oficial audiovisual orientada a narrativa visual, producción, composición y lenguaje de imagen.',
      tags: ['Audiovisual', 'Imagen', 'Composición', 'Creatividad'],
    },
  ];

  certifications: CertItem[] = [
    {
      logo: '/images/logos/big_school_logo.jfif',
      title: 'Iniciación al Desarrollo con IA',
      center: 'BIG School',
      year: '2026',
      sortYear: 2026,
      status: 'Finalizado',
      category: 'IA',
      tone: 'purple',
      description:
        'Certificación enfocada en fundamentos de desarrollo con inteligencia artificial y herramientas aplicadas.',
      tags: ['IA', 'Desarrollo', 'Software'],
      credential: 'Certificado PDF',
    },
    {
      logo: '/images/logos/santander_universidades_logo.jfif',
      title: 'Google: Inteligencia Artificial y productividad',
      center: 'Santander Open Academy / Google',
      year: '2025',
      sortYear: 2025,
      status: 'Finalizado',
      category: 'IA',
      tone: 'purple',
      description:
        'Formación en uso práctico de IA para productividad, automatización y mejora del flujo de trabajo.',
      tags: ['IA', 'Productividad', 'Google'],
      credential: 'ID credencial: OA-2025-061000121613',
    },
    {
      logo: '/images/logos/fundacion_logo.jfif',
      title: 'Java EE 8 Back-End con Spring Boot',
      center: 'FUNDAE',
      year: '2025',
      sortYear: 2025,
      status: 'Finalizado',
      category: 'Front-End',
      tone: 'green',
      description:
        'Formación orientada a Java, Spring Boot, APIs REST y desarrollo Back-End empresarial.',
      tags: ['Java', 'Spring Boot', 'REST API'],
      credential: 'Certificado PDF',
    },
    {
      logo: '/images/logos/british_council_logo.jfif',
      title: 'Aptis ESOL · Overall CEFR level B1',
      center: 'British Council',
      year: '2024',
      sortYear: 2024,
      status: 'Finalizado',
      category: 'Front-End',
      tone: 'blue',
      description:
        'Certificación oficial de nivel B1 de inglés según el Marco Común Europeo de Referencia.',
      tags: ['Inglés', 'B1', 'British Council'],
      credential: 'ID credencial disponible',
    },
    {
      logo: '/images/logos/coderhouse_logo.jfif',
      title: 'JavaScript',
      center: 'Coderhouse',
      year: '2021',
      sortYear: 2021,
      status: 'Finalizado',
      category: 'Front-End',
      tone: 'yellow',
      description:
        'Curso centrado en fundamentos de JavaScript, sintaxis, variables, funciones, DOM y lógica de programación.',
      tags: ['JavaScript', 'DOM', 'Front-End'],
      credential: 'Mostrar credencial',
    },
    {
      logo: '/images/logos/neoland_logo.jfif',
      title: 'FullStack Bootcamp',
      center: 'NEOLAND',
      year: '2021',
      sortYear: 2021,
      status: 'Finalizado',
      category: 'Front-End',
      tone: 'red',
      description:
        'Bootcamp intensivo de desarrollo web Full Stack con Front-End, Back-End y proyecto final.',
      tags: ['Angular', 'Node.js', 'Express', 'MySQL'],
      credential: 'Mostrar credencial',
    },
    {
      logo: '/images/logos/linkedin_logo.jfif',
      title: 'Node.js esencial',
      center: 'LinkedIn Learning',
      year: '2021',
      sortYear: 2021,
      status: 'Finalizado',
      category: 'Front-End',
      tone: 'blue',
      description:
        'Curso introductorio de Node.js para comprender ejecución en servidor, módulos y arquitectura básica.',
      tags: ['Node.js', 'Backend', 'JavaScript'],
      credential: 'Mostrar credencial',
    },
    {
      logo: '/images/logos/complot_logo.jfif',
      title: 'Curso de Dirección de Arte',
      center: 'Complot Escuela de Creatividad',
      year: '2020',
      sortYear: 2020,
      status: 'Finalizado',
      category: 'Diseño & UI/UX',
      tone: 'pink',
      description:
        'Formación creativa orientada a dirección de arte, concepto visual, composición y comunicación gráfica.',
      tags: ['Dirección de arte', 'Diseño', 'Concepto visual'],
      credential: 'Edición 12ª',
    },
  ];

  cybersecurity: CertItem[] = [
    {
      logo: '/images/logos/neoland_logo.jfif',
      title: 'Bootcamp de Ciberseguridad',
      center: 'NEOLAND',
      year: '2026',
      sortYear: 2026,
      status: 'En curso',
      category: 'Ciberseguridad',
      tone: 'green',
      description:
        'Formación práctica en Kali Linux, OSINT, análisis de vulnerabilidades, DFIR y respuesta a incidentes.',
      tags: ['Kali Linux', 'OSINT', 'DFIR', 'Vulnerabilidades'],
    },
    {
      logo: '/images/logos/Sublogo_SecureBoard_Isotopo.svg',
      title: 'SecureBoard SOC Lab',
      center: 'Proyecto final',
      year: '2026',
      sortYear: 2026,
      status: 'En desarrollo',
      category: 'Ciberseguridad',
      tone: 'purple',
      description:
        'Plataforma interactiva para simular casos de OSINT, Blue Team, Red Team, Security Engineering e Incident Response.',
      tags: ['SOC Lab', 'Angular 21', 'Ciberseguridad'],
    },
    {
      logo: '/images/logos/tryHackMe_logo.png',
      title: 'Laboratorios prácticos TryHackMe',
      center: 'Autoformación',
      year: '2026',
      sortYear: 2025,
      status: 'En progreso',
      category: 'Ciberseguridad',
      tone: 'red',
      description:
        'Práctica progresiva en laboratorios guiados para reforzar conocimientos técnicos y preparar entrevistas.',
      tags: ['TryHackMe', 'Labs', 'Pentesting básico'],
    },
  ];

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  get filteredOfficialEducation() {
    return this.filterItems(this.officialEducation);
  }

  get filteredCertifications() {
    return this.filterItems(this.certifications);
  }

  get filteredCybersecurity() {
    return this.filterItems(this.cybersecurity);
  }

  private filterItems(items: CertItem[]) {
    const sorted = [...items].sort((a, b) => b.sortYear - a.sortYear);

    if (this.selectedFilter === 'Todos') {
      return sorted;
    }

    return sorted.filter((item) => item.category === this.selectedFilter);
  }
}