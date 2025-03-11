import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'payments',
    pathMatch: 'full',
  },
  {
    path: 'payments',
    loadComponent: () => import('./payments/payments-list/payments-list.component').then(m => m.PaymentsListComponent),
  }
];
