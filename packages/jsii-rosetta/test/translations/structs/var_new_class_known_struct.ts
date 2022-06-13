/// !hide
/// fake-from-jsii
class Vpc {
  constructor(_something: any, id: string, props: VpcProps) { }
}
interface VpcProps { readonly argument: number }
/// !show
const vpc = new Vpc(this, "Something", {
  argument: 5
});