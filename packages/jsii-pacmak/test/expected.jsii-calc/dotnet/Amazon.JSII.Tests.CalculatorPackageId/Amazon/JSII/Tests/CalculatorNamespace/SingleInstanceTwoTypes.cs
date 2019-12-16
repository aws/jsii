using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Test that a single instance can be returned under two different FQNs.</summary>
    /// <remarks>
    /// JSII clients can instantiate 2 different strongly-typed wrappers for the same
    /// object. Unfortunately, this will break object equality, but if we didn't do
    /// this it would break runtime type checks in the JVM or CLR.
    /// 
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.SingleInstanceTwoTypes), fullyQualifiedName: "jsii-calc.SingleInstanceTwoTypes")]
    public class SingleInstanceTwoTypes : DeputyBase
    {
        /// <summary></summary>
        public SingleInstanceTwoTypes(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected SingleInstanceTwoTypes(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected SingleInstanceTwoTypes(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "interface1", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.InbetweenClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.InbetweenClass Interface1()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.InbetweenClass>(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "interface2", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IPublicInterface Interface2()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IPublicInterface>(new System.Type[]{}, new object[]{});
        }
    }
}
