import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ContextService } from '../context.service';

export const authGuard: CanActivateFn = (_, __) => {
  const contextService = inject(ContextService);

  if (!contextService.userId()) {
    const router = inject(Router);
    console.log('User is not logged in, redirecting to login page');

    void router.navigate(['/auth']);
  }

  return true;
};
