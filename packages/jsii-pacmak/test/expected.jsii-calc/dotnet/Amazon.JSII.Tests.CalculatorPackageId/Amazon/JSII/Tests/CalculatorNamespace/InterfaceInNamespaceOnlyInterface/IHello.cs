using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface
{
    [JsiiInterface(nativeType: typeof(IHello), fullyQualifiedName: "jsii-calc.InterfaceInNamespaceOnlyInterface.Hello")]
    public interface IHello
    {
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        double Foo
        {
            get;
        }
    }
}