import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-secureboard',
  imports: [RouterLink],
  templateUrl: './about-secureboard.html',
  styleUrl: './about-secureboard.css',
})
export class AboutSecureboard {
  cases = [
    {
      number: '01',
      title: 'OSINT Investigation',
      tone: 'purple',
      text: 'Investigación de dominios, subdominios, IPs, DNS y exposición pública.',
    },
    {
      number: '02',
      title: 'Blue Team Analyst',
      tone: 'blue',
      text: 'Análisis de alertas, logs, eventos sospechosos y posibles amenazas.',
    },
    {
      number: '03',
      title: 'Red Team Assessment',
      tone: 'red',
      text: 'Reconocimiento autorizado, evaluación de vulnerabilidades y vectores de ataque.',
    },
    {
      number: '04',
      title: 'Security Engineer',
      tone: 'orange',
      text: 'Diseño, implementación y validación de controles de seguridad.',
    },
    {
      number: '05',
      title: 'Incident Response',
      tone: 'green',
      text: 'Gestión de incidentes, contención, recuperación y lecciones aprendidas.',
    },
  ];

  goals = [
    'Diseño de interfaz profesional orientada a producto.',
    'Aplicación Angular moderna con rutas, componentes y estructura escalable.',
    'Integración de identidad visual propia y sistema de estilos consistente.',
    'Casos de ciberseguridad explicados de forma visual y práctica.',
    'Portfolio técnico integrado para mostrar trabajo real y evolución profesional.',
  ];

  technologies = [
    'Angular 21',
    'TypeScript',
    'Tailwind CSS',
    'HTML5',
    'CSS3',
    'Git',
    'GitHub',
    'Figma',
    'UI/UX',
    'SOC Lab',
    'OSINT',
    'Blue Team',
    'Red Team',
    'Security Engineer',
    'Incident Response',
  ];

  process = [
    {
      number: '01',
      title: 'Diseño visual',
      text: 'Creación de identidad, pantallas, iconos, colores y estructura en Figma.',
    },
    {
      number: '02',
      title: 'Maquetación Front-End',
      text: 'Conversión del diseño a componentes Angular con estilos reutilizables.',
    },
    {
      number: '03',
      title: 'Casos prácticos',
      text: 'Construcción de pantallas para simular escenarios reales de ciberseguridad.',
    },
    {
      number: '04',
      title: 'Portfolio',
      text: 'Integración de proyectos personales, laborales y de diseño dentro de la plataforma.',
    },
  ];
}
