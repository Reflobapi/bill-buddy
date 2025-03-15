import { GetPaymentResponse } from '../../interfaces/payment.interfaces';
import { effect, inject, Injectable, resource } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PaymentsService } from '../payments.service';
import { firstValueFrom } from 'rxjs';
import { patchState, signalState } from '@ngrx/signals';

interface PaymentsState {
  payments: GetPaymentResponse[] | null;
  loading: boolean;
}

const initialState: PaymentsState = {
  payments: null,
  loading: false,
};

@Injectable({
  providedIn: 'root',
})
export class PaymentsStore {
  private readonly _state = signalState<PaymentsState>(initialState);

  public get isLoading() {
    return this._state.loading;
  }

  public get payments() {
    return this._state.payments;
  }

  private readonly _authService = inject(AuthService);
  private readonly _paymentsService = inject(PaymentsService);

  private readonly _paymentsResource = resource({
    request: () => ({ loggedInUserId: this._authService.loggedInUser() }),
    loader: () => firstValueFrom(this._paymentsService.getPayments()),
  });

  constructor() {
    effect(() => {
      patchState(this._state, { loading: this._paymentsResource.isLoading() });
      patchState(this._state, { payments: this._paymentsResource.value() });
    });
  }
}
