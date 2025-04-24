import { Component, computed, inject } from '@angular/core';
import { PaymentDetailsStore } from '../store/payment-details.store';
import { PaymentLineComponent } from './payment-line/payment-line.component';
import { CommonModule, DatePipe, NgTemplateOutlet } from '@angular/common';
import { FinancialValueComponent } from '../../lib/financial-value/financial-value.component';
import { PaymentLinesOverviewComponent } from '../payment-lines-overviews/payment-lines-overview.component';
import { PaymentItemComponent } from '../payment-item/payment-item.component';
import { LoadingService } from '../../lib/loading/loading.service';

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
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent {
  private readonly _paymentDetailsStore = inject(PaymentDetailsStore);
  private readonly _loadingService = inject(LoadingService);

  private readonly fakeLoadingIntervalEnded = this._loadingService.fakeLoading();

  protected readonly _paymentLines = this._paymentDetailsStore.paymentLines;
  protected readonly _paymentLinesOverviews = this._paymentDetailsStore.paymentLinesOverviews;
  protected readonly _paymentLinesOverviewsLoading = this._paymentDetailsStore.paymentLinesOverviewsLoading;
  protected readonly _payment = this._paymentDetailsStore.payment;
  protected readonly _paymentLoading = this._paymentDetailsStore.paymentLoading;

  protected readonly _paymentDetailsLoading = computed(() => {
    return this._paymentLoading() || this._paymentLinesOverviewsLoading() || this.fakeLoadingIntervalEnded();
  });
}
