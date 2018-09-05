using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses
{
    [JsiiInterfaceProxy(typeof(IHello), "jsii-calc.InterfaceInNamespaceIncludesClasses.Hello")]
    internal class HelloProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses.IHello
    {
        private HelloProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("foo", "{\"primitive\":\"number\"}")]
        public virtual double Foo
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }
    }
}