using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(AugmentableClass), "jsii-calc.AugmentableClass", "[]")]
    public class AugmentableClass : DeputyBase
    {
        public AugmentableClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AugmentableClass(ByRefValue reference): base(reference)
        {
        }

        protected AugmentableClass(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("methodOne", null, "[]")]
        public virtual void MethodOne()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod("methodTwo", null, "[]")]
        public virtual void MethodTwo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}