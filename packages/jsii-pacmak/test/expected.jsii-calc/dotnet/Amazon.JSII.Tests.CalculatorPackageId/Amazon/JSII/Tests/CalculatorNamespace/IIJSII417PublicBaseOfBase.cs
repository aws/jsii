using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIJSII417PublicBaseOfBase), "jsii-calc.IJSII417PublicBaseOfBase")]
    public interface IIJSII417PublicBaseOfBase
    {
        [JsiiProperty(name: "hasRoot", typeJson: "{\"primitive\":\"boolean\"}")]
        bool HasRoot
        {
            get;
        }

        [JsiiMethod(name: "foo", returnsJson: null, parametersJson: "[]")]
        void Foo();
    }
}