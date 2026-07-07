import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Cases } from './pages/cases/cases';
import { OsintInvestigation } from './pages/osint-investigation/osint-investigation';
import { BlueTeamAnalyst } from './pages/blue-team-analyst/blue-team-analyst';
import { RedTeamAssessment } from './pages/red-team-assessment/red-team-assessment';

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
        component: OsintInvestigation,
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
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];