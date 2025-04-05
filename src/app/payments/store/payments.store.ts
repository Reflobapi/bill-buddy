import { GetPaymentResponse } from '../../interfaces/payment.interfaces';
import { effect, inject, Injectable, resource } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PaymentsService } from '../payments.service';
import { firstValueFrom } from 'rxjs';
import { patchState, signalState } from '@ngrx/signals';

interface PaymentsState {
  base64File: string | null;
  payments: GetPaymentResponse[];
  loading: boolean;
  uploading: boolean;
}

const initialState: PaymentsState = {
  base64File: null,
  payments: [],
  loading: false,
  uploading: false,
};

@Injectable({
  providedIn: 'root',
})
export class PaymentsStore {
  private readonly _state = signalState<PaymentsState>(initialState);

  public get isLoading() {
    return this._state.loading;
  }

  public get isUploading() {
    return this._state.uploading;
  }

  public get payments() {
    return this._state.payments;
  }

  public get newPaymentValue() {
    return this._newPaymentResource.value;
  }

  public set base64File(base64File: string | null) {
    patchState(this._state, { base64File });
  }

  private readonly _authService = inject(AuthService);
  private readonly _paymentsService = inject(PaymentsService);

  protected readonly _paymentsResource = resource({
    request: () => ({ loggedInUserId: this._authService.loggedInUser(), newPaymentValue: this._newPaymentResource.value() }),
    loader: () => firstValueFrom(this._paymentsService.getPayments()),
  });

  protected _newPaymentResource = resource({
    request: () => ({ base64File: this._state.base64File() }),
    loader: (resourceLoader) =>
      firstValueFrom(this._paymentsService.createPayment(resourceLoader.request.base64File)),
  });

  constructor() {
    effect(() => {
      patchState(this._state, { loading: this._paymentsResource.isLoading() });
      patchState(this._state, { uploading: this._newPaymentResource.isLoading() });
      patchState(this._state, { payments: this._paymentsResource.value() });
      // @ts-ignore
      patchState(this._state, { payments: [...this._state.payments(), this._newPaymentResource.value()] });
    });
  }
}
