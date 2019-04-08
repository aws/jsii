using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIJSII417Derived), "jsii-calc.IJSII417Derived")]
    public interface IIJSII417Derived : IIJSII417PublicBaseOfBase
    {
        [JsiiProperty("property", "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
        }

        [JsiiMethod("bar", null, "[]")]
        void Bar();
        [JsiiMethod("baz", null, "[]")]
        void Baz();
    }
}