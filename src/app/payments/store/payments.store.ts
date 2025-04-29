import { GetPaymentResponse } from '../../interfaces/payment.interfaces';
import { inject, Injectable } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { catchError, of, take } from 'rxjs';
import { patchState, signalState } from '@ngrx/signals';
import { GetPaymentLinesOverviewResponse } from '../../interfaces/payment-lines.interfaces';
import { PaymentLinesService } from '../payment-lines.service';

interface PaymentsState {
  payments: GetPaymentResponse[];
  paymentLinesOverviews: readonly GetPaymentLinesOverviewResponse[];
  paymentsLoading: boolean;
  paymentLinesOverviewsLoading: boolean;
  uploading: boolean;
}

const initialState: PaymentsState = {
  payments: [],
  paymentLinesOverviews: [],
  paymentsLoading: false,
  paymentLinesOverviewsLoading: false,
  uploading: false,
};

@Injectable()
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

  private readonly _paymentsService = inject(PaymentsService);
  private readonly _paymentLinesService = inject(PaymentLinesService);

  public getPayments(): void {
    patchState(this._state, {
      paymentsLoading: true,
    });

    this._paymentsService
      .getPayments$()
      .pipe(
        catchError(() => {
          patchState(this._state, {
            paymentsLoading: false,
          });

          return of([]);
        }),
        take(1),
      )
      .subscribe((payments) => {
        patchState(this._state, {
          payments,
          paymentsLoading: false,
        });
      });
  }

  public getPaymentLinesOverviews(): void {
    patchState(this._state, {
      paymentLinesOverviewsLoading: true,
    });

    this._paymentLinesService
      .getPaymentLinesOverviews(null)
      .pipe(
        catchError(() => {
          patchState(this._state, {
            paymentLinesOverviewsLoading: false,
          });

          return of([]);
        }),
        take(1),
      )
      .subscribe((paymentLinesOverviews) => {
        patchState(this._state, {
          paymentLinesOverviews,
          paymentLinesOverviewsLoading: false,
        });
      });
  }

  public uploadFile(
    fileToUpload: { base64: string | null; filename: string | null } | null,
  ): void {
    if (!fileToUpload) {
      return;
    }

    patchState(this._state, {
      uploading: true,
    });

    this._paymentsService
      .createPayment$({
        base64: fileToUpload.base64,
        filename: fileToUpload.filename,
      })
      .pipe(
        catchError(() => {
          patchState(this._state, {
            uploading: false,
          });

          return of(null);
        }),
        take(1),
      )
      .subscribe((response) => {
        if (response) {
          this.getPayments();
          this.getPaymentLinesOverviews();

          patchState(this._state, {
            uploading: false,
          });
        }
      });
  }
}
