using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IInterfaceWithPropertiesExtension), fullyQualifiedName: "jsii-calc.compliance.IInterfaceWithPropertiesExtension")]
    public interface IInterfaceWithPropertiesExtension : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IInterfaceWithProperties
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        double Foo
        {
            get;
            set;
        }
    }
}
