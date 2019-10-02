///!MATCH_ERROR: Interface contains behavior: name should be "ISomething"

export interface Something {
  // The presence of this method requires an I prefix on the interface
  doSomething(): void;
}
