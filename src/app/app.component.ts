import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
  ],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _authService = inject(AuthService);

  constructor() {
    this._authService.login('0602339587');
  }
}
