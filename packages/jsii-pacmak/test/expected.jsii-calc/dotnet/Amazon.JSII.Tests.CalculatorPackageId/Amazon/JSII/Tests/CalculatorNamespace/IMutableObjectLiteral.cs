using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IMutableObjectLiteral), "jsii-calc.MutableObjectLiteral")]
    public interface IMutableObjectLiteral
    {
        [JsiiProperty("value", "{\"primitive\":\"string\"}")]
        string Value
        {
            get;
            set;
        }
    }
}