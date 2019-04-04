///!MATCH_ERROR: non-static member 'funFunction' of class 'Sub' conflicts with static member in ancestor 'SuperDuper'

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