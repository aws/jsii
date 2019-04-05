using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
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

        [JsiiMethod("test", "{\"type\":{\"primitive\":\"number\"}}", "[{\"name\":\"obj\",\"value\":{\"type\":{\"fqn\":\"jsii-calc.IReturnsNumber\"}}}]")]
        public virtual double Test(IIReturnsNumber obj)
        {
            return InvokeInstanceMethod<double>(new object[]{obj});
        }
    }
}