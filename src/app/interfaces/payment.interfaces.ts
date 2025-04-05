export interface GetPaymentResponse {
  id: number;
  categoryId: number;
  date: Date;
  paymentLinesSum: number;
  payee: string;
}
