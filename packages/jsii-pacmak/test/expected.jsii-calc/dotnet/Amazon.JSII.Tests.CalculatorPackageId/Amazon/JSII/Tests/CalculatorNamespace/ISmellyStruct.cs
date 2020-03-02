using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(ISmellyStruct), fullyQualifiedName: "jsii-calc.SmellyStruct")]
    public interface ISmellyStruct
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
        [JsiiProperty(name: "yetAnoterOne", typeJson: "{\"primitive\":\"boolean\"}")]
        bool YetAnoterOne
        {
            get;
        }
    }
}
