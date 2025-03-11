import { PaymentLine } from './payment-line.interfaces';

export interface Payment {
  id: number;
  date: Date;
  place: string;
  status: number;
  paymentLines: readonly PaymentLine[];
}
