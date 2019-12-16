using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.InbetweenClass), fullyQualifiedName: "jsii-calc.InbetweenClass")]
    public class InbetweenClass : Amazon.JSII.Tests.CalculatorNamespace.PublicClass, Amazon.JSII.Tests.CalculatorNamespace.IPublicInterface2
    {
        /// <summary></summary>
        public InbetweenClass(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected InbetweenClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected InbetweenClass(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Ciao()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }
    }
}
