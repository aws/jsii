///!STRICT!
export class None {
  public readonly do: boolean = true;

  public assert(_internal: boolean): void {
    throw new Error();
  }
}
