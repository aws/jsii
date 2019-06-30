using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiTypeProxy(nativeType: typeof(IOptionalStruct), fullyQualifiedName: "jsii-calc.OptionalStruct")]
    internal sealed class OptionalStructProxy : DeputyBase, IOptionalStruct
    {
        private OptionalStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "field", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Field
        {
            get => GetInstanceProperty<string>();
        }
    }
}