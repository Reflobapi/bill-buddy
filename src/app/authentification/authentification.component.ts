import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from './auth.service';
import { ButtonComponent } from '../lib/button/button.component';
import { SpinnerComponent } from '../lib/loading/spinner/spinner.component';
import { ContextService } from '../context.service';

@Component({
  selector: 'app-authentification',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    ButtonComponent,
    SpinnerComponent,

  ],
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
    this._form.valueChanges.subscribe(form => {
      if (this._creationMode()) {
        return;
      }

      if (!form.phone) {
        return;
      }

      if (this._isPhoneNumberValid(form.phone)) {
        this._onPhoneNumberValid(form.phone);
      }
    });

    effect(() => {
      if (this._contextService.userId()) {
        this._loading.set(false);
      }
    });
  }

  protected _reverseCreationMode() {
    this._creationMode.set(!this._creationMode());
  }

  protected async _createAccount() {
    this._loading.set(true);
    this._authService.createAccount(this._form.value.phone!).then(() =>
      this._loading.set(false),
    );
  }

  private _isPhoneNumberValid(phoneNumber: string | null): boolean {
    if (!phoneNumber) {
      return false;
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    return /^\d{10}$/.test(cleanPhone);
  }

  private _onPhoneNumberValid(phoneNumber: string) {
    this._loading.set(true);

    this._authService.login(phoneNumber);
  }
}
