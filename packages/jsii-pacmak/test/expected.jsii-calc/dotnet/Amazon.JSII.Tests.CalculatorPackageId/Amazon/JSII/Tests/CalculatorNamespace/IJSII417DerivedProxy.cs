using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiTypeProxy(nativeType: typeof(IIJSII417Derived), fullyQualifiedName: "jsii-calc.IJSII417Derived")]
    internal sealed class IJSII417DerivedProxy : DeputyBase, IIJSII417Derived
    {
        private IJSII417DerivedProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        public string Property
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "hasRoot", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool HasRoot
        {
            get => GetInstanceProperty<bool>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "bar")]
        public void Bar()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "baz")]
        public void Baz()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}