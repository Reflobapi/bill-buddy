import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _loggedInUser = signal<number>(1);

  public get loggedInUser() {
    return this._loggedInUser;
  }
}
