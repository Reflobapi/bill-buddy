import { computed, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private getLoadingSignal(): Observable<number | undefined> {
    return interval(700).pipe(take(1));
  }

  public fakeLoading(): Signal<boolean> {
    const loadingSignal = toSignal(this.getLoadingSignal());
    return computed(() => {
      const loading = loadingSignal();
      return loading === undefined;
    });
  }
}
