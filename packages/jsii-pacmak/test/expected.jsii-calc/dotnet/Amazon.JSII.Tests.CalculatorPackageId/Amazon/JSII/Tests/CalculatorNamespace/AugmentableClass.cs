using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(AugmentableClass), fullyQualifiedName: "jsii-calc.AugmentableClass")]
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

        [JsiiMethod(name: "methodOne")]
        public virtual void MethodOne()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "methodTwo")]
        public virtual void MethodTwo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
