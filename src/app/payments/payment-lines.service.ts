import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPaymentLineResponse, GetPaymentLinesOverviewResponse } from '../interfaces/payment-lines.interfaces';
import { BaseUrlService } from '../base-url.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentLinesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrlService = inject(BaseUrlService);

  public getPaymentLines(paymentId: number | null): Observable<readonly GetPaymentLineResponse[]> {
    return this._httpClient.get<readonly GetPaymentLineResponse[]>(`${this._baseUrlService.getBaseApiUrlForPaymentLines(paymentId)}`, {});
  }

  public getPaymentLinesOverviews(paymentId: number | null): Observable<readonly GetPaymentLinesOverviewResponse[]> {
    return this._httpClient.get<readonly GetPaymentLinesOverviewResponse[]>(`${this._baseUrlService.getBaseApiUrlForLineOverviews(paymentId)}`, {});
  }
}
