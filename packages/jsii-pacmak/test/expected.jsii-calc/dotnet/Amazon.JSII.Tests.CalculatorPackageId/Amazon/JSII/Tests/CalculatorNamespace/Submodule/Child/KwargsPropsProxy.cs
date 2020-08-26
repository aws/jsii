using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    [JsiiTypeProxy(nativeType: typeof(IKwargsProps), fullyQualifiedName: "jsii-calc.submodule.child.KwargsProps")]
    internal sealed class KwargsPropsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.IKwargsProps
    {
        private KwargsPropsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiOptional]
        [JsiiProperty(name: "extra", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? Extra
        {
            get => GetInstanceProperty<string?>();
        }

        [JsiiProperty(name: "prop", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.SomeEnum\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.SomeEnum Prop
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.SomeEnum>();
        }
    }
}
