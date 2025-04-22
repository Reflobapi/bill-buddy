import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ContextService } from '../../context.service';

export const paymentsCanActivateFn: CanActivateFn = (route, state) => {
  const contextService = inject(ContextService)

  if (!contextService.userId()) {
    const router = inject(Router);
    console.log('User is not logged in, redirecting to login page');

    return new RedirectCommand(router.parseUrl('..'));
  }

  return true;
};
