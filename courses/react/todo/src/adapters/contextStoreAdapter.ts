import React, { useState } from "react";
import { StoreAdapter } from "../models/StoreAdapter";

export class ContextStoreAdapter implements StoreAdapter {
  private _state: any = {};
  private _consumer;
  provider;
  constructor() {
    const { Provider, Consumer } = React.createContext({});
    this.provider = Provider;
    this._consumer = Consumer;
  }

  createStore<T>(storeName: string, initialState?: T) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState<T>(initialState || ({} as T));
    this._state[storeName] = {
      _setState: setState,
      _state: state,
    };
  }

  getStore(storeName: string) {
    return { ...this._state[storeName]._state };
  }

  update(storeName: string, data: any) {
    const setState = this._state[storeName]._setState;
    const currentState = { ...this._state[storeName]._setState };
    setState({
      ...currentState,
      ...data,
    });
  }
}
