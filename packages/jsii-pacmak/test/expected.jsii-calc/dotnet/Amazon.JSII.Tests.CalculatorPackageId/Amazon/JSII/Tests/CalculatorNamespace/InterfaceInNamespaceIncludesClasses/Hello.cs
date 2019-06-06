using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiByValue]
    public class Hello : Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses.IHello
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        public double Foo
        {
            get;
            set;
        }
    }
}