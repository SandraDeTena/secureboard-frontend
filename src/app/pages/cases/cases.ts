import { Component } from '@angular/core';

interface CaseCard {
  number: string;
  title: string;
  description: string;
  difficulty: string;
  time: string;
  progress: number;
  tone: 'purple' | 'blue' | 'red' | 'orange' | 'green';
  icon: string;
  dots: number;
}

@Component({
  selector: 'app-cases',
  imports: [],
  templateUrl: './cases.html',
  styleUrl: './cases.css',
})
export class Cases {
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
    },
  ];
}