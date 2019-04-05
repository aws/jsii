using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiTypeProxy(typeof(IBaseProps), "@scope/jsii-calc-base.BaseProps")]
    internal sealed class BasePropsProxy : DeputyBase, IBaseProps
    {
        private BasePropsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("bar", "{\"type\":{\"primitive\":\"string\"}}")]
        public string Bar
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("foo", "{\"type\":{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}}")]
        public Very Foo
        {
            get => GetInstanceProperty<Very>();
        }
    }
}