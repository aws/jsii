using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IJSII417Derived), fullyQualifiedName: "jsii-calc.IJSII417Derived")]
    public interface IJSII417Derived : Amazon.JSII.Tests.CalculatorNamespace.IJSII417PublicBaseOfBase
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
        }
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "bar")]
        void Bar();
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "baz")]
        void Baz();
    }
}
