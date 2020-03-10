using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.ErasureTests
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IJSII417Derived), fullyQualifiedName: "jsii-calc.erasureTests.IJSII417Derived")]
    public interface IJSII417Derived : Amazon.JSII.Tests.CalculatorNamespace.ErasureTests.IJSII417PublicBaseOfBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
        }
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "bar")]
        void Bar();
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "baz")]
        void Baz();
    }
}
