import { effect, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { catchError, interval, Observable, switchMap, take } from 'rxjs';
import { ContextParams, ContextService } from '../context.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../lib/notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _contextService = inject(ContextService);
  private readonly _notificationService = inject(NotificationsService);

  private readonly _router = inject(Router);

  constructor() {
    effect(() => {
      if (this._contextService.userId()) {
        void this._router.navigate(['']);
      }
    });
  }

  public login(phoneNumber: string) {
    interval(1000)
      .pipe(
        take(1),
        switchMap(() => this._login$(phoneNumber).pipe(take(1))),
      )
      .subscribe((user: User | null) => {
        if (user) {
          this._contextService.registerContext(ContextParams.UserId, user.id);
        } else {
          this._contextService.registerContext(ContextParams.UserId, null);
        }
      });
  }

  public createAccount(phoneNumber: string): Promise<void> {
    return new Promise((resolve, reject) => {
      interval(1000)
        .pipe(
          take(1),
          switchMap(() => this._createAccount$(phoneNumber).pipe(take(1))),
        )
        .subscribe((user: User | null) => {
          if (user) {
            this._contextService.registerContext(ContextParams.UserId, user.id);
          } else {
            this._contextService.registerContext(ContextParams.UserId, null);
          }

          resolve();
        });
    });
  }

  private _login$(phoneNumber: string): Observable<User | null> {
    return this._httpClient
      .post<User>(this._getBaseApiUrlForAuth(), {
        phoneNumber: phoneNumber,
      })
      .pipe(
        catchError((error) => {
          this._contextService.registerContext(ContextParams.UserId, null);
          return [];
        }),
      );
  }

  private _createAccount$(phoneNumber: string): Observable<User | null> {
    return this._httpClient.post<User>(this._getBaseApiUrlForUser(), {
      phoneNumber: phoneNumber,
    });
  }

  private _getBaseApiUrlForAuth(): string {
    return `${environment.apiUrl}/auth`;
  }

  private _getBaseApiUrlForUser(): string {
    return `${environment.apiUrl}/user`;
  }
}
