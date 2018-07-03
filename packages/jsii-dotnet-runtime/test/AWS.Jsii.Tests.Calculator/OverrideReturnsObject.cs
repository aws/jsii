using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.OverrideReturnsObject", "[]")]
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

        [JsiiMethod("test", "{\"primitive\":\"number\"}", "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii$jsii_calc$.ReturnsNumber\"}}]")]
        public virtual double Test(IReturnsNumber obj)
        {
            return InvokeMethod<double>(new object[]{obj});
        }
    }
}