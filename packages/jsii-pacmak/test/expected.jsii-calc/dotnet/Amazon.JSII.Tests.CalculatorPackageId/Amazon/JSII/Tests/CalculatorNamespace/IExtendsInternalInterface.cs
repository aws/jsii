using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IExtendsInternalInterface), "jsii-calc.ExtendsInternalInterface")]
    public interface IExtendsInternalInterface
    {
        [JsiiProperty(name: "boom", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Boom
        {
            get;
        }

        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}")]
        string Prop
        {
            get;
        }
    }
}