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
        this._removeChildren();
      } else {
        this.el.nativeElement.style.color = 'black';
      }
    });
  }

  ngAfterViewInit(): void {
    this._viewInitialized.set(true);
  }

  private _removeChildren() {
    const children = this.el.nativeElement.children;

    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];

      if (child.className !== 'loading') {
        this.el.nativeElement.removeChild(child);
      }
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
