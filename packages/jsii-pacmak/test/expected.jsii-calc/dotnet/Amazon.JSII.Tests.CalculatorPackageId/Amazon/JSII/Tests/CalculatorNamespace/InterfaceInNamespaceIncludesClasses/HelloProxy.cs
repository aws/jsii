using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses
{
    [JsiiTypeProxy(nativeType: typeof(IHello), fullyQualifiedName: "jsii-calc.InterfaceInNamespaceIncludesClasses.Hello")]
    internal sealed class HelloProxy : DeputyBase, IHello
    {
        private HelloProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        public double Foo
        {
            get => GetInstanceProperty<double>();
        }
    }
}
