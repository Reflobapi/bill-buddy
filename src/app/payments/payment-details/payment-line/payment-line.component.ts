import { Component, computed, input } from '@angular/core';
import { TagComponent } from '../../../lib/tag/tag.component';
import { GetPaymentLineResponse } from '../../../interfaces/payment-lines.interfaces';
import { Tag, TagType } from '../../../lib/tag/interfaces';
import { SharedModule } from '../../../shared/shared.module';
import { FinancialValueComponent } from '../../../lib/financial-value/financial-value.component';

@Component({
  selector: 'app-payment-line',
  imports: [
    TagComponent,
    SharedModule,
    FinancialValueComponent,
  ],
  templateUrl: './payment-line.component.html',
  styleUrl: './payment-line.component.scss',
})
export class PaymentLineComponent {
  public paymentLine = input.required<GetPaymentLineResponse>();

  protected _numberOfItemsTag = computed<Tag>(() => ({
    type: TagType.Grey,
    label: `${this.paymentLine().numberOfItems}`,
  }));
}
