using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Make sure that setters are properly called on objects with interfaces.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IObjectWithProperty), fullyQualifiedName: "jsii-calc.IObjectWithProperty")]
    public interface IObjectWithProperty
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
            set;
        }
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "wasSet", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}")]
        bool WasSet();
    }
}
