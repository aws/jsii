using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIMutableObjectLiteral), "jsii-calc.IMutableObjectLiteral")]
    public interface IIMutableObjectLiteral
    {
        [JsiiProperty("value", "{\"primitive\":\"string\"}")]
        string Value
        {
            get;
            set;
        }
    }
}