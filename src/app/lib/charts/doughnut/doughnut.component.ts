import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  Tooltip,
} from 'chart.js';
import { FinancialPipe } from '../../financial-value/financial.pipe';
import { CurrencyPipe } from '@angular/common';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const backgroundColors: string[] = [
  '#262626',
  '#505050',
  '#7a7a7a',
  '#a3a3a3',
  '#cdcdcd',
  '#e2e2e2',
];

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrl: './doughnut.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FinancialPipe, CurrencyPipe],
})
export class DoughnutComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private readonly _financialPipe = inject(FinancialPipe);

  public labels = input.required<string[]>();
  public data = input.required<number[]>();

  private readonly _viewInitialized = signal<boolean>(false);

  public ngAfterViewInit(): void {
    this._viewInitialized.set(true);
  }

  protected readonly _chart = computed<Chart | undefined>(() => {
    if (!this._viewInitialized() || !this.labels() || !this.data()) {
      return;
    }

    return new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.labels(),
        datasets: [
          {
            data: this.data(),
            backgroundColor: backgroundColors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        cutout: '70%',
        maintainAspectRatio: false,
        layout: {
          padding: {
            right: 40,
          },
        },
        plugins: {
          legend: {
            position: 'right',
            align: 'center',
            labels: {
              padding: 10,
              boxWidth: 15,
              boxHeight: 15,
              font: {
                size: 16,
                family: 'Inter',
                weight: 'bold',
              },
            },
          },
        },
      },
    });
  });
}
