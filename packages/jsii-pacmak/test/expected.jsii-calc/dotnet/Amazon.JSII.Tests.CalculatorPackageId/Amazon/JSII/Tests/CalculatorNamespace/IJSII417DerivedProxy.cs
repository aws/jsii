using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIJSII417Derived), "jsii-calc.IJSII417Derived")]
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

        [JsiiMethod(name: "bar", returnsJson: null, parametersJson: "[]")]
        public void Bar()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "baz", returnsJson: null, parametersJson: "[]")]
        public void Baz()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "foo", returnsJson: null, parametersJson: "[]")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}