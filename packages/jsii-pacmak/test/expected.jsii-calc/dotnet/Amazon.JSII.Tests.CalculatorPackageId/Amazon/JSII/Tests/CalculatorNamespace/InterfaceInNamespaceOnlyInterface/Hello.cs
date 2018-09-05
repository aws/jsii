using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface
{
    public class Hello : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface.IHello
    {
        [JsiiProperty("foo", "{\"primitive\":\"number\"}", true)]
        public double Foo
        {
            get;
            set;
        }
    }
}