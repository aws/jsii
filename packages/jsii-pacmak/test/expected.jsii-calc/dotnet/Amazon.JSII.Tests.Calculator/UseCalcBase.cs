using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.Base;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiClass(typeof(UseCalcBase), "jsii-calc.UseCalcBase", "[]")]
    public class UseCalcBase : DeputyBase
    {
        public UseCalcBase(): base(new DeputyProps(new object[]{}))
        {
        }

        protected UseCalcBase(ByRefValue reference): base(reference)
        {
        }

        protected UseCalcBase(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("hello", "{\"fqn\":\"@scope/jsii-calc-base.Base\"}", "[]")]
        public virtual Base_ Hello()
        {
            return InvokeInstanceMethod<Base_>(new object[]{});
        }
    }
}