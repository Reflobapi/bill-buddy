import { effect, inject, Injectable, resource } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { firstValueFrom } from 'rxjs';
import { patchState, signalState } from '@ngrx/signals';
import { GetPaymentLineResponse } from '../../interfaces/payment-lines.interfaces';
import { ContextStore } from '../../context.store';

interface PaymentLinesState {
  paymentLines: readonly GetPaymentLineResponse[] | null;
  loading: boolean;
}

const initialState: PaymentLinesState = {
  paymentLines: null,
  loading: false,
};

@Injectable({
  providedIn: 'root',
})
export class PaymentLinesStore {
  private readonly _state = signalState<PaymentLinesState>(initialState);
  private readonly _contextStore = inject(ContextStore);

  public get isLoading() {
    return this._state.loading;
  }

  public get paymentLines() {
    return this._state.paymentLines;
  }

  private readonly _paymentsService = inject(PaymentsService);

  private readonly _paymentLinesResource = resource({
    request: () => ({ paymentId: this._contextStore.paymentId() }),
    loader: (loader) => {
      return firstValueFrom(this._paymentsService.getPaymentLines(loader.request.paymentId));
    },
  });

  constructor() {
    effect(() => {
      patchState(this._state, { loading: this._paymentLinesResource.isLoading() });
      patchState(this._state, { paymentLines: this._paymentLinesResource.value() });
    });
  }
}
