import { GetPaymentLinesOverviewResponse } from '../../interfaces/payment-lines.interfaces';

export interface GetPaymentLinesOverviewWithName extends GetPaymentLinesOverviewResponse {
  name: string;
}
