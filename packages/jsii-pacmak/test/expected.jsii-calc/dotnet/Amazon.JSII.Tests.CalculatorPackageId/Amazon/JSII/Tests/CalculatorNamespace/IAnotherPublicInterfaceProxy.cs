using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiTypeProxy(nativeType: typeof(IIAnotherPublicInterface), fullyQualifiedName: "jsii-calc.IAnotherPublicInterface")]
    internal sealed class IAnotherPublicInterfaceProxy : DeputyBase, IIAnotherPublicInterface
    {
        private IAnotherPublicInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        public string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}