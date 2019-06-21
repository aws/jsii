using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(PublicClass), fullyQualifiedName: "jsii-calc.PublicClass")]
    public class PublicClass : DeputyBase
    {
        public PublicClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected PublicClass(ByRefValue reference): base(reference)
        {
        }

        protected PublicClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "hello")]
        public virtual void Hello()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
