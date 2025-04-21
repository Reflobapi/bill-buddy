import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPaymentResponse } from '../interfaces/payment.interfaces';
import { BaseUrlService } from '../base-url.service';
import { ContextService } from '../context.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrlService = inject(BaseUrlService);
  private readonly _contextService = inject(ContextService);

  public getPayments(): Observable<GetPaymentResponse[]> {
    return this._httpClient.get<GetPaymentResponse[]>(this._baseUrlService.getBaseApiUrlForPayments());
  }

  public getPayment(paymentId: number | null): Observable<GetPaymentResponse> {
    return this._httpClient.get<GetPaymentResponse>(this._baseUrlService.getBaseApiUrlForPayments(paymentId));
  }

  public createPayment(options: {
    base64: string | null,
    filename: string | null,
  }): Observable<GetPaymentResponse> {
    if (!options.base64 || !options.filename) {
      throw new Error('Base64 file is required');
    }

    return this._httpClient.post<GetPaymentResponse>(`${this._baseUrlService.getBaseApiUrlForPayments()}`, {
      ...options,
      userId: this._contextService.userId(),
    });
  }
}
