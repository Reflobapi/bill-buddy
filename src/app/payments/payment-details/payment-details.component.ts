import { Component, inject } from '@angular/core';
import { PaymentDetailsStore } from '../store/payment-details.store';
import { PaymentLineComponent } from './payment-line/payment-line.component';
import { DatePipe } from '@angular/common';
import { FinancialValueComponent } from '../../lib/financial-value/financial-value.component';
import { SharedModule } from '../../shared/shared.module';
import { PaymentLinesOverviewComponent } from '../payment-lines-overviews/payment-lines-overview.component';

@Component({
  selector: 'app-payment-details',
  imports: [
    PaymentLineComponent,
    FinancialValueComponent,
    SharedModule,
    DatePipe,
    PaymentLinesOverviewComponent,
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent {
  private readonly _paymentDetailsStore = inject(PaymentDetailsStore);

  protected readonly _paymentLines = this._paymentDetailsStore.paymentLines;
  protected readonly _paymentLinesOverviews = this._paymentDetailsStore.paymentLinesOverviews;
  protected readonly _paymentLinesOverviewsLoading = this._paymentDetailsStore.paymentLinesOverviewsLoading;
  protected readonly _payment = this._paymentDetailsStore.payment;
}
