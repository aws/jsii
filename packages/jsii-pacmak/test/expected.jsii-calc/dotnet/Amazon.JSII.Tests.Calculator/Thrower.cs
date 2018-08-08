using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiClass(typeof(Thrower), "jsii-calc.Thrower", "[]")]
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
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}