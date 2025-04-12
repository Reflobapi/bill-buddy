import { effect, inject, Injectable, resource } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { firstValueFrom } from 'rxjs';
import { patchState, signalState } from '@ngrx/signals';
import { GetPaymentLineResponse, GetPaymentLinesOverviewResponse } from '../../interfaces/payment-lines.interfaces';
import { ContextStore } from '../../context.store';
import { GetPaymentResponse } from '../../interfaces/payment.interfaces';
import { PaymentLinesService } from '../payment-lines.service';

interface PaymentDetailsState {
  payment: GetPaymentResponse | null;
  paymentLines: readonly GetPaymentLineResponse[];
  paymentLinesOverviews: readonly GetPaymentLinesOverviewResponse[];
  loading: boolean;
}

const initialState: PaymentDetailsState = {
  payment: null,
  paymentLines: [],
  paymentLinesOverviews: [],
  loading: false,
};

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailsStore {
  private readonly _state = signalState<PaymentDetailsState>(initialState);
  private readonly _contextStore = inject(ContextStore);

  public get paymentLines() {
    return this._state.paymentLines;
  }

  public get paymentLinesOverviews() {
    return this._state.paymentLinesOverviews;
  }

  public get payment() {
    return this._state.payment;
  }

  private readonly _paymentsService = inject(PaymentsService);
  private readonly _paymentsLinesService = inject(PaymentLinesService);

  private readonly _paymentLinesResource = resource({
    request: () => ({ paymentId: this._contextStore.paymentId() }),
    loader: (loader) => {
      return firstValueFrom(this._paymentsLinesService.getPaymentLines(loader.request.paymentId));
    },
  });

  private readonly _paymentLinesOverviewsResource = resource({
    request: () => ({ paymentId: this._contextStore.paymentId() }),
    loader: (loader) => {
      return firstValueFrom(this._paymentsLinesService.getPaymentLinesOverviews(loader.request.paymentId));
    },
  });


  private readonly _paymentResource = resource({
    request: () => ({ paymentId: this._contextStore.paymentId() }),
    loader: (loader) => {
      return firstValueFrom(this._paymentsService.getPayment(loader.request.paymentId));
    },
  });

  constructor() {
    effect(() => {
      patchState(this._state, { loading: this._paymentLinesResource.isLoading() });
      patchState(this._state, { paymentLines: this._paymentLinesResource.value() });
      patchState(this._state, { payment: this._paymentResource.value() });
      patchState(this._state, { paymentLinesOverviews: this._paymentLinesOverviewsResource.value() });
    });
  }
}
