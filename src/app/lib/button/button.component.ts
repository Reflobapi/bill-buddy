import { Component, EventEmitter, input, Output } from '@angular/core';
import { ButtonType } from './interfaces';
import { MatFabButton } from '@angular/material/button';
import { SpinnerComponent } from '../loading/spinner/spinner.component';

@Component({
  selector: 'app-button',
  imports: [MatFabButton, SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Output()
  public click = new EventEmitter<void>();

  public text = input<string>();
  public icon = input<string>();
  public floating = input<boolean>();
  public loading = input<boolean>();
  public disabled = input<boolean>();
  public type = input<ButtonType>();

  protected _click(event: Event): void {
    event.stopPropagation();

    this.click.emit();
  }
}
