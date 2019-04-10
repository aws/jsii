using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIJSII417PublicBaseOfBase), fullyQualifiedName: "jsii-calc.IJSII417PublicBaseOfBase")]
    public interface IIJSII417PublicBaseOfBase
    {
        [JsiiProperty(name: "hasRoot", typeJson: "{\"primitive\":\"boolean\"}")]
        bool HasRoot
        {
            get;
        }

        [JsiiMethod(name: "foo")]
        void Foo();
    }
}