using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IOptionalStruct), fullyQualifiedName: "jsii-calc.compliance.OptionalStruct")]
    internal sealed class OptionalStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IOptionalStruct
    {
        private OptionalStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "field", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? Field
        {
            get => GetInstanceProperty<string?>();
        }
    }
}
