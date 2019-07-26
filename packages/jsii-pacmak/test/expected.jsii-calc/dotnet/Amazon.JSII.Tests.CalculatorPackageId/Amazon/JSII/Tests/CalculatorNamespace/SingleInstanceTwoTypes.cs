using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Test that a single instance can be returned under two different FQNs.</summary>
    /// <remarks>
    /// JSII clients can instantiate 2 different strongly-typed wrappers for the same
    /// object. Unfortunately, this will break object equality, but if we didn't do
    /// this it would break runtime type checks in the JVM or CLR.
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(SingleInstanceTwoTypes), fullyQualifiedName: "jsii-calc.SingleInstanceTwoTypes")]
    public class SingleInstanceTwoTypes : DeputyBase
    {
        public SingleInstanceTwoTypes(): base(new DeputyProps(new object[]{}))
        {
        }

        protected SingleInstanceTwoTypes(ByRefValue reference): base(reference)
        {
        }

        protected SingleInstanceTwoTypes(DeputyProps props): base(props)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "interface1", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.InbetweenClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.InbetweenClass Interface1()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.InbetweenClass>(new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "interface2", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface Interface2()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface>(new object[]{});
        }
    }
}