using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    public class EraseUndefinedHashValuesOptions : DeputyBase, IEraseUndefinedHashValuesOptions
    {
        [JsiiProperty("option1", "{\"primitive\":\"string\",\"optional\":true}", true)]
        public string Option1
        {
            get;
            set;
        }

        [JsiiProperty("option2", "{\"primitive\":\"string\",\"optional\":true}", true)]
        public string Option2
        {
            get;
            set;
        }
    }
}