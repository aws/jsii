using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IEraseUndefinedHashValuesOptions), fullyQualifiedName: "jsii-calc.compliance.EraseUndefinedHashValuesOptions")]
    internal sealed class EraseUndefinedHashValuesOptionsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IEraseUndefinedHashValuesOptions
    {
        private EraseUndefinedHashValuesOptionsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "option1", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? Option1
        {
            get => GetInstanceProperty<string?>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "option2", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? Option2
        {
            get => GetInstanceProperty<string?>();
        }
    }
}
