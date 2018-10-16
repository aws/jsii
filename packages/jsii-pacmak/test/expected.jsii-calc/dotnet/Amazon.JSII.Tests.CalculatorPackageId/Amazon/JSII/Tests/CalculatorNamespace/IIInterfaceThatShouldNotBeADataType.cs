using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>
    /// Even though this interface has only properties, it is disqualified from being a datatype
    /// because it inherits from an interface that is not a datatype.
    /// </summary>
    [JsiiInterface(typeof(IIInterfaceThatShouldNotBeADataType), "jsii-calc.IInterfaceThatShouldNotBeADataType")]
    public interface IIInterfaceThatShouldNotBeADataType : IIInterfaceWithMethods
    {
        [JsiiProperty("otherValue", "{\"primitive\":\"string\"}")]
        string OtherValue
        {
            get;
        }
    }
}