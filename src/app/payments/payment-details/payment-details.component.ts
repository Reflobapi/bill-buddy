import { Component, computed, inject } from '@angular/core';
import { PaymentDetailsStore } from '../store/payment-details.store';
import { PaymentLineComponent } from './payment-line/payment-line.component';
import { GroupedPaymentLines } from './interfaces';
import { ProgressBarComponent } from '../../lib/progress-bar/progress-bar.component';
import { subCategoryIdTranslationsMap } from '../../trads/categories-trads';
import { DatePipe, PercentPipe } from '@angular/common';
import { FinancialValueComponent } from '../../lib/financial-value/financial-value.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-payment-details',
  imports: [
    PaymentLineComponent,
    ProgressBarComponent,
    PercentPipe,
    FinancialValueComponent,
    SharedModule,
    DatePipe,
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent {
  private readonly _paymentDetailsStore = inject(PaymentDetailsStore);

  protected readonly _paymentLines = this._paymentDetailsStore.paymentLines;
  protected readonly _payment = this._paymentDetailsStore.payment;

  protected readonly _groupedPaymentLines = computed<GroupedPaymentLines[]>(() => {
    const groupedPaymentLines: GroupedPaymentLines[] = [];

    (this._paymentLines() || []).map(paymentLine => {
      const existingGroup = groupedPaymentLines.find(group => group.subCategoryId === paymentLine.subCategoryId);

      if (existingGroup) {
        existingGroup.sumValues += paymentLine.value;
      } else {
        groupedPaymentLines.push({
          subCategoryId: paymentLine.subCategoryId,
          name: subCategoryIdTranslationsMap.get(paymentLine.subCategoryId) || '',
          sumValues: paymentLine.value,
        });
      }
    });

    return groupedPaymentLines.sort((a, b) => b.sumValues - a.sumValues);
  });
}
