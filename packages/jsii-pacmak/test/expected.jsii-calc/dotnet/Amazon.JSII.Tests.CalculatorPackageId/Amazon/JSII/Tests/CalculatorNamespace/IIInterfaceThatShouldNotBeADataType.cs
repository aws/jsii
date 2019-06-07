using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.</summary>
    [JsiiInterface(nativeType: typeof(IIInterfaceThatShouldNotBeADataType), fullyQualifiedName: "jsii-calc.IInterfaceThatShouldNotBeADataType")]
    public interface IIInterfaceThatShouldNotBeADataType : IIInterfaceWithMethods
    {
        [JsiiProperty(name: "otherValue", typeJson: "{\"primitive\":\"string\"}")]
        string OtherValue
        {
            get;
        }
    }
}
