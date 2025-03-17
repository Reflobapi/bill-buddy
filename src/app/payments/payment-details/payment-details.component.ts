import { Component, inject } from '@angular/core';
import { PaymentLinesStore } from '../store/payment-lines.store';
import { PaymentLineComponent } from './payment-line/payment-line.component';

@Component({
  selector: 'app-payment-details',
  imports: [
    PaymentLineComponent,
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent {
  private readonly _paymentLinesStore = inject(PaymentLinesStore);

  protected _paymentLines =  this._paymentLinesStore.paymentLines;
}
