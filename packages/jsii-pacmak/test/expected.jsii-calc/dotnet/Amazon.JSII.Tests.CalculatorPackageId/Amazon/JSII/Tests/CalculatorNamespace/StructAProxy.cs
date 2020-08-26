using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can serialize and deserialize structs without silently ignoring optional fields.</summary>
    [JsiiTypeProxy(nativeType: typeof(IStructA), fullyQualifiedName: "jsii-calc.StructA")]
    internal sealed class StructAProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IStructA
    {
        private StructAProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "requiredString", typeJson: "{\"primitive\":\"string\"}")]
        public string RequiredString
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiOptional]
        [JsiiProperty(name: "optionalNumber", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? OptionalNumber
        {
            get => GetInstanceProperty<double?>();
        }

        [JsiiOptional]
        [JsiiProperty(name: "optionalString", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? OptionalString
        {
            get => GetInstanceProperty<string?>();
        }
    }
}
