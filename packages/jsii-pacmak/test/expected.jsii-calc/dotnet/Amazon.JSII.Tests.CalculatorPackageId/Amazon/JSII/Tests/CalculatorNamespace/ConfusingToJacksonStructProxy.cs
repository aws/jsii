using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IConfusingToJacksonStruct), fullyQualifiedName: "jsii-calc.ConfusingToJacksonStruct")]
    internal sealed class ConfusingToJacksonStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IConfusingToJacksonStruct
    {
        private ConfusingToJacksonStructProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiOptional]
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"fqn\":\"jsii-calc.AbstractClass\"}]}},\"kind\":\"array\"}}]}}", isOptional: true)]
        public object? UnionProperty
        {
            get => GetInstanceProperty<object?>();
        }
    }
}
