using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Make sure that setters are properly called on objects with interfaces.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IObjectWithProperty), fullyQualifiedName: "jsii-calc.compliance.IObjectWithProperty")]
    public interface IObjectWithProperty
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
            set;
        }
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "wasSet", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}")]
        bool WasSet();
    }
}
