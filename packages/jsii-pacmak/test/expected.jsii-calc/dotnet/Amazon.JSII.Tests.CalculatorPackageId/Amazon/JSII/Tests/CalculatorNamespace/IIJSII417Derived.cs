using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(IIJSII417Derived), fullyQualifiedName: "jsii-calc.IJSII417Derived")]
    public interface IIJSII417Derived : Amazon.JSII.Tests.CalculatorNamespace.IIJSII417PublicBaseOfBase
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "bar")]
        void Bar();
        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "baz")]
        void Baz();
    }
}