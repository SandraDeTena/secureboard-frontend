import { Routes } from '@angular/router';
/* Mejor con loadComponent para reducir la carga inicial*/
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/welcome/welcome')
        .then((m) => m.Welcome),
    title: 'SecureBoard · Welcome',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout')
        .then((m) => m.MainLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard')
            .then((m) => m.Dashboard),
        title: 'SecureBoard · Dashboard SOC',
      },
      {
        path: 'cases',
        loadComponent: () =>
          import('./pages/cases/cases')
            .then((m) => m.Cases),
        title: 'SecureBoard · Casos Prácticos',
      },
      {
        path: 'cases/osint',
        loadComponent: () =>
          import('./pages/osint-investigation/osint-investigation')
            .then((m) => m.Osint),
        title: 'SecureBoard · OSINT Investigation',
      },
      {
        path: 'cases/blue-team',
        loadComponent: () =>
          import('./pages/blue-team-analyst/blue-team-analyst')
            .then((m) => m.BlueTeamAnalyst),
        title: 'SecureBoard · Blue Team Analyst',
      },
      {
        path: 'cases/red-team',
        loadComponent: () =>
          import('./pages/red-team-assessment/red-team-assessment')
            .then((m) => m.RedTeamAssessment),
        title: 'SecureBoard · Red Team Assessment',
      },
      {
        path: 'cases/security-engineer',
        loadComponent: () =>
          import('./pages/security-engineer/security-engineer')
            .then((m) => m.SecurityEngineer),
        title: 'SecureBoard · Security Engineer',
      },
      {
        path: 'cases/incident-response',
        loadComponent: () =>
          import('./pages/incident-response/incident-response')
            .then((m) => m.IncidentResponse),
        title: 'SecureBoard · Incident Response',
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./pages/portfolio/portfolio')
            .then((m) => m.Portfolio),
        title: 'SecureBoard · Mi Portfolio',
      },
      {
        path: 'portfolio/:slug',
        loadComponent: () =>
          import('./pages/project-detail/project-detail')
            .then((m) => m.ProjectDetail),
        title: 'SecureBoard · Proyecto',
      },
      {
        path: 'about-secureboard',
        loadComponent: () =>
          import('./pages/about-secureboard/about-secureboard')
            .then((m) => m.AboutSecureboard),
        title: 'SecureBoard · Qué es',
      },
      {
        path: 'certifications',
        loadComponent: () =>
          import('./pages/certifications/certifications')
            .then((m) => m.Certifications),
        title: 'SecureBoard · Certificaciones',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile')
            .then((m) => m.Profile),
        title: 'SecureBoard · Perfil',
      },
      {
        path: 'progress',
        loadComponent: () =>
          import('./pages/progress/progress')
            .then((m) => m.Progress),
        title: 'SecureBoard · Progreso',
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/setting/setting')
            .then((m) => m.Settings),
        title: 'SecureBoard · Ajustes',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
