using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.GreetingAugmenter), fullyQualifiedName: "jsii-calc.GreetingAugmenter")]
    public class GreetingAugmenter : DeputyBase
    {
        /// <summary></summary>
        public GreetingAugmenter(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected GreetingAugmenter(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected GreetingAugmenter(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="friendly"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "betterGreeting", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"friendly\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}}]")]
        public virtual string BetterGreeting(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IFriendly friendly)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IFriendly)}, new object[]{friendly});
        }
    }
}
