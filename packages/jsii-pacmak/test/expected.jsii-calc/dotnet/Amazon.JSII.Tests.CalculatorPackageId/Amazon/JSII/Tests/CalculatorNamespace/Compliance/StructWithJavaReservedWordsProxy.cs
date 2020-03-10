using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStructWithJavaReservedWords), fullyQualifiedName: "jsii-calc.compliance.StructWithJavaReservedWords")]
    internal sealed class StructWithJavaReservedWordsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructWithJavaReservedWords
    {
        private StructWithJavaReservedWordsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "default", typeJson: "{\"primitive\":\"string\"}")]
        public string Default
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "assert", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? Assert
        {
            get => GetInstanceProperty<string?>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "result", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? Result
        {
            get => GetInstanceProperty<string?>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "that", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? That
        {
            get => GetInstanceProperty<string?>();
        }
    }
}
