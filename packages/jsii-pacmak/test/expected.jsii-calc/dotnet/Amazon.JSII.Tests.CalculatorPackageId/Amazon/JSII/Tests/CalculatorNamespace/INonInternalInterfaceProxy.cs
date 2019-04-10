using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IINonInternalInterface), fullyQualifiedName: "jsii-calc.INonInternalInterface")]
    internal sealed class INonInternalInterfaceProxy : DeputyBase, IINonInternalInterface
    {
        private INonInternalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "b", typeJson: "{\"primitive\":\"string\"}")]
        public string B
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "c", typeJson: "{\"primitive\":\"string\"}")]
        public string C
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        public string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}