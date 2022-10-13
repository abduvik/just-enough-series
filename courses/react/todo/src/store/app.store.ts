export class AppStore {
  private state: any;
  private storeAdapter: any;

  constructor(storeAdapter: any) {
    this.storeAdapter = storeAdapter;
  }
}
