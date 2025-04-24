import { Component, input } from '@angular/core';
import { GetPaymentLineResponse } from '../../../interfaces/payment-lines.interfaces';
import { FinancialValueComponent } from '../../../lib/financial-value/financial-value.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-line',
  imports: [
    CommonModule,
    FinancialValueComponent,
  ],
  templateUrl: './payment-line.component.html',
  styleUrl: './payment-line.component.scss',
})
export class PaymentLineComponent {
  public paymentLine = input.required<GetPaymentLineResponse>();
}
