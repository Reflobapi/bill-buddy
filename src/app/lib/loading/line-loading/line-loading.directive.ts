import { AfterViewInit, Directive, effect, ElementRef, input, signal } from '@angular/core';

@Directive({
  selector: '[appLineLoading]',
})
export class LineLoadingDirective implements AfterViewInit {
  public appLineLoading = input.required<boolean>();

  private _viewInitialized = signal(false);

  constructor(private el: ElementRef) {
    effect(() => {
      if (!this._viewInitialized()) {
        return;
      }

      if (this.appLineLoading()) {
        this._appendLoading();
        this._removeElFirstChild();
      } else {
        this.el.nativeElement.style.color = 'black';
      }
    });
  }

  ngAfterViewInit(): void {
    this._viewInitialized.set(true);
  }

  private _removeElFirstChild() {
    const firstChild = this.el.nativeElement.firstChild;

    if (firstChild) {
      firstChild.remove();
    }
  }

  private _showElement() {
    this.el.nativeElement.style.visibility = 'visible';
  }

  private _appendLoading() {
    const loading = document.createElement('div');

    const targetElement = this.el.nativeElement;

    // Measure the target element
    const { offsetWidth, offsetHeight } = targetElement;

    loading.className = 'loading';
    loading.innerHTML = `<div class="loading-line"></div>`;

    loading.style.width = `${offsetWidth}px`;
    loading.style.height = `${offsetHeight}px`;
    loading.style.backgroundColor = '#ECECEC';
    loading.style.borderRadius = '8px';

    this.el.nativeElement.appendChild(loading);
  }
}
