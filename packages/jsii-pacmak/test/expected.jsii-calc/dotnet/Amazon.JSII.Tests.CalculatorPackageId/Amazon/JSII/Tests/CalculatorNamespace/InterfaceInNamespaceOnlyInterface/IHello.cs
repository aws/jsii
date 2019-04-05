using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface
{
    [JsiiInterface(typeof(IHello), "jsii-calc.InterfaceInNamespaceOnlyInterface.Hello")]
    public interface IHello
    {
        [JsiiProperty("foo", "{\"type\":{\"primitive\":\"number\"}}")]
        double Foo
        {
            get;
        }
    }
}