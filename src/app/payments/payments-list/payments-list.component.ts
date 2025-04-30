import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PaymentsStore } from '../store/payments.store';
import { PaymentItemComponent } from '../payment-item/payment-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../lib/button/button.component';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { DoughnutComponent } from '../../lib/charts/doughnut/doughnut.component';
import { subCategoryIdTranslationsMap } from '../../trads/categories-trads';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.scss',
  imports: [
    PaymentItemComponent,
    CommonModule,
    ButtonComponent,
    NgTemplateOutlet,
    DoughnutComponent,
  ],
  providers: [PaymentsStore],
})
export class PaymentsListComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  protected readonly _paymentsStore = inject(PaymentsStore);

  protected _chartLabels = computed<string[]>(() => {
    if (!this._paymentsStore.paymentLinesOverviews().length) {
      return [];
    }

    const labels: string[] = [];

    for (let i = 0; i < 3; i++) {
      labels.push(
        subCategoryIdTranslationsMap.get(
          this._paymentsStore.paymentLinesOverviews()[i].subCategoryId,
        ) || '',
      );
    }

    return labels;
  });

  protected _chartData = computed<number[]>(() => {
    if (!this._paymentsStore.paymentLinesOverviews().length) {
      return [];
    }

    const data: number[] = [];

    for (let i = 0; i < 3; i++) {
      data.push(this._paymentsStore.paymentLinesOverviews()[i].value);
    }

    return data;
  });

  public ngOnInit() {
    this._paymentsStore.getPayments();
    this._paymentsStore.getPaymentLinesOverviews();
  }

  protected _navigateToPaymentDetails(paymentId: number | undefined): void {
    if (!paymentId) {
      return;
    }

    this._router.navigate([paymentId], { relativeTo: this._activatedRoute });
  }

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  protected _onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this._convertFileToBase64(file).then((base64String) => {
        this._paymentsStore.uploadFile({
          base64: base64String,
          filename: file.name,
        });
      });
    }
  }

  private _convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          resolve(base64String);
        } else {
          reject(new Error('Failed to convert file to Base64'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  }

  protected _triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
}
