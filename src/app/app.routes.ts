import { Routes } from '@angular/router';
import { paymentDetailsCanActivateFn } from './payments/payment-details/payment-details-can-activate.fn';
import { paymentsCanActivateFn } from './payments/guards/payments.can-activate.fn';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
    children: [
      {
        path: 'payments',
        canActivate: [paymentsCanActivateFn],
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
    path: '**', // Wildcard route to catch all other paths
    redirectTo: '', // Redirect to the main page
    pathMatch: 'full',
  },
];
