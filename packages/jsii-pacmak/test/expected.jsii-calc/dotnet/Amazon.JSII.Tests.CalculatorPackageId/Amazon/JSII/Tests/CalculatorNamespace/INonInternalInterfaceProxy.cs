using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IINonInternalInterface), "jsii-calc.INonInternalInterface")]
    internal sealed class INonInternalInterfaceProxy : DeputyBase, IINonInternalInterface
    {
        private INonInternalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("c", "{\"primitive\":\"string\"}")]
        public string C
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("a", "{\"primitive\":\"string\"}")]
        public string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}