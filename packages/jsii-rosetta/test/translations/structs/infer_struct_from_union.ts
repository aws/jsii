/// !hide
/// fake-from-jsii
interface IResolvable {
  resolve(): any;
}

/// fake-from-jsii
interface SomeStruct {
  readonly enabled: boolean | IResolvable;
  readonly option?: string | IResolvable;
}

/// fake-from-jsii
interface MyProps {
  readonly struct?: IResolvable | SomeStruct;
}

function takes(props: MyProps) {
}
/// !show

takes({
  struct: {
    enabled: false,
    option: 'option',
  },
});


