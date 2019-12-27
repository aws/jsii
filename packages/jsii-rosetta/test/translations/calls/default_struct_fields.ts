interface Struct {
  x: string | undefined;
  y?: string;
}
function foo(s: Struct) {
  console.log(s.x, s.y);
}