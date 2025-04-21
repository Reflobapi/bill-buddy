import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlService {
  private readonly _contextService = inject(ContextService);

  private readonly _baseUrl: string = environment.apiUrl;

  public getBaseApiUrlForPayments(paymentId?: number | null): string {
    const baseUrl: string = `${this._baseUrl}/users/${this._contextService.userId()}/payments`;

    return paymentId ? `${baseUrl}/${paymentId}` : baseUrl;
  }

  public getBaseApiUrlForPaymentLines(paymentId: number | null): string {
    return `${this.getBaseApiUrlForPayments(paymentId)}/payment-lines`;
  }

  public getBaseApiUrlForLineOverviews(paymentId: number | null): string {
    return `${this.getBaseApiUrlForPaymentLines(paymentId)}/overviews`;
  }
}
