using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.Thrower", "[]")]
    public class Thrower : DeputyBase
    {
        public Thrower(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Thrower(ByRefValue reference): base(reference)
        {
        }

        protected Thrower(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("throwError", null, "[]")]
        public virtual void ThrowError()
        {
            InvokeVoidMethod(new object[]{});
        }
    }
}