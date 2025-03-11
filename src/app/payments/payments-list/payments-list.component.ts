import { Component } from '@angular/core';
import { PaymentItemComponent } from '../payment-item/payment-item.component';
import { Payment } from '../../../../interfaces/payment.interfaces';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.scss',
  standalone: true,
  imports: [
    PaymentItemComponent,
  ],
})
export class PaymentsListComponent {
  public fakePayments: readonly Payment[] = [
    {
      id: 1,
      date: new Date(),
      place: 'Supermarket',
      status: 1,
      paymentLines: [
        {
          id: 1,
          price: 100,
          numberOfItems: 1,
          subCategoryId: 1,
          paymentId: 1,
          name: 'Milk',
        },
        {
          id: 2,
          price: 200,
          numberOfItems: 2,
          subCategoryId: 2,
          paymentId: 1,
          name: 'Bread',
        },
      ],
    },
    {
      id: 2,
      date: new Date(),
      place: 'Restaurant',
      status: 2,
      paymentLines: [
        {
          id: 3,
          price: 300,
          numberOfItems: 3,
          subCategoryId: 3,
          paymentId: 2,
          name: 'Pizza',
        },
        {
          id: 4,
          price: 400,
          numberOfItems: 4,
          subCategoryId: 4,
          paymentId: 2,
          name: 'Hamburger',
        },
      ],
    },
  ];
}
