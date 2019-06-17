using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIJSII417Derived), fullyQualifiedName: "jsii-calc.IJSII417Derived")]
    public interface IIJSII417Derived : IIJSII417PublicBaseOfBase
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
        }
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "bar")]
        void Bar();
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "baz")]
        void Baz();
    }
}
