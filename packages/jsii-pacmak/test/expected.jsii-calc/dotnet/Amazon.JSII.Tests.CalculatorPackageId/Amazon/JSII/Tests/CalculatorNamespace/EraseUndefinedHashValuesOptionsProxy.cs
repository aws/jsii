using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IEraseUndefinedHashValuesOptions), fullyQualifiedName: "jsii-calc.EraseUndefinedHashValuesOptions")]
    internal sealed class EraseUndefinedHashValuesOptionsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IEraseUndefinedHashValuesOptions
    {
        private EraseUndefinedHashValuesOptionsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "option1", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Option1
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "option2", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Option2
        {
            get => GetInstanceProperty<string>();
        }
    }
}
