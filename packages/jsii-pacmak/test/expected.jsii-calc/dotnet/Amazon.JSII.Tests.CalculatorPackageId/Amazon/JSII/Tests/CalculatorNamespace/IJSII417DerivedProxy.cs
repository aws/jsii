using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIJSII417Derived), "jsii-calc.IJSII417Derived")]
    internal sealed class IJSII417DerivedProxy : DeputyBase, IIJSII417Derived
    {
        private IJSII417DerivedProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("property", "{\"type\":{\"primitive\":\"string\"}}")]
        public string Property
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("hasRoot", "{\"type\":{\"primitive\":\"boolean\"}}")]
        public bool HasRoot
        {
            get => GetInstanceProperty<bool>();
        }

        [JsiiMethod("bar", null, "[]")]
        public void Bar()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod("baz", null, "[]")]
        public void Baz()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod("foo", null, "[]")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}