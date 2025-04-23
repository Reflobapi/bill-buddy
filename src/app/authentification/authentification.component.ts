import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentification',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,

  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.scss',
})
export class AuthentificationComponent {
  private readonly _authService = inject(AuthService);

  protected readonly _form = new FormGroup({
    phone: new FormControl<string | null>(null),
  });

  constructor() {
    this._form.valueChanges.subscribe(form => {
      if (!form.phone) {
        return;
      }

      if (this._isPhoneNumberValid(form.phone)) {
        this._onPhoneNumberValid(form.phone);
      }
    });
  }

  private _isPhoneNumberValid(phoneNumber: string | null): boolean {
    if (!phoneNumber) {
      return false;
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    return /^\d{10}$/.test(cleanPhone);
  }

  private _onPhoneNumberValid(phoneNumber: string) {
    this._authService.login(phoneNumber);
  }
}
