import { Routes } from '@angular/router';
import { paymentDetailsCanActivateFn } from './payments/payment-details/payment-details-can-activate.fn';

export const routes: Routes = [
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
  }
];
