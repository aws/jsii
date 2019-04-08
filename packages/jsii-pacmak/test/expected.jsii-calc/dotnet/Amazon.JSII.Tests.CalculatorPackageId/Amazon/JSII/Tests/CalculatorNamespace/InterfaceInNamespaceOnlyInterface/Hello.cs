using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface
{
    [JsiiByValue]
    public class Hello : Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface.IHello
    {
        [JsiiProperty("foo", "{\"primitive\":\"number\"}", true)]
        public double Foo
        {
            get;
            set;
        }
    }
}