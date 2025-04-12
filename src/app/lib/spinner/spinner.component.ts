import { Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  imports: [
    MatProgressSpinner,
    NgClass,
  ],
})
export class SpinnerComponent {
    public theme = input<'white' | 'grey' | 'black'>('black');
}
