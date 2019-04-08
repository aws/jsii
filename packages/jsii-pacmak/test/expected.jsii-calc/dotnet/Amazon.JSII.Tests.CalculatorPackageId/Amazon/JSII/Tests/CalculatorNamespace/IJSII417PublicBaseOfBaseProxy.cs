using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIJSII417PublicBaseOfBase), "jsii-calc.IJSII417PublicBaseOfBase")]
    internal sealed class IJSII417PublicBaseOfBaseProxy : DeputyBase, IIJSII417PublicBaseOfBase
    {
        private IJSII417PublicBaseOfBaseProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("hasRoot", "{\"primitive\":\"boolean\"}")]
        public bool HasRoot
        {
            get => GetInstanceProperty<bool>();
        }

        [JsiiMethod("foo", null, "[]")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}