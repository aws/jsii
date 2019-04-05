using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIInterfaceWithMethods), "jsii-calc.IInterfaceWithMethods")]
    public interface IIInterfaceWithMethods
    {
        [JsiiProperty("value", "{\"type\":{\"primitive\":\"string\"}}")]
        string Value
        {
            get;
        }

        [JsiiMethod("doThings", null, "[]")]
        void DoThings();
    }
}