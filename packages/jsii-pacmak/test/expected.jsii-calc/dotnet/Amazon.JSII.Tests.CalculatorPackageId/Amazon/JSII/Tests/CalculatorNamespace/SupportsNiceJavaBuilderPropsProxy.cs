using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(ISupportsNiceJavaBuilderProps), fullyQualifiedName: "jsii-calc.SupportsNiceJavaBuilderProps")]
    internal sealed class SupportsNiceJavaBuilderPropsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.ISupportsNiceJavaBuilderProps
    {
        private SupportsNiceJavaBuilderPropsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Some number, like 42.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"number\"}")]
        public double Bar
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.</summary>
        /// <remarks>
        /// But here we are, doing it like we didn't care.
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "id", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Id
        {
            get => GetInstanceProperty<string>();
        }
    }
}
