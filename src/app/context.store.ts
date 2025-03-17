import { Injectable, Signal } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

interface ContextState {
  paymentId: number | null;
}

const initialState: ContextState = {
  paymentId: null,
};

export enum ContextParams {
  PaymentId = 'paymentId',
}

@Injectable({
  providedIn: 'root',
})
export class ContextStore {
  private readonly _state = signalState<ContextState>(initialState);

  public get paymentId(): Signal<number | null> {
    return this._state.paymentId;
  }

  public registerContext(contextParam: ContextParams, id: number): void {
    patchState(this._state, { [contextParam]: +id });
  }
}
