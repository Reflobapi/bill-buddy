import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ContextParams, ContextStore } from '../../context.store';

export const paymentDetailsCanActivateFn: CanActivateFn = (route, state) => {
  const paymentId = route.params['paymentId'];

  if (isNaN(+paymentId)) {
    const router = inject(Router);
    return new RedirectCommand(router.parseUrl('/payments'));
  }

  const contextStore = inject(ContextStore);

  contextStore.registerContext(ContextParams.PaymentId, paymentId);

  return true;
};
