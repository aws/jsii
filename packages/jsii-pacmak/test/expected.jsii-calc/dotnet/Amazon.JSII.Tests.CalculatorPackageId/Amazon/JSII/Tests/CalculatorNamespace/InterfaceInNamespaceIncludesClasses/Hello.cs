using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses
{
    public class Hello : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses.IHello
    {
        [JsiiProperty("foo", "{\"primitive\":\"number\"}", true)]
        public double Foo
        {
            get;
            set;
        }
    }
}