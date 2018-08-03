using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.BaseOfBase;

namespace Amazon.JSII.Tests.Calculator.Base
{
    [JsiiInterfaceProxy(typeof(IBaseProps), "@scope/jsii-calc-base.BaseProps")]
    internal class BasePropsProxy : DeputyBase, IBaseProps
    {
        private BasePropsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("bar", "{\"primitive\":\"string\"}")]
        public virtual string Bar
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("foo", "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}")]
        public virtual Very Foo
        {
            get => GetInstanceProperty<Very>();
            set => SetInstanceProperty(value);
        }
    }
}