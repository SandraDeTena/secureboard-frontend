import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';

export const routes: Routes = [
  {
    path: '',
    component: Welcome,
    title: 'SecureBoard · Security Operations Center',
  },

  // Si alguien escribe una ruta que todavía no existe,
  // vuelve a la pantalla Welcome.
  {
    path: '**',
    redirectTo: '',
  },
];