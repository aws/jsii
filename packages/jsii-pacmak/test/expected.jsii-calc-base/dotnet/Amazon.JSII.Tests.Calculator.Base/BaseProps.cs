using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.BaseOfBase;

namespace Amazon.JSII.Tests.Calculator.Base
{
    public class BaseProps : DeputyBase, IBaseProps
    {
        [JsiiProperty("bar", "{\"primitive\":\"string\"}", true)]
        public string Bar
        {
            get;
            set;
        }

        [JsiiProperty("foo", "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}", true)]
        public Very Foo
        {
            get;
            set;
        }
    }
}