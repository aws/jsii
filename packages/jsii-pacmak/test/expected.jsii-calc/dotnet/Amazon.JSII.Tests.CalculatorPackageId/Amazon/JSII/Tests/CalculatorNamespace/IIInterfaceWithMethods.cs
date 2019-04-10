using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIInterfaceWithMethods), "jsii-calc.IInterfaceWithMethods")]
    public interface IIInterfaceWithMethods
    {
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        string Value
        {
            get;
        }

        [JsiiMethod(name: "doThings", returnsJson: null, parametersJson: "[]")]
        void DoThings();
    }
}