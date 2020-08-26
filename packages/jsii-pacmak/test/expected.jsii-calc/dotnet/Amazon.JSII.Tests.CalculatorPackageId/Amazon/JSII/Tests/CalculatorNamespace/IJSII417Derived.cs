using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IJSII417Derived), fullyQualifiedName: "jsii-calc.IJSII417Derived")]
    public interface IJSII417Derived : Amazon.JSII.Tests.CalculatorNamespace.IJSII417PublicBaseOfBase
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
