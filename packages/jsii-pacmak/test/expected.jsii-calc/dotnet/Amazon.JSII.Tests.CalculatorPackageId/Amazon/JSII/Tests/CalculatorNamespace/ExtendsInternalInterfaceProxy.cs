using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IExtendsInternalInterface), "jsii-calc.ExtendsInternalInterface")]
    internal sealed class ExtendsInternalInterfaceProxy : DeputyBase, IExtendsInternalInterface
    {
        private ExtendsInternalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("boom", "{\"type\":{\"primitive\":\"boolean\"}}")]
        public bool Boom
        {
            get => GetInstanceProperty<bool>();
        }

        [JsiiProperty("prop", "{\"type\":{\"primitive\":\"string\"}}")]
        public string Prop
        {
            get => GetInstanceProperty<string>();
        }
    }
}