import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPaymentLineResponse, GetPaymentLinesOverviewResponse } from '../interfaces/payment-lines.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PaymentLinesService {
  private readonly _httpClient = inject(HttpClient);

  public getPaymentLines(paymentId: number | null): Observable<readonly GetPaymentLineResponse[]> {
    return this._httpClient.get<readonly GetPaymentLineResponse[]>(`${this._getBaseApiUrlForPayments(paymentId)}`, {
      params: {
        paymentId: paymentId ? paymentId : '',
      },
    });
  }

  public getPaymentLinesOverviews(paymentId?: number | null): Observable<readonly GetPaymentLinesOverviewResponse[]> {
    return this._httpClient.get<readonly GetPaymentLinesOverviewResponse[]>(`${this._getBaseApiUrlForPayments(paymentId)}/overviews`, {
      params: {
        paymentId: paymentId ? paymentId : '',
      },
    });
  }

  private _getBaseApiUrlForPayments(paymentId?: number | null): string {
    const baseUrl: string = 'http://localhost:3003/payment-lines';

    return paymentId ? `${baseUrl}` : baseUrl;
  }
}
