import { effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, switchMap, take } from 'rxjs';
import { ContextParams, ContextService } from '../context.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _contextService = inject(ContextService);

  private readonly _router = inject(Router);

  private readonly _loggedInUser = signal<User | null>(null);

  constructor() {
    effect(() => {
      if (this._loggedInUser()) {
        void this._router.navigate(['']);
      }
    });
  }

  public login(phoneNumber: string) {
    interval(1000).pipe(
      take(1),
      switchMap(() => this._login$(phoneNumber)
        .pipe(
          take(1),
        ),
      ),
    )
    .subscribe((user: User | null) => {
      if (user) {
        this._contextService.registerContext(ContextParams.UserId, user.id);
        this._loggedInUser.set(user);
      } else {
        this._loggedInUser.set(null);
      }
    });
  }

  public createAccount(phoneNumber: string): Promise<void> {
    return new Promise((resolve, reject) => {
      interval(1000)
      .pipe(
        take(1),
        switchMap(() => this._createAccount$(phoneNumber)
          .pipe(
            take(1),
          ),
        ),
      )
      .subscribe((user: User | null) => {
        if (user) {
          this._contextService.registerContext(ContextParams.UserId, user.id);
          this._loggedInUser.set(user);
        } else {
          this._loggedInUser.set(null);
        }

        resolve();
      });
    });
  }

  private _login$(phoneNumber: string): Observable<User | null> {
    return this._httpClient.post<User>(this._getBaseApiUrlForAuth(), { phoneNumber: phoneNumber });
  }

  private _createAccount$(phoneNumber: string): Observable<User | null> {
    return this._httpClient.post<User>(this._getBaseApiUrlForUser(), { phoneNumber: phoneNumber });
  }

  private _getBaseApiUrlForAuth(): string {
    return `${environment.apiUrl}/auth`;
  }

  private _getBaseApiUrlForUser(): string {
    return `${environment.apiUrl}/user`;
  }

}
