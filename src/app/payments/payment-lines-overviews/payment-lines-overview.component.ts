import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { GetPaymentLinesOverviewWithName } from '../payment-details/interfaces';
import { FinancialValueComponent } from '../../lib/financial-value/financial-value.component';
import { ProgressBarComponent } from '../../lib/progress-bar/progress-bar.component';
import { PercentPipe } from '@angular/common';
import { GetPaymentLinesOverviewResponse } from '../../interfaces/payment-lines.interfaces';
import { subCategoryIdTranslationsMap } from '../../trads/categories-trads';
import { LineLoadingDirective } from '../../lib/loading/line-loading/line-loading.directive';

@Component({
  selector: 'app-payment-lines-overviews',
  templateUrl: './payment-lines-overview.component.html',
  styleUrl: './payment-lines-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FinancialValueComponent,
    ProgressBarComponent,
    PercentPipe,
    LineLoadingDirective,
  ],
})
export class PaymentLinesOverviewComponent {
  public loading = input.required<boolean>();
  public paymentLinesOverviews =
    input.required<readonly GetPaymentLinesOverviewResponse[]>();

  protected readonly _allPaymentLinesOverviewWithName = computed<
    readonly GetPaymentLinesOverviewWithName[]
  >(() => {
    if (!this.paymentLinesOverviews()?.length) {
      return [];
    }

    return this.paymentLinesOverviews().map((paymentLineOverview) => ({
      ...paymentLineOverview,
      name:
        subCategoryIdTranslationsMap.get(paymentLineOverview.subCategoryId) ||
        '',
    }));
  });

  protected readonly _paymentLinesOverviewWithName = computed<
    readonly GetPaymentLinesOverviewWithName[]
  >(() => {
    if (!this.paymentLinesOverviews()?.length) {
      return [];
    }

    const paymentLinesOverviewWithName: GetPaymentLinesOverviewWithName[] = [];

    for (let i = 0; i < this._numberOfItemsToShow(); i++) {
      paymentLinesOverviewWithName.push(
        this._allPaymentLinesOverviewWithName()[i],
      );
    }

    return paymentLinesOverviewWithName;
  });

  protected readonly _seeMore = signal(false);

  protected _numberOfItemsToShow = computed<number>(() => {
    return this._seeMore()
      ? this.paymentLinesOverviews().length
      : Math.min(3, this.paymentLinesOverviews().length);
  });
}
