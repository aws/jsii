class MyClass {
  constructor(y: string) {
    this.x = y;
  }

  public hello() {
    console.log(this.x);
  }

  public bye() {
    console.log('bye');
  }
}