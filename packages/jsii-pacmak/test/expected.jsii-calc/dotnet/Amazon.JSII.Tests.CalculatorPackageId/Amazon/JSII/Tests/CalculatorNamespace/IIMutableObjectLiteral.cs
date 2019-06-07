using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIMutableObjectLiteral), fullyQualifiedName: "jsii-calc.IMutableObjectLiteral")]
    public interface IIMutableObjectLiteral
    {
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        string Value
        {
            get;
            set;
        }
    }
}
