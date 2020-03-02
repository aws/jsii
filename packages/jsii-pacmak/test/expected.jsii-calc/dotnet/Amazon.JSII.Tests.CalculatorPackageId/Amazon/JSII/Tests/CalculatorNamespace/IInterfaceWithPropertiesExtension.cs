using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IInterfaceWithPropertiesExtension), fullyQualifiedName: "jsii-calc.IInterfaceWithPropertiesExtension")]
    public interface IInterfaceWithPropertiesExtension : Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithProperties
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
