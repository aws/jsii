using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>This intentionally overlaps with StructA (where only requiredString is provided) to test htat the kernel properly disambiguates those.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStructB), fullyQualifiedName: "jsii-calc.compliance.StructB")]
    internal sealed class StructBProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructB
    {
        private StructBProxy(ByRefValue reference): base(reference)
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
        [JsiiProperty(name: "optionalBoolean", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        public bool? OptionalBoolean
        {
            get => GetInstanceProperty<bool?>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalStructA", typeJson: "{\"fqn\":\"jsii-calc.compliance.StructA\"}", isOptional: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructA? OptionalStructA
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructA?>();
        }
    }
}
