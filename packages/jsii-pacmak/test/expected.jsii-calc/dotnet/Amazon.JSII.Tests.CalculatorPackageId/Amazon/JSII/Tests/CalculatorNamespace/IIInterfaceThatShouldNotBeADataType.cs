using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIInterfaceThatShouldNotBeADataType), fullyQualifiedName: "jsii-calc.IInterfaceThatShouldNotBeADataType")]
    public interface IIInterfaceThatShouldNotBeADataType : Amazon.JSII.Tests.CalculatorNamespace.IIInterfaceWithMethods
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "otherValue", typeJson: "{\"primitive\":\"string\"}")]
        string OtherValue
        {
            get;
        }
    }
}
