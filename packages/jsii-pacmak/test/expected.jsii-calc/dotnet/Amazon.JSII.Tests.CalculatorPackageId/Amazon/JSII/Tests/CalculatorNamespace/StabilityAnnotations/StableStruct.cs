using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Stable
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.stability_annotations.StableStruct")]
    public class StableStruct : Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations.IStableStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string ReadonlyProperty
        {
            get;
            set;
        }
    }
}
