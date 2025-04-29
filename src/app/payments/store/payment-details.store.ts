import { effect, inject, Injectable, resource } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { firstValueFrom } from 'rxjs';
import { patchState, signalState } from '@ngrx/signals';
import {
  GetPaymentLineResponse,
  GetPaymentLinesOverviewResponse,
} from '../../interfaces/payment-lines.interfaces';
import { ContextService } from '../../context.service';
import { GetPaymentResponse } from '../../interfaces/payment.interfaces';
import { PaymentLinesService } from '../payment-lines.service';

interface PaymentDetailsState {
  payment: GetPaymentResponse | null;
  paymentLines: readonly GetPaymentLineResponse[];
  paymentLinesOverviews: readonly GetPaymentLinesOverviewResponse[];
  paymentLoading: boolean;
  paymentLinesLoading: boolean;
  paymentLinesOverviewsLoading: boolean;
}

const initialState: PaymentDetailsState = {
  payment: null,
  paymentLines: [],
  paymentLinesOverviews: [],
  paymentLoading: false,
  paymentLinesLoading: false,
  paymentLinesOverviewsLoading: false,
};

@Injectable()
export class PaymentDetailsStore {
  private readonly _state = signalState<PaymentDetailsState>(initialState);
  private readonly _contextService = inject(ContextService);

  public get paymentLinesOverviewsLoading() {
    return this._state.paymentLinesOverviewsLoading;
  }

  public get paymentLines() {
    return this._state.paymentLines;
  }

  public get paymentLinesOverviews() {
    return this._state.paymentLinesOverviews;
  }

  public get payment() {
    return this._state.payment;
  }

  public get paymentLoading() {
    return this._state.paymentLoading;
  }

  private readonly _paymentsService = inject(PaymentsService);
  private readonly _paymentsLinesService = inject(PaymentLinesService);

  private readonly _paymentLinesResource = resource({
    request: () => ({ paymentId: this._contextService.paymentId() }),
    loader: (loader) => {
      return firstValueFrom(
        this._paymentsLinesService.getPaymentLines(loader.request.paymentId),
      );
    },
  });

  private readonly _paymentLinesOverviewsResource = resource({
    request: () => ({ paymentId: this._contextService.paymentId() }),
    loader: (loader) => {
      return firstValueFrom(
        this._paymentsLinesService.getPaymentLinesOverviews(
          loader.request.paymentId,
        ),
      );
    },
  });

  private readonly _paymentResource = resource({
    request: () => ({ paymentId: this._contextService.paymentId() }),
    loader: (loader) => {
      return firstValueFrom(
        this._paymentsService.getPayment$(loader.request.paymentId),
      );
    },
  });

  constructor() {
    effect(() => {
      patchState(this._state, { payment: this._paymentResource.value() });
      patchState(this._state, {
        paymentLines: this._paymentLinesResource.value(),
      });
      patchState(this._state, {
        paymentLinesOverviews: this._paymentLinesOverviewsResource.value(),
      });
      patchState(this._state, {
        paymentLinesLoading: this._paymentLinesResource.isLoading(),
      });
      patchState(this._state, {
        paymentLoading: this._paymentResource.isLoading(),
      });
      patchState(this._state, {
        paymentLinesOverviewsLoading:
          this._paymentLinesOverviewsResource.isLoading(),
      });
    });
  }
}
