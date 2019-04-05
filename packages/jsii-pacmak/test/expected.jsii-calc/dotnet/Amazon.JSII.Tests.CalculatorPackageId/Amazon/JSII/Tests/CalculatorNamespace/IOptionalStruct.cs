using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IOptionalStruct), "jsii-calc.OptionalStruct")]
    public interface IOptionalStruct
    {
        [JsiiProperty("field", "{\"type\":{\"primitive\":\"string\"},\"optional\":true}")]
        string Field
        {
            get;
        }
    }
}