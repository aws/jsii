using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.AnonymousImplementationProvider")]
    public class AnonymousImplementationProvider : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IAnonymousImplementationProvider
    {
        public AnonymousImplementationProvider(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AnonymousImplementationProvider(ByRefValue reference): base(reference)
        {
        }

        protected AnonymousImplementationProvider(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "provide", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IAnonymouslyImplementMe\"}}", isOverride: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe Provide()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe>(new object[]{});
        }
    }
}
