using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IConfusingToJacksonStruct), fullyQualifiedName: "jsii-calc.compliance.ConfusingToJacksonStruct")]
    internal sealed class ConfusingToJacksonStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IConfusingToJacksonStruct
    {
        private ConfusingToJacksonStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.compliance.AbstractClass\"},{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}]}},\"kind\":\"array\"}}]}}", isOptional: true)]
        public object? UnionProperty
        {
            get => GetInstanceProperty<object?>();
        }
    }
}
