using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIInterfaceWithInternal), "jsii-calc.IInterfaceWithInternal")]
    public interface IIInterfaceWithInternal
    {
        [JsiiMethod(name: "visible", returnsJson: null, parametersJson: "[]")]
        void Visible();
    }
}