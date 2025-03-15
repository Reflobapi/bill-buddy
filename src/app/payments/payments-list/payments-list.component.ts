import { Component, inject } from '@angular/core';
import { PaymentsStore } from '../store/payments.store';
import { PaymentItemComponent } from '../payment-item/payment-item.component';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.scss',
  providers: [PaymentsStore],
  imports: [
    PaymentItemComponent,
  ],
})
export class PaymentsListComponent {
  protected readonly _paymentsStore = inject(PaymentsStore);
}
