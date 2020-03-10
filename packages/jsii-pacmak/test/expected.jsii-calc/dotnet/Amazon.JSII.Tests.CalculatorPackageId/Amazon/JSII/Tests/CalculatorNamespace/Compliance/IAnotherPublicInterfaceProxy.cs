using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IAnotherPublicInterface), fullyQualifiedName: "jsii-calc.compliance.IAnotherPublicInterface")]
    internal sealed class IAnotherPublicInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnotherPublicInterface
    {
        private IAnotherPublicInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        public string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
