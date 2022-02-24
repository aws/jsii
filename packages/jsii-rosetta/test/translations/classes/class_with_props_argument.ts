interface MyClassProps {
  readonly prop1: string;
  readonly prop2: number;
}

class MyClass extends cdk.SomeOtherClass {
  constructor(scope: cdk.Construct, id: string, props: MyClassProps) {
    super(scope, id, props);

    console.log(props.prop1);
  }
}
