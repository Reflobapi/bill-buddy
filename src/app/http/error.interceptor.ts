import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationsService } from '../lib/notifications/notifications.service';
import { NotificationType } from '../lib/notifications/interfaces';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const notificationService = inject(NotificationsService);

  return next(req).pipe(
    // Handle the error response
    catchError((error) => {
      notificationService.notify({
        message: error.error.message,
        type: NotificationType.Error,
      });

      return of();
    }),
  );
}
