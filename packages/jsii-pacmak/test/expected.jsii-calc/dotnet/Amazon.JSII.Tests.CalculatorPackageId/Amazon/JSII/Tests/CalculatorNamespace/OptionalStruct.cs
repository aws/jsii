using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class OptionalStruct : IOptionalStruct
    {
        [JsiiProperty("field", "{\"primitive\":\"string\",\"nullable\":true}", true)]
        public string Field
        {
            get;
            set;
        }
    }
}