import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetPaymentResponse} from '../interfaces/payment.interfaces';
import {GetPaymentLineResponse} from '../interfaces/payment-lines.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private readonly _httpClient = inject(HttpClient);

  public getPayments(): Observable<GetPaymentResponse[]> {
    return this._httpClient.get<GetPaymentResponse[]>(this._getBaseApiUrlForPayments());
  }

  public getPayment(paymentId: number | null): Observable<GetPaymentResponse> {
    return this._httpClient.get<GetPaymentResponse>(this._getBaseApiUrlForPayments(paymentId));
  }

  public getPaymentLines(paymentId: number | null): Observable<readonly GetPaymentLineResponse[]> {
    return this._httpClient.get<readonly GetPaymentLineResponse[]>(`${this._getBaseApiUrlForPayments(paymentId)}/payment-lines`);
  }

  public createPayment(options: {
    base64: string | null,
    filename: string | null,
  }): Observable<GetPaymentResponse> {
    if (!options.base64 || !options.filename) {
      throw new Error('Base64 file is required');
    }

    return this._httpClient.post<GetPaymentResponse>(`${this._getBaseApiUrlForPayments()}`,  options);
  }

  private _getBaseApiUrlForPayments(paymentId?: number | null): string {
    const baseUrl: string = 'http://localhost:3003/payments';

    return paymentId ? `${baseUrl}/${paymentId}` : baseUrl;
  }
}
