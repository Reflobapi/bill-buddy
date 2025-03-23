import { Component, inject } from '@angular/core';
import { PaymentsStore } from '../store/payments.store';
import { PaymentItemComponent } from '../payment-item/payment-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.scss',
  providers: [PaymentsStore],
  imports: [
    PaymentItemComponent,
    SharedModule,
  ],
})
export class PaymentsListComponent {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  protected readonly _paymentsStore = inject(PaymentsStore);

  protected _navigateToPaymentDetails(paymentId: number): void {
    this._router.navigate([paymentId], { relativeTo: this._activatedRoute });
  }
}
