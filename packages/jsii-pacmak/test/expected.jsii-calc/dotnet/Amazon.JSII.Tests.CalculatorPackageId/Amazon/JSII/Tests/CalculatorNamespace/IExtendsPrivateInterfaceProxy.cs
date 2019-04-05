using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIExtendsPrivateInterface), "jsii-calc.IExtendsPrivateInterface")]
    internal sealed class IExtendsPrivateInterfaceProxy : DeputyBase, IIExtendsPrivateInterface
    {
        private IExtendsPrivateInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("moreThings", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}}}")]
        public string[] MoreThings
        {
            get => GetInstanceProperty<string[]>();
        }

        [JsiiProperty("private", "{\"type\":{\"primitive\":\"string\"}}")]
        public string Private
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}