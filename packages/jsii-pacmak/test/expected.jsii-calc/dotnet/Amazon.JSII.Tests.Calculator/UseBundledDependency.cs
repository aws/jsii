using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiClass(typeof(UseBundledDependency), "jsii-calc.UseBundledDependency", "[]")]
    public class UseBundledDependency : DeputyBase
    {
        public UseBundledDependency(): base(new DeputyProps(new object[]{}))
        {
        }

        protected UseBundledDependency(ByRefValue reference): base(reference)
        {
        }

        protected UseBundledDependency(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("value", "{\"primitive\":\"any\"}", "[]")]
        public virtual object Value()
        {
            return InvokeInstanceMethod<object>(new object[]{});
        }
    }
}