using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIJSII417Derived), fullyQualifiedName: "jsii-calc.IJSII417Derived")]
    public interface IIJSII417Derived : IIJSII417PublicBaseOfBase
    {
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
        }
        [JsiiMethod(name: "bar")]
        void Bar();
        [JsiiMethod(name: "baz")]
        void Baz();
    }
}
