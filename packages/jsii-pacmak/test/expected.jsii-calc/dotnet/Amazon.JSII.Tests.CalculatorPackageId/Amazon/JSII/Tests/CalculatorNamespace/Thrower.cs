using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Thrower), fullyQualifiedName: "jsii-calc.Thrower")]
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

        [JsiiMethod(name: "throwError")]
        public virtual void ThrowError()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
