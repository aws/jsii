using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.</summary>
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIInterfaceThatShouldNotBeADataType), fullyQualifiedName: "jsii-calc.IInterfaceThatShouldNotBeADataType")]
    public interface IIInterfaceThatShouldNotBeADataType : IIInterfaceWithMethods
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "otherValue", typeJson: "{\"primitive\":\"string\"}")]
        string OtherValue
        {
            get;
        }
    }
}
