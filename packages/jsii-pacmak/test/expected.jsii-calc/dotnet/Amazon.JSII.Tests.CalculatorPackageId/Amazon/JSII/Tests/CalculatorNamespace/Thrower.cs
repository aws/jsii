using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
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

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "throwError")]
        public virtual void ThrowError()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
