using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiClass(typeof(OverrideReturnsObject), "jsii-calc.OverrideReturnsObject", "[]")]
    public class OverrideReturnsObject : DeputyBase
    {
        public OverrideReturnsObject(): base(new DeputyProps(new object[]{}))
        {
        }

        protected OverrideReturnsObject(ByRefValue reference): base(reference)
        {
        }

        protected OverrideReturnsObject(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("test", "{\"primitive\":\"number\"}", "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.ReturnsNumber\"}}]")]
        public virtual double Test(IReturnsNumber obj)
        {
            return InvokeInstanceMethod<double>(new object[]{obj});
        }
    }
}