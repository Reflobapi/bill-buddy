import { Component, input } from '@angular/core';
import { GetPaymentLineResponse } from '../../../interfaces/payment-lines.interfaces';
import { SharedModule } from '../../../shared/shared.module';
import { FinancialValueComponent } from '../../../lib/financial-value/financial-value.component';

@Component({
  selector: 'app-payment-line',
  imports: [
    SharedModule,
    FinancialValueComponent,
  ],
  templateUrl: './payment-line.component.html',
  styleUrl: './payment-line.component.scss',
})
export class PaymentLineComponent {
  public paymentLine = input.required<GetPaymentLineResponse>();
}
