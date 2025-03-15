import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPaymentResponse } from '../interfaces/payment.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private readonly _httpClient = inject(HttpClient);

  public getPayments(): Observable<GetPaymentResponse[]> {
    return this._httpClient.get<GetPaymentResponse[]>(this._getBaseApiUrlForPayments());
  }

  private _getBaseApiUrlForPayments() {
    return 'http://localhost:3003/payments';
  }
}
