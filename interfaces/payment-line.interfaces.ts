export interface PaymentLine {
  id: number;
  paymentId: number;
  subCategoryId: number | null;
  numberOfItems: number;
  name: string;
  price: number;
}
