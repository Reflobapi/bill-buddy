import { Component, input } from '@angular/core';
import { GetPaymentResponse } from '../../interfaces/payment.interfaces';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FinancialValueComponent } from '../../lib/financial-value/financial-value.component';

@Component({
  selector: 'app-payment-item',
  templateUrl: './payment-item.component.html',
  imports: [
    MatIcon,
    DatePipe,
    FinancialValueComponent,
  ],
  styleUrl: './payment-item.component.scss',
})
export class PaymentItemComponent {
  public payment = input.required<GetPaymentResponse>();
}
