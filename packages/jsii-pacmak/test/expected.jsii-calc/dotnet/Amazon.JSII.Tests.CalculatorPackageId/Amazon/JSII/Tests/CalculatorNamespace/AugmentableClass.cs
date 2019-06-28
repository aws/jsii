using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
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

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "methodOne")]
        public virtual void MethodOne()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "methodTwo")]
        public virtual void MethodTwo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
