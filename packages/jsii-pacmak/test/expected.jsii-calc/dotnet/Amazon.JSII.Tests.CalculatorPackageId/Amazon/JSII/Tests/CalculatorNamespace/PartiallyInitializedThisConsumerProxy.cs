using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(PartiallyInitializedThisConsumer), "jsii-calc.PartiallyInitializedThisConsumer")]
    internal sealed class PartiallyInitializedThisConsumerProxy : PartiallyInitializedThisConsumer
    {
        private PartiallyInitializedThisConsumerProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod("consumePartiallyInitializedThis", "{\"primitive\":\"string\"}", "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.ConstructorPassesThisOut\"}}]")]
        public override string ConsumePartiallyInitializedThis(ConstructorPassesThisOut obj)
        {
            return InvokeInstanceMethod<string>(new object[]{obj});
        }
    }
}