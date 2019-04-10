using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIJSII417Derived), "jsii-calc.IJSII417Derived")]
    public interface IIJSII417Derived : IIJSII417PublicBaseOfBase
    {
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
        }

        [JsiiMethod(name: "bar", returnsJson: null, parametersJson: "[]")]
        void Bar();
        [JsiiMethod(name: "baz", returnsJson: null, parametersJson: "[]")]
        void Baz();
    }
}