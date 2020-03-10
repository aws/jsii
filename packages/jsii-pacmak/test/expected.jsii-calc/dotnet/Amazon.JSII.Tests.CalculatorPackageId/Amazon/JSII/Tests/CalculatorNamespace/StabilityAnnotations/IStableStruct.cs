using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations
{
    /// <remarks>
    /// <strong>Stability</strong>: Stable
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStableStruct), fullyQualifiedName: "jsii-calc.stability_annotations.StableStruct")]
    public interface IStableStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        string ReadonlyProperty
        {
            get;
        }
    }
}
