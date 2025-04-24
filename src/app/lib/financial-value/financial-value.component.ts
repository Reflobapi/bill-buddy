import { Component, input } from '@angular/core';
import { FinancialPipe } from './financial.pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-financial-value',
  templateUrl: './financial-value.component.html',
  imports: [
    FinancialPipe,
  ],
  providers: [CurrencyPipe],
  styleUrl: './financial-value.component.scss',
})
export class FinancialValueComponent {
  public value = input.required<number | undefined | null>();
  public bold = input<boolean>(true);
  public color = input<'grey' | 'black'>('black');
}
