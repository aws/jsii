export class NotAnInterface {
  public meaningOfTheUniverse() {
    return 42;
  }
}

// While valid typescript, this is illegal in the vast majority of languages
export class TryingToImplementClass implements NotAnInterface {
  public meaningOfTheUniverse() {
    return 1337;
  }
}
