import { inject, Injectable } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { take } from 'rxjs';
import { patchState, signalState } from '@ngrx/signals';
import {
  GetPaymentLineResponse,
  GetPaymentLinesOverviewResponse,
} from '../../interfaces/payment-lines.interfaces';
import { ContextService } from '../../context.service';
import { GetPaymentResponse } from '../../interfaces/payment.interfaces';
import { PaymentLinesService } from '../payment-lines.service';

interface PaymentDetailsState {
  payment: GetPaymentResponse | undefined | null;
  paymentLines: readonly GetPaymentLineResponse[];
  paymentLinesOverviews: readonly GetPaymentLinesOverviewResponse[];
  paymentLoading: boolean;
  paymentLinesLoading: boolean;
  paymentLinesOverviewsLoading: boolean;
}

const initialState: PaymentDetailsState = {
  payment: undefined,
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

  public getPaymentLines(): void {
    patchState(this._state, {
      paymentLinesLoading: true,
    });

    this._paymentsLinesService
      .getPaymentLines(this._contextService.paymentId())
      .pipe(take(1))
      .subscribe({
        next: (paymentLines) => {
          patchState(this._state, {
            paymentLines,
            paymentLinesLoading: false,
          });
        },
        error: () => {
          patchState(this._state, {
            paymentLinesLoading: false,
          });
        },
      });
  }

  public getPaymentLinesOverviews(): void {
    patchState(this._state, {
      paymentLinesOverviewsLoading: true,
    });

    this._paymentsLinesService
      .getPaymentLinesOverviews(this._contextService.paymentId())
      .pipe(take(1))
      .subscribe({
        next: (paymentLinesOverviews) => {
          patchState(this._state, {
            paymentLinesOverviews,
            paymentLinesOverviewsLoading: false,
          });
        },
        error: () => {
          patchState(this._state, {
            paymentLinesOverviewsLoading: false,
          });
        },
      });
  }

  public getPayment(): void {
    patchState(this._state, {
      paymentLoading: true,
    });

    this._paymentsService
      .getPayment$(this._contextService.paymentId())
      .pipe(take(1))
      .subscribe({
        next: (payment) => {
          patchState(this._state, {
            payment,
            paymentLoading: false,
          });
        },
        error: () => {
          patchState(this._state, {
            paymentLoading: false,
          });
        },
      });
  }

  public deletePayment$(paymentId: number): void {
    this._paymentsService
      .deletePayment$(paymentId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          patchState(this._state, {
            payment: null,
          });
        },
      });
  }
}
