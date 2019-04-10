using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IIAnotherPublicInterface), fullyQualifiedName: "jsii-calc.IAnotherPublicInterface")]
    internal sealed class IAnotherPublicInterfaceProxy : DeputyBase, IIAnotherPublicInterface
    {
        private IAnotherPublicInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        public string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}