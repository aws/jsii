using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IExtendsInternalInterface), fullyQualifiedName: "jsii-calc.ExtendsInternalInterface")]
    internal sealed class ExtendsInternalInterfaceProxy : DeputyBase, IExtendsInternalInterface
    {
        private ExtendsInternalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "boom", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Boom
        {
            get => GetInstanceProperty<bool>();
        }

        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}")]
        public string Prop
        {
            get => GetInstanceProperty<string>();
        }
    }
}
