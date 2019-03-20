using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IEraseUndefinedHashValuesOptions), "jsii-calc.EraseUndefinedHashValuesOptions")]
    internal sealed class EraseUndefinedHashValuesOptionsProxy : DeputyBase, IEraseUndefinedHashValuesOptions
    {
        private EraseUndefinedHashValuesOptionsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("option1", "{\"primitive\":\"string\",\"optional\":true}")]
        public string Option1
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("option2", "{\"primitive\":\"string\",\"optional\":true}")]
        public string Option2
        {
            get => GetInstanceProperty<string>();
        }
    }
}