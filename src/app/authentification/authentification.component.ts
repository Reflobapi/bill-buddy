import { Component, effect, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from './auth.service';
import { ButtonComponent } from '../lib/button/button.component';
import { ContextService } from '../context.service';

@Component({
  selector: 'app-authentification',
  imports: [ReactiveFormsModule, MatFormField, MatInput, ButtonComponent],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.scss',
})
export class AuthentificationComponent {
  private readonly _authService = inject(AuthService);
  private readonly _contextService = inject(ContextService);

  protected readonly _form = new FormGroup({
    phone: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/), // Example pattern for a 10-digit phone number
    ]),
  });

  protected readonly _creationMode = signal<boolean>(false);

  protected readonly _loading = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (
        this._contextService.userId() ||
        this._contextService.userId() === null
      ) {
        this._loading.set(false);
      }

      this._authService.login('0000000000');
    });
  }

  protected _reverseCreationMode() {
    this._creationMode.set(!this._creationMode());
  }

  protected async _createAccount() {
    this._loading.set(true);
    this._authService
      .createAccount(this._form.value.phone!)
      .then(() => this._loading.set(false));
  }

  protected _login() {
    this._loading.set(true);

    this._authService.login(this._form.value.phone!);
  }
}
