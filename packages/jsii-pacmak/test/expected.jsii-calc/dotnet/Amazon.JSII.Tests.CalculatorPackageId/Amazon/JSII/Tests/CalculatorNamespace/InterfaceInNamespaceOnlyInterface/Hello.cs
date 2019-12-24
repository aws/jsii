using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.InterfaceInNamespaceOnlyInterface.Hello")]
    public class Hello : Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface.IHello
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        public double Foo
        {
            get;
            set;
        }
    }
}
