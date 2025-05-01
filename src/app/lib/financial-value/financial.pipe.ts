import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'financial',
  standalone: true,
})
export class FinancialPipe implements PipeTransform {
  private readonly _currencyPipe = inject(CurrencyPipe);

  transform(value: number): string {
    const transformedValue = this._currencyPipe.transform(
      value / 100,
      'EUR',
      'symbol',
      '1.2-2',
    );

    if (transformedValue) {
      return transformedValue;
    }

    return '0,00 €';
  }
}
