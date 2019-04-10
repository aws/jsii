using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(GreetingAugmenter), "jsii-calc.GreetingAugmenter", "[]")]
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

        [JsiiMethod(name: "betterGreeting", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"friendly\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}}]")]
        public virtual string BetterGreeting(IIFriendly friendly)
        {
            return InvokeInstanceMethod<string>(new object[]{friendly});
        }
    }
}