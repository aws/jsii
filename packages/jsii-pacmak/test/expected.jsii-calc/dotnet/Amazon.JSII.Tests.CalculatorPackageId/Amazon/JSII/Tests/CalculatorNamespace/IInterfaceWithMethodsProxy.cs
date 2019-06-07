using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IIInterfaceWithMethods), fullyQualifiedName: "jsii-calc.IInterfaceWithMethods")]
    internal sealed class IInterfaceWithMethodsProxy : DeputyBase, IIInterfaceWithMethods
    {
        private IInterfaceWithMethodsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        public string Value
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiMethod(name: "doThings")]
        public void DoThings()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
