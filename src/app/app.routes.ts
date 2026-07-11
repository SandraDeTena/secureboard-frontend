import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Cases } from './pages/cases/cases';
import { BlueTeamAnalyst } from './pages/blue-team-analyst/blue-team-analyst';
import { RedTeamAssessment } from './pages/red-team-assessment/red-team-assessment';
import { SecurityEngineer } from './pages/security-engineer/security-engineer';
import { IncidentResponse } from './pages/incident-response/incident-response';
import { Portfolio } from './pages/portfolio/portfolio';
import { ProjectDetail } from './pages/project-detail/project-detail';
import { AboutSecureboard } from './pages/about-secureboard/about-secureboard';
import { Certifications } from './pages/certifications/certifications';
import { Osint } from './pages/osint-investigation/osint-investigation';

export const routes: Routes = [
  {
    path: '',
    component: Welcome,
    title: 'SecureBoard · Welcome',
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        title: 'SecureBoard · Dashboard SOC',
      },
      {
        path: 'cases',
        component: Cases,
        title: 'SecureBoard · Casos Prácticos',
      },
      {
        path: 'cases/osint',
        component: Osint,
        title: 'SecureBoard · OSINT Investigation',
      },
      {
        path: 'cases/blue-team',
        component: BlueTeamAnalyst,
        title: 'SecureBoard · Blue Team Analyst',
      },
      {
        path: 'cases/red-team',
        component: RedTeamAssessment,
        title: 'SecureBoard · Red Team Assessment',
      },
      {
        path: 'cases/security-engineer',
        component: SecurityEngineer,
        title: 'SecureBoard · Security Engineer',
      },
      {
        path: 'cases/incident-response',
        component: IncidentResponse,
        title: 'SecureBoard · Incident Response',
      },
      {
        path: 'portfolio',
        component: Portfolio,
        title: 'SecureBoard · Mi Portfolio',
      },
      {
        path: 'portfolio/:slug',
        component: ProjectDetail,
        title: 'SecureBoard · Proyecto',
      },
      {
        path: 'about-secureboard',
        component: AboutSecureboard,
        title: 'SecureBoard · Qué es',
      },
      {
        path: 'certifications',
        component: Certifications,
        title: 'SecureBoard · Certificaciones',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
