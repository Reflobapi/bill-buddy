import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ContextService } from './context.service';

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
  private readonly _contextService = inject(ContextService);
  private readonly _router = inject(Router);

  constructor() {
    this._authService.login('0602339587');

    effect(() => {
      if (this._contextService.userId()) {
        void this._router.navigate(['payments']);
      }
    });
  }
}
