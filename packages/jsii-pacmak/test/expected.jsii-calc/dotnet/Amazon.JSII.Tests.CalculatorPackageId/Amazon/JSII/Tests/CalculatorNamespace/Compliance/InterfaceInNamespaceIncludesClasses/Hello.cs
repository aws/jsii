using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceInNamespaceIncludesClasses
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.InterfaceInNamespaceIncludesClasses.Hello")]
    public class Hello : Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceInNamespaceIncludesClasses.IHello
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
