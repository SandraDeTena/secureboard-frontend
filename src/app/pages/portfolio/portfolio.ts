import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  filters = ['Todos', 'Front-End', 'Angular', 'UI/UX', 'Diseño gráfico', 'Branding'];

  frontendProjects = [
    {
      number: 1,
      title: 'SayTattoo',
      type: 'Personal',
      tone: 'purple',
      image: '/images/portfolio/saytattoo.jpg',
      description: 'Plataforma para portfolios de tatuadores y descubrimiento de estudios.',
      tags: ['Angular', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
      github: 'https://github.com/SandraDeTena/Say_Tattoo-_ProyectoFullStack',
      demo: 'https://sandradetena.github.io/Say_Tattoo-_ProyectoFullStack/',
      locked: false,
    },
    {
      number: 2,
      title: 'ServiceBooster',
      type: 'Trabajo',
      tone: 'orange',
      image: '/images/portfolio/servicebooster.jpg',
      description: 'Modernización de aplicación interna con dashboards y métricas en tiempo real.',
      tags: ['Angular', 'Bootstrap', 'MySQL', 'MongoDB', 'Node.js'],
      locked: true,
    },
    {
      number: 3,
      title: 'SL2000E',
      type: 'Trabajo',
      tone: 'orange',
      image: '/images/portfolio/sl2000e.jpg',
      description: 'Aplicación modular para gestión de procesos del Ejército del Aire.',
      tags: ['Angular', 'PrimeNG', 'RxJS', 'Swagger', 'JWT'],
      locked: true,
    },
    {
      number: 4,
      title: 'CHRONOS',
      type: 'Trabajo',
      tone: 'orange',
      image: '/images/portfolio/chronos.jpg',
      description: 'Sistema de atención y gestión de emergencias sanitarias.',
      tags: ['Angular', 'PrimeNG', 'REST API', 'PWA', 'Accesibilidad'],
      locked: true,
    },
    {
      number: 5,
      title: 'SecureBoard',
      type: 'Personal',
      tone: 'purple',
      image: '/images/portfolio/01. Hero_SecureBoard.png',
      description: 'Plataforma de laboratorio de ciberseguridad con casos prácticos y herramientas integradas.',
      tags: ['Angular 21', 'TypeScript', 'Tailwind CSS', 'Java', 'MySQL'],
      github: 'https://github.com/SandraDeTena/secureboard-frontend',
      demo: '',
      locked: false,
    },
  ];

  designProjects = [
    {
      number: 1,
      title: 'NI9-ART-Movement',
      tone: 'purple',
      image: '/images/portfolio/NI9_ART_Movement.PNG',
      description: 'Diseño de marca personal, logotipo e identidad visual completa.',
      tags: ['Branding', 'Logotipo', 'UX/UI', 'Diseño Web'],
      behance: 'https://www.behance.net/gallery/110384961/NI9-ART-Movement',
    },
    {
      number: 2,
      title: 'Identidad de tarjetas de Jesús',
      tone: 'orange',
      image: '/images/portfolio/jesus_lara_oliver.PNG',
      description: 'Diseño de identidad visual y tarjetas de presentación personalizadas.',
      tags: ['Branding', 'Logotipo', 'Diseño gráfico', 'Packaging'],
      behance: 'https://www.behance.net/gallery/252242763/Jesus-Lara-Oliver',
    },
    {
      number: 3,
      title: 'CosmoNatur',
      tone: 'green',
      image: '/images/portfolio/CosmiNatur.PNG',
      description: 'Identidad visual para marca de estética y bienestar natural.',
      tags: ['Branding', 'Logotipo', 'Diseño gráfico', 'Packaging'],
      behance: 'https://www.behance.net/gallery/245711549/CosmiNatur',
    },
    {
      number: 4,
      title: 'Fragmentos del Prado',
      tone: 'purple',
      image: '/images/portfolio/Museo del prado.PNG',
      description: 'Proyecto visual inspirado en arte, cultura y reinterpretación gráfica.',
      tags: ['Filtro para Instagram', 'Arte digital', 'Diseño', "Branding"],
      behance: 'https://www.behance.net/gallery/99811455/FragmentosDelPrado',
    },
    {
      number: 5,
      title: 'Dulce Oasis',
      tone: 'red',
      image: '/images/portfolio/Dulce_oasis.PNG',
      description: 'Branding y diseño de marca para producto dulce y visualmente atractivo.',
      tags: ['Branding', 'Logotipo', 'Diseño gráfico', 'Packaging'],
      behance: 'https://www.behance.net/gallery/119476627/Dulce-Oasis-_Identidad-de-Marca',
    },
  ];
}