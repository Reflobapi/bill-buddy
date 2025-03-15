export enum PaymentStatus {
  Completed = 1,
  ToBeCompleted = 2,
}

export interface GetPaymentResponse {
  id: number;
  categoryId: number;
  date: Date;
  paymentLinesSum: number;
  payee: string;
  status: PaymentStatus;
}
