using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IBaseProps), fullyQualifiedName: "@scope/jsii-calc-base.BaseProps")]
    internal sealed class BasePropsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.IBaseProps
    {
        private BasePropsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}")]
        public string Bar
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very Foo
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very>();
        }
    }
}