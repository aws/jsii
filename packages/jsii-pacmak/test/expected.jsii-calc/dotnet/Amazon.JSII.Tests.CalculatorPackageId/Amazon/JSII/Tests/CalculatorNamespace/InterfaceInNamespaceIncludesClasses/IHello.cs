using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses
{
    [JsiiInterface(nativeType: typeof(IHello), fullyQualifiedName: "jsii-calc.InterfaceInNamespaceIncludesClasses.Hello")]
    public interface IHello
    {
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        double Foo
        {
            get;
        }
    }
}
