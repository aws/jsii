using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIInterfaceWithInternal), "jsii-calc.IInterfaceWithInternal")]
    public interface IIInterfaceWithInternal
    {
        [JsiiMethod("visible", null, "[]")]
        void Visible();
    }
}