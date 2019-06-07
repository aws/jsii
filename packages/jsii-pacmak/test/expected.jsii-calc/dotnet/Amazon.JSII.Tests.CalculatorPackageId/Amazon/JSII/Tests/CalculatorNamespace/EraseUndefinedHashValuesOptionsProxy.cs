using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IEraseUndefinedHashValuesOptions), fullyQualifiedName: "jsii-calc.EraseUndefinedHashValuesOptions")]
    internal sealed class EraseUndefinedHashValuesOptionsProxy : DeputyBase, IEraseUndefinedHashValuesOptions
    {
        private EraseUndefinedHashValuesOptionsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "option1", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Option1
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "option2", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Option2
        {
            get => GetInstanceProperty<string>();
        }
    }
}
