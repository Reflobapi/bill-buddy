import { Component, input } from '@angular/core';
import { FinancialPipe } from './financial.pipe';

@Component({
  selector: 'app-financial-value',
  templateUrl: './financial-value.component.html',
  imports: [
    FinancialPipe,
  ],
  styleUrl: './financial-value.component.scss',
})
export class FinancialValueComponent {
  public value = input.required<number | undefined | null>()
  public bold = input<boolean>(true)
  public color = input<'grey' | 'black'>('black')
}
