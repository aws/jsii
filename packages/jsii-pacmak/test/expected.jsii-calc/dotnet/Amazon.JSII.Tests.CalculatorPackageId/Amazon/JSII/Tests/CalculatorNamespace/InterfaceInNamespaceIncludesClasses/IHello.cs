using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses
{
    [JsiiInterface(typeof(IHello), "jsii-calc.InterfaceInNamespaceIncludesClasses.Hello")]
    public interface IHello
    {
        [JsiiProperty("foo", "{\"type\":{\"primitive\":\"number\"}}")]
        double Foo
        {
            get;
        }
    }
}