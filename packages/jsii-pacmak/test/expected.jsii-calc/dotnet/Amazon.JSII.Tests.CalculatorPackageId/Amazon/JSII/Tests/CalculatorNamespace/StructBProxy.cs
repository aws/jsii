using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This intentionally overlaps with StructA (where only requiredString is provided) to test htat the kernel properly disambiguates those.</summary>
    [JsiiTypeProxy(nativeType: typeof(IStructB), fullyQualifiedName: "jsii-calc.StructB")]
    internal sealed class StructBProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IStructB
    {
        private StructBProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "requiredString", typeJson: "{\"primitive\":\"string\"}")]
        public string RequiredString
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiOptional]
        [JsiiProperty(name: "optionalBoolean", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        public bool? OptionalBoolean
        {
            get => GetInstanceProperty<bool?>();
        }

        [JsiiOptional]
        [JsiiProperty(name: "optionalStructA", typeJson: "{\"fqn\":\"jsii-calc.StructA\"}", isOptional: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.IStructA? OptionalStructA
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IStructA?>();
        }
    }
}
