export interface StoreAdapter {
  provider: any;
  createStore: <T>(storeName: string, initialState?: T) => void;
  getStore: (storeName: string) => any;
  update: (storeName: string, data: any) => void;
}
