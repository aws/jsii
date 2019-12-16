using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace
{
    /// <summary></summary>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very), fullyQualifiedName: "@scope/jsii-calc-base-of-base.Very")]
    public class Very : DeputyBase
    {
        /// <summary></summary>
        public Very(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected Very(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected Very(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        [JsiiMethod(name: "hey", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double Hey()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }
    }
}
