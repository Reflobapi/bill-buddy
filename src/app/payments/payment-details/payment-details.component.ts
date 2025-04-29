import {
  Component,
  computed,
  effect,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PaymentDetailsStore } from '../store/payment-details.store';
import { PaymentLineComponent } from './payment-line/payment-line.component';
import { CommonModule, DatePipe, NgTemplateOutlet } from '@angular/common';
import { FinancialValueComponent } from '../../lib/financial-value/financial-value.component';
import { PaymentLinesOverviewComponent } from '../payment-lines-overviews/payment-lines-overview.component';
import { PaymentItemComponent } from '../payment-item/payment-item.component';
import { LoadingService } from '../../lib/loading/loading.service';
import { ButtonComponent } from '../../lib/button/button.component';
import { ButtonType } from '../../lib/button/interfaces';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationsService } from '../../lib/notifications/notifications.service';
import { NotificationType } from '../../lib/notifications/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-payment-details',
  imports: [
    PaymentLineComponent,
    FinancialValueComponent,
    CommonModule,
    DatePipe,
    PaymentLinesOverviewComponent,
    NgTemplateOutlet,
    PaymentItemComponent,
    ButtonComponent,
  ],
  providers: [PaymentDetailsStore],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent {
  private readonly _loadingService = inject(LoadingService);
  private readonly _router = inject(Router);
  private readonly _notificationService = inject(NotificationsService);
  private readonly _bottomSheet = inject(MatBottomSheet);

  protected readonly _paymentDetailsStore = inject(PaymentDetailsStore);

  private readonly fakeLoadingIntervalEnded =
    this._loadingService.fakeLoading();

  protected readonly _fakeDeleteLoading = signal(false);

  @ViewChild('deleteConfirmation', { static: false })
  private _deleteConfirmation!: TemplateRef<any>;

  constructor() {
    this._paymentDetailsStore.getPayment();
    this._paymentDetailsStore.getPaymentLines();
    this._paymentDetailsStore.getPaymentLinesOverviews();

    effect(() => {
      if (this._paymentDetailsLoading()) {
        return;
      }

      // Then the payment has been deleted.
      if (this._paymentDetailsStore.payment() === null) {
        void this._router.navigate(['/payments']);

        this._bottomSheet.dismiss();

        this._notificationService.notify({
          message: 'Paiement supprimé.',
          type: NotificationType.Success,
        });
      }
    });
  }

  protected readonly _paymentDetailsLoading = computed(() => {
    return (
      this._paymentDetailsStore.paymentLoading() ||
      this._paymentDetailsStore.paymentLinesOverviewsLoading() ||
      this.fakeLoadingIntervalEnded()
    );
  });

  protected _deletePayment() {
    this._bottomSheet.open(this._deleteConfirmation);
  }

  protected _confirmDeletePayment() {
    if (!this._paymentDetailsStore.payment()) {
      return;
    }

    this._fakeDeleteLoading.set(true);

    this._loadingService
      .getLoadingObservable$()
      .pipe(take(1))
      .subscribe(() => {
        this._paymentDetailsStore.deletePayment$(
          this._paymentDetailsStore.payment()!.id,
        );
      });
  }

  protected readonly ButtonType = ButtonType;
}
