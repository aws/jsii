using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIInterfaceWithMethods), fullyQualifiedName: "jsii-calc.IInterfaceWithMethods")]
    public interface IIInterfaceWithMethods
    {
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        string Value
        {
            get;
        }
        [JsiiMethod(name: "doThings")]
        void DoThings();
    }
}
