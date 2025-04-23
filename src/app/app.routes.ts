import { Routes } from '@angular/router';
import { paymentDetailsCanActivateFn } from './payments/payment-details/payment-details-can-activate.fn';
import { authGuard } from './authentification/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./authentification/authentification.component').then(m => m.AuthentificationComponent),
  },
  {
    path: '',
    loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'payments',
        pathMatch: 'full',
      },
      {
        path: 'payments',
        loadComponent: () => import('./payments/payments-list/payments-list.component').then(m => m.PaymentsListComponent),
      },
      {
        path: 'payments/:paymentId',
        canActivate: [paymentDetailsCanActivateFn],
        loadComponent: () => import('./payments/payment-details/payment-details.component').then(m => m.PaymentDetailsComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
