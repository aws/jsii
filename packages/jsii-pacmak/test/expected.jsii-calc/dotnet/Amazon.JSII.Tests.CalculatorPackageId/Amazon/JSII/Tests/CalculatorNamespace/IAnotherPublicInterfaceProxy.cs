using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IAnotherPublicInterface), fullyQualifiedName: "jsii-calc.IAnotherPublicInterface")]
    internal sealed class IAnotherPublicInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IAnotherPublicInterface
    {
        private IAnotherPublicInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        public string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
