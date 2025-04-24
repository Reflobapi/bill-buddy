import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarLabel } from '@angular/material/snack-bar';
import { Notification } from '../interfaces';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatSnackBarLabel,
  ],
})
export class NotificationComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public notification: Notification,
  ) {}
}
