/// fake-from-jsii
interface BaseDeeperStruct {
  a: number;
}

interface DeeperStruct extends BaseDeeperStruct {
  b: number;
}

interface OuterStruct {
  foo: number;
  deeper: DeeperStruct;
}

function foo(x: number, outer: OuterStruct) { }

foo(25, { foo: 3, deeper: {
  a: 1,
  b: 2
});
