using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IExtendsInternalInterface), "jsii-calc.ExtendsInternalInterface")]
    public interface IExtendsInternalInterface
    {
        [JsiiProperty("boom", "{\"type\":{\"primitive\":\"boolean\"}}")]
        bool Boom
        {
            get;
        }

        [JsiiProperty("prop", "{\"type\":{\"primitive\":\"string\"}}")]
        string Prop
        {
            get;
        }
    }
}