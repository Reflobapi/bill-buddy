import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'financial',
})
export class FinancialPipe implements PipeTransform {
  private readonly _currencyPipe = inject(CurrencyPipe);

  transform(value: number): unknown {
    return this._currencyPipe.transform(value / 100, 'EUR', 'symbol', '1.2-2');
  }
}
