import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  summaryCards = [
    {
      icon: '▣',
      label: 'CASOS COMPLETADOS',
      value: '12',
      suffix: '/ 25',
      detail: '48% del camino completado',
      tone: 'purple',
    },
    {
      icon: '☆',
      label: 'PUNTUACIÓN TOTAL',
      value: '2,450',
      suffix: 'pts',
      detail: '↑ 18% vs. semana pasada',
      tone: 'violet',
    },
    {
      icon: '⬡',
      label: 'NIVEL DE RIESGO GLOBAL',
      value: 'MEDIO',
      suffix: '',
      detail: 'Tendencia estable',
      tone: 'orange',
    },
    {
      icon: '♧',
      label: 'ALERTAS ACTIVAS',
      value: '7',
      suffix: '',
      detail: '3 críticas',
      tone: 'red',
    },
  ];

  alerts = [
    {
      icon: '☠',
      title: 'Posible ransomware detectado',
      case: 'Incident Response',
      time: '10:24',
      level: 'Crítica',
      tone: 'critical',
    },
    {
      icon: '⚠',
      title: 'Múltiples intentos de login fallidos',
      case: 'Blue Team Analyst',
      time: '09:15',
      level: 'Alta',
      tone: 'high',
    },
    {
      icon: '☼',
      title: 'Vulnerabilidad crítica encontrada',
      case: 'Security Engineer',
      time: 'Ayer',
      level: 'Media',
      tone: 'medium',
    },
    {
      icon: 'ⓘ',
      title: 'Nuevo dominio identificado',
      case: 'OSINT Investigation',
      time: 'Ayer',
      level: 'Baja',
      tone: 'low',
    },
  ];

  progressCases = [
    { icon: 'osint', name: 'OSINT Investigation', value: 75, tone: 'purple' },
    { icon: 'blue', name: 'Blue Team Analyst', value: 60, tone: 'blue' },
    { icon: 'red', name: 'Red Team Assessment', value: 40, tone: 'orange' },
    { icon: 'engineer', name: 'Security Engineer', value: 55, tone: 'green' },
    { icon: 'incident', name: 'Incident Response', value: 30, tone: 'red' },
  ];
  quickActions = [
  {
    icon: '▷',
    title: 'Iniciar nuevo caso',
    text: 'Elige un escenario y comienza',
    tone: 'purple',
    route: '/cases',
  },
  {
    icon: '▦',
    title: 'Ver todos los casos',
    text: 'Explora todos los escenarios disponibles',
    tone: 'blue',
    route: '/cases',
  },
  {
    icon: '▱',
    title: 'Ir a mi portfolio',
    text: 'Gestiona tus proyectos y logros',
    tone: 'orange',
    route: '/portfolio',
  },
  ];
}