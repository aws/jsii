using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IExtendsInternalInterface), "jsii-calc.ExtendsInternalInterface")]
    internal sealed class ExtendsInternalInterfaceProxy : DeputyBase, IExtendsInternalInterface
    {
        private ExtendsInternalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("boom", "{\"primitive\":\"boolean\"}")]
        public bool Boom
        {
            get => GetInstanceProperty<bool>();
        }
    }
}