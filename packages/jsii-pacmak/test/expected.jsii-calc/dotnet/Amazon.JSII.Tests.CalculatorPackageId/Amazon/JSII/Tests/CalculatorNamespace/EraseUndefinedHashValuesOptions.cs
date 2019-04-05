using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class EraseUndefinedHashValuesOptions : IEraseUndefinedHashValuesOptions
    {
        [JsiiProperty("option1", "{\"type\":{\"primitive\":\"string\"},\"optional\":true}", true)]
        public string Option1
        {
            get;
            set;
        }

        [JsiiProperty("option2", "{\"type\":{\"primitive\":\"string\"},\"optional\":true}", true)]
        public string Option2
        {
            get;
            set;
        }
    }
}