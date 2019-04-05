using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses
{
    [JsiiByValue]
    public class Hello : Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses.IHello
    {
        [JsiiProperty("foo", "{\"type\":{\"primitive\":\"number\"}}", true)]
        public double Foo
        {
            get;
            set;
        }
    }
}