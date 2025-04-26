import { Injectable, Signal } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

interface ContextState {
  userId: number | null | undefined;
  paymentId: number | null;
}

const initialState: ContextState = {
  userId: undefined,
  paymentId: null,
};

export enum ContextParams {
  UserId = 'userId',
  PaymentId = 'paymentId',
}

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  private readonly _state = signalState<ContextState>(initialState);

  public get paymentId(): Signal<number | null> {
    return this._state.paymentId;
  }

  public get userId(): Signal<number | null | undefined> {
    return this._state.userId;
  }

  public registerContext(contextParam: ContextParams, id: number | null): void {
    patchState(this._state, { [contextParam]: id ? +id : null });
  }
}
