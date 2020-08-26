using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IJSII417PublicBaseOfBase), fullyQualifiedName: "jsii-calc.IJSII417PublicBaseOfBase")]
    internal sealed class IJSII417PublicBaseOfBaseProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IJSII417PublicBaseOfBase
    {
        private IJSII417PublicBaseOfBaseProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "hasRoot", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool HasRoot
        {
            get => GetInstanceProperty<bool>();
        }

        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
