import { effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';
import { Notification } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private _snackBar = inject(MatSnackBar);

  private _notification = signal<Notification | null>(null);

  public notify = (notification: Notification) => {
    this._notification.set(notification);
  };

  constructor() {
    effect(() => {
      if (!this._notification()) {
        return;
      }

      this._snackBar.openFromComponent(NotificationComponent, {
        duration: 2000,
        data: this._notification(),
        panelClass: [`notification-${this._notification()?.type}`],
      });
    });
  }
}
