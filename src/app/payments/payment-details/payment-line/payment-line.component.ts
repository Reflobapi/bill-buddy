import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TagComponent } from '../../../lib/tag/tag.component';
import { GetPaymentLineResponse } from '../../../interfaces/payment-lines.interfaces';
import { Tag, TagType } from '../../../lib/tag/interfaces';

@Component({
  selector: 'app-payment-line',
  imports: [
    CurrencyPipe,
    MatIcon,
    TagComponent,
  ],
  templateUrl: './payment-line.component.html',
  styleUrl: './payment-line.component.scss'
})
export class PaymentLineComponent {
  public paymentLine = input.required<GetPaymentLineResponse>();

  protected _tag = computed<Tag>(() => ({
    type: TagType.Grey,
    label: `${this.paymentLine().numberOfItems}`
  }));
}
