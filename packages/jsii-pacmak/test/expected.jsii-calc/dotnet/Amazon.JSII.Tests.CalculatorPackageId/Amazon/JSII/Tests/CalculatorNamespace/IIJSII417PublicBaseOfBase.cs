using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIJSII417PublicBaseOfBase), "jsii-calc.IJSII417PublicBaseOfBase")]
    public interface IIJSII417PublicBaseOfBase
    {
        [JsiiProperty("hasRoot", "{\"type\":{\"primitive\":\"boolean\"}}")]
        bool HasRoot
        {
            get;
        }

        [JsiiMethod("foo", null, "[]")]
        void Foo();
    }
}