using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations
{
    /// <remarks>
    /// <strong>Stability</strong>: Stable
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStableStruct), fullyQualifiedName: "jsii-calc.stability_annotations.StableStruct")]
    internal sealed class StableStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations.IStableStruct
    {
        private StableStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
