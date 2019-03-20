using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IExtendsPrivateInterface), "jsii-calc.ExtendsPrivateInterface")]
    internal sealed class ExtendsPrivateInterfaceProxy : DeputyBase, IExtendsPrivateInterface
    {
        private ExtendsPrivateInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("moreThings", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public string[] MoreThings
        {
            get => GetInstanceProperty<string[]>();
        }
    }
}