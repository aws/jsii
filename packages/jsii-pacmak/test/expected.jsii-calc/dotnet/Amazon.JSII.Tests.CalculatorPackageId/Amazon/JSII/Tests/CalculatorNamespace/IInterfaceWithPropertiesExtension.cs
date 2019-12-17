using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IInterfaceWithPropertiesExtension), fullyQualifiedName: "jsii-calc.IInterfaceWithPropertiesExtension")]
    public interface IInterfaceWithPropertiesExtension : Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithProperties
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        double Foo
        {
            get;
            set;
        }
    }
}
