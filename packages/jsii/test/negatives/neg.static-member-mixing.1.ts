export class SuperDuper {
  public static funFunction() {
    // Empty
  }
}

export class Super extends SuperDuper {
  // Empty
}

export class Sub extends Super {
  public funFunction() {
    // Oops
  }
}
