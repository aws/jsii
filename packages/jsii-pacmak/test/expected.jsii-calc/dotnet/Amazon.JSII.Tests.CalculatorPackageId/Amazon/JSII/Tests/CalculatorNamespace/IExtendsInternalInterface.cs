using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IExtendsInternalInterface), "jsii-calc.ExtendsInternalInterface")]
    public interface IExtendsInternalInterface
    {
        [JsiiProperty("boom", "{\"primitive\":\"boolean\"}")]
        bool Boom
        {
            get;
        }

        [JsiiProperty("prop", "{\"primitive\":\"string\"}")]
        string Prop
        {
            get;
        }
    }
}