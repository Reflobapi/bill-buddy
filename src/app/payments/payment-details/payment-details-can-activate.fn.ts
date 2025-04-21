import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ContextParams, ContextService } from '../../context.service';

export const paymentDetailsCanActivateFn: CanActivateFn = (route, state) => {
  const paymentId = route.params['paymentId'];

  if (isNaN(+paymentId)) {
    const router = inject(Router);
    return new RedirectCommand(router.parseUrl('/payments'));
  }

  const contextService = inject(ContextService);

  contextService.registerContext(ContextParams.PaymentId, paymentId);

  return true;
};
