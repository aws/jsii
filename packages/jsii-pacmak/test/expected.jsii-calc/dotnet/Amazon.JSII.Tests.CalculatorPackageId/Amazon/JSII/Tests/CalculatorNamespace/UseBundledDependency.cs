using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.UseBundledDependency), fullyQualifiedName: "jsii-calc.UseBundledDependency")]
    public class UseBundledDependency : DeputyBase
    {
        /// <summary></summary>
        public UseBundledDependency(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected UseBundledDependency(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected UseBundledDependency(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "value", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public virtual object Value()
        {
            return InvokeInstanceMethod<object>(new System.Type[]{}, new object[]{});
        }
    }
}
