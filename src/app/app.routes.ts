import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Cases } from './pages/cases/cases';

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
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];