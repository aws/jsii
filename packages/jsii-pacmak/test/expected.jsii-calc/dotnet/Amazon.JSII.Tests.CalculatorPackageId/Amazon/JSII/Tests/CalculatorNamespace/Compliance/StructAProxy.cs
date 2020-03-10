using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>We can serialize and deserialize structs without silently ignoring optional fields.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStructA), fullyQualifiedName: "jsii-calc.compliance.StructA")]
    internal sealed class StructAProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructA
    {
        private StructAProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "requiredString", typeJson: "{\"primitive\":\"string\"}")]
        public string RequiredString
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalNumber", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? OptionalNumber
        {
            get => GetInstanceProperty<double?>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalString", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? OptionalString
        {
            get => GetInstanceProperty<string?>();
        }
    }
}
