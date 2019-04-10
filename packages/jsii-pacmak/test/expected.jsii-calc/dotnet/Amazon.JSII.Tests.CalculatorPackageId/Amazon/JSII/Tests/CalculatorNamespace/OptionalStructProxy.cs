using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IOptionalStruct), "jsii-calc.OptionalStruct")]
    internal sealed class OptionalStructProxy : DeputyBase, IOptionalStruct
    {
        private OptionalStructProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "field", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Field
        {
            get => GetInstanceProperty<string>();
        }
    }
}