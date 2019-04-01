using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class OptionalStruct : IOptionalStruct
    {
        [JsiiProperty("field", "{\"primitive\":\"string\",\"optional\":true}", true)]
        public string Field
        {
            get;
            set;
        }
    }
}