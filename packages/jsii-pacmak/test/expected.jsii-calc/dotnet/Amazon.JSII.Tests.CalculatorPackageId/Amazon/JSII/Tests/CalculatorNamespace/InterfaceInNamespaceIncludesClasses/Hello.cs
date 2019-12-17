using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.InterfaceInNamespaceIncludesClasses.Hello")]
    public class Hello : Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses.IHello
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        public double Foo
        {
            get;
            set;
        }
    }
}
