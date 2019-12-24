using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IInterfaceThatShouldNotBeADataType), fullyQualifiedName: "jsii-calc.IInterfaceThatShouldNotBeADataType")]
    public interface IInterfaceThatShouldNotBeADataType : Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithMethods
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "otherValue", typeJson: "{\"primitive\":\"string\"}")]
        string OtherValue
        {
            get;
        }
    }
}
