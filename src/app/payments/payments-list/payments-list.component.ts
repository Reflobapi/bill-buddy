import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PaymentsStore } from '../store/payments.store';
import { PaymentItemComponent } from '../payment-item/payment-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../lib/button/button.component';
import { PaymentLinesOverviewComponent } from '../payment-lines-overviews/payment-lines-overview.component';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.scss',
  imports: [
    PaymentItemComponent,
    CommonModule,
    ButtonComponent,
    PaymentLinesOverviewComponent,
    NgTemplateOutlet,
  ],
})
export class PaymentsListComponent {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  protected readonly _paymentsStore = inject(PaymentsStore);

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
      this._convertFileToBase64(file).then(base64String => {
        this._paymentsStore.fileToUpload = {
          base64: base64String,
          filename: file.name,
        };
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
