import { GetPaymentResponse } from '../../interfaces/payment.interfaces';
import { effect, inject, Injectable, resource } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { firstValueFrom } from 'rxjs';
import { patchState, signalState } from '@ngrx/signals';
import { GetPaymentLinesOverviewResponse } from '../../interfaces/payment-lines.interfaces';
import { PaymentLinesService } from '../payment-lines.service';
import { ContextService } from '../../context.service';

interface PaymentsState {
  fileToUpload: {
    base64: string | null,
    filename: string | null,
  };
  payments: GetPaymentResponse[];
  paymentLinesOverviews: readonly GetPaymentLinesOverviewResponse[];
  paymentsLoading: boolean;
  paymentLinesOverviewsLoading: boolean;
  uploading: boolean;
}

const initialState: PaymentsState = {
  fileToUpload: {
    base64: null,
    filename: null,
  },
  payments: [],
  paymentLinesOverviews: [],
  paymentsLoading: false,
  paymentLinesOverviewsLoading: false,
  uploading: false,
};

@Injectable({
  providedIn: 'root',
})
export class PaymentsStore {
  private readonly _state = signalState<PaymentsState>(initialState);

  public get paymentsLoading() {
    return this._state.paymentsLoading;
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
    patchState(this._state, {
      fileToUpload: {
        base64: options.base64,
        filename: options.filename,
      },
    });
  }

  private readonly _contextService = inject(ContextService);
  private readonly _paymentsService = inject(PaymentsService);
  private readonly _paymentLinesService = inject(PaymentLinesService);

  protected readonly _paymentsResource = resource({
    request: () => ({ loggedInUserId: this._contextService.userId(), newPaymentValue: this._newPaymentResource.value() }),
    loader: () => firstValueFrom(this._paymentsService.getPayments()),
  });

  protected readonly _paymentLinesOverviewsResource = resource({
    request: () => ({
      loggedInUserId: this._contextService.userId(),
    }),
    loader: () => firstValueFrom(this._paymentLinesService.getPaymentLinesOverviews(null)),
  });

  protected _newPaymentResource = resource({
    request: () => ({ fileToUpload: this._state.fileToUpload() }),
    loader: (resourceLoader) =>
      firstValueFrom(this._paymentsService.createPayment(resourceLoader.request.fileToUpload)),
  });

  constructor() {
    effect(() => {
      patchState(this._state, { paymentsLoading: this._paymentsResource.isLoading() });
      patchState(this._state, { paymentLinesOverviewsLoading: this._paymentLinesOverviewsResource.isLoading() });
      patchState(this._state, { payments: this._paymentsResource.value() ?? [] });
      patchState(this._state, { paymentLinesOverviews: this._paymentLinesOverviewsResource.value() ?? [] });
      patchState(this._state, { uploading: this._newPaymentResource.isLoading() });
    });

    if (this._newPaymentResource.value() || this._newPaymentResource.error()) {
      this._paymentLinesOverviewsResource.reload();
    }
  }
}
