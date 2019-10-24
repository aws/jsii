using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.GreetingAugmenter), fullyQualifiedName: "jsii-calc.GreetingAugmenter")]
    public class GreetingAugmenter : DeputyBase
    {
        public GreetingAugmenter(): base(new DeputyProps(new object[]{}))
        {
        }

        protected GreetingAugmenter(ByRefValue reference): base(reference)
        {
        }

        protected GreetingAugmenter(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "betterGreeting", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"friendly\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}}]")]
        public virtual string BetterGreeting(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IFriendly friendly)
        {
            return InvokeInstanceMethod<string>(new object[]{friendly});
        }
    }
}
