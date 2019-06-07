using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IIJSII417Derived), fullyQualifiedName: "jsii-calc.IJSII417Derived")]
    internal sealed class IJSII417DerivedProxy : DeputyBase, IIJSII417Derived
    {
        private IJSII417DerivedProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        public string Property
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "hasRoot", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool HasRoot
        {
            get => GetInstanceProperty<bool>();
        }

        [JsiiMethod(name: "bar")]
        public void Bar()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "baz")]
        public void Baz()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
