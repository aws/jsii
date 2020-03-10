using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceInNamespaceOnlyInterface
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IHello), fullyQualifiedName: "jsii-calc.compliance.InterfaceInNamespaceOnlyInterface.Hello")]
    public interface IHello
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        double Foo
        {
            get;
        }
    }
}
