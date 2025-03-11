import { Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TagComponent } from '../../lib/tag/tag.component';
import { Tag, TagType } from '../../lib/tag/interfaces';
import { Payment } from '../../../../interfaces/payment.interfaces';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-item',
  templateUrl: './payment-item.component.html',
  imports: [
    MatIcon,
    TagComponent,
    CurrencyPipe,
    DatePipe,
  ],
  styleUrl: './payment-item.component.scss',
})
export class PaymentItemComponent {
  public payment = input.required<Payment>();

  protected readonly _paymentValue = computed<number>(() => {
    return this.payment().paymentLines.reduce((acc, line) => acc + line.price, 0);
  });

  protected _tag = computed<Tag>(() => {
    switch (this.payment().status) {
      case 1:
        return { type: TagType.Green, label: 'Validé' };
      case 2:
        return { type: TagType.Yellow, label: 'A valider' };
      default:
        return { type: TagType.Yellow, label: 'A valider' };
    }
  })
}
