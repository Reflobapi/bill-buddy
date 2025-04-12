export interface GetPaymentLineResponse {
  id: number,
  name: string,
  subCategoryId: number,
  paymentId: number,
  value: number,
}

export interface GetPaymentLinesOverviewResponse {
  subCategoryId: number;
  value: number;
  percentage: number;
}
