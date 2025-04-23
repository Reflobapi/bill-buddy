import { effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
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
    this._login$(phoneNumber)
    .pipe(
      take(1),
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

  private _login$(phoneNumber: string): Observable<User | null> {
    return this._httpClient.post<User>(this._getBaseApiUrlForAuth(), { phoneNumber: phoneNumber });
  }

  private _getBaseApiUrlForAuth(): string {
    return `${environment.apiUrl}/auth`;
  }

}
