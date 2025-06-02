import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationsService } from '../lib/notifications/notifications.service';
import { NotificationType } from '../lib/notifications/interfaces';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const notificationService = inject(NotificationsService);

  return next(req).pipe(
    // Handle the error response
    catchError((error) => {
      console.error('HTTP Error:', error); // Log the full error object

      let message = 'An unexpected error occurred.'; // Default message

      if (!(error instanceof HttpErrorResponse) || error.status === 0) {
        message = 'A network error occurred or the server is unreachable. Please check your connection.';
      } else {
        switch (error.status) {
          case 400:
            message = error.error?.message || 'Invalid request. Please check the data you provided.';
            break;
          case 401:
            message = 'Authentication failed. Please log in again.';
            break;
          case 403:
            message = "You don't have permission to access this resource.";
            break;
          case 404:
            message = 'The requested resource was not found.';
            break;
          case 500:
            message = 'A server error occurred. Please try again later.';
            break;
          default:
            if (error.error?.message) {
              message = error.error.message;
            }
            // If no specific message for other errors, the default 'An unexpected error occurred.' will be used.
            break;
        }
      }

      notificationService.notify({
        message, // Use the refined message
        type: NotificationType.Error,
      });

      // Rethrow the error to propagate it to the subscriber
      return throwError(() => error);
    }),
  );
}
