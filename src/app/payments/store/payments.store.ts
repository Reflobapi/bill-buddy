import { GetPaymentResponse } from '../../interfaces/payment.interfaces';
import { effect, inject, Injectable, resource } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PaymentsService } from '../payments.service';
import { firstValueFrom } from 'rxjs';
import { patchState, signalState } from '@ngrx/signals';
import { GetPaymentLinesOverviewResponse } from '../../interfaces/payment-lines.interfaces';
import { PaymentLinesService } from '../payment-lines.service';

interface PaymentsState {
  fileToUpload: {
    base64: string | null,
    filename: string | null,
  };
  payments: GetPaymentResponse[];
  paymentLinesOverviews: readonly GetPaymentLinesOverviewResponse[];
  loading: boolean;
  uploading: boolean;
}

const initialState: PaymentsState = {
  fileToUpload: {
    base64: null,
    filename: null,
  },
  payments: [],
  paymentLinesOverviews: [],
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

  public get paymentLinesOverviews() {
    return this._state.paymentLinesOverviews;
  }

  public set fileToUpload(options: { base64: string | null, filename: string | null }) {
    patchState(this._state,  {
      fileToUpload: {
        base64: options.base64,
        filename: options.filename,
      },
    });
  }

  private readonly _authService = inject(AuthService);
  private readonly _paymentsService = inject(PaymentsService);
  private readonly _paymentLinesService = inject(PaymentLinesService);

  protected readonly _paymentsResource = resource({
    request: () => ({ loggedInUserId: this._authService.loggedInUser(), newPaymentValue: this._newPaymentResource.value() }),
    loader: () => firstValueFrom(this._paymentsService.getPayments()),
  });

  protected readonly _paymentLinesOverviewsResource = resource({
    request: () => ({ loggedInUserId: this._authService.loggedInUser(), newPaymentValue: this._newPaymentResource.value() }),
    loader: () => firstValueFrom(this._paymentLinesService.getPaymentLinesOverviews()),
  });

  protected _newPaymentResource = resource({
    request: () => ({ fileToUpload: this._state.fileToUpload() }),
    loader: (resourceLoader) =>
      firstValueFrom(this._paymentsService.createPayment(resourceLoader.request.fileToUpload)),
  });

  constructor() {
    effect(() => {
      patchState(this._state, { loading: this._paymentsResource.isLoading() });
      patchState(this._state, { uploading: this._newPaymentResource.isLoading() });
      patchState(this._state, { payments: this._paymentsResource.value() ?? [] });
      patchState(this._state, { paymentLinesOverviews: this._paymentLinesOverviewsResource.value() ?? [] });
    });
  }
}
