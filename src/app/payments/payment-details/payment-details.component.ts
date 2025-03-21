import { Component, computed, inject } from '@angular/core';
import { PaymentLinesStore } from '../store/payment-lines.store';
import { PaymentLineComponent } from './payment-line/payment-line.component';
import { GroupedPaymentLines } from './interfaces';
import { ProgressBarComponent } from '../../lib/progress-bar/progress-bar.component';
import { subCategoryIdTranslationsMap } from '../../trads/categories-trads';
import { CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-payment-details',
  imports: [
    PaymentLineComponent,
    ProgressBarComponent,
    PercentPipe,
    CurrencyPipe,

  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent {
  private readonly _paymentLinesStore = inject(PaymentLinesStore);

  protected readonly _paymentLines = this._paymentLinesStore.paymentLines;

  protected readonly _totalValue = computed<number>(() => {
    return (this._paymentLines() || []).reduce((acc, paymentLine) => acc + paymentLine.value, 0);
  });

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
