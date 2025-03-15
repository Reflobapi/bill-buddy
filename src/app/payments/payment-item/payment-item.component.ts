import { Component, computed, input } from '@angular/core';
import { GetPaymentResponse, PaymentStatus } from '../../interfaces/payment.interfaces';
import { Tag, TagType } from '../../lib/tag/interfaces';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TagComponent } from '../../lib/tag/tag.component';
import { MatIcon } from '@angular/material/icon';

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
  public payment = input.required<GetPaymentResponse>();

  protected _tag = computed<Tag>(() => {
    switch (this.payment().status) {
      case PaymentStatus.Completed:
        return { type: TagType.Green, label: 'Validé' };
      case PaymentStatus.ToBeCompleted:
        return { type: TagType.Yellow, label: 'A valider' };
      default:
        return { type: TagType.Yellow, label: 'A valider' };
    }
  });
}
