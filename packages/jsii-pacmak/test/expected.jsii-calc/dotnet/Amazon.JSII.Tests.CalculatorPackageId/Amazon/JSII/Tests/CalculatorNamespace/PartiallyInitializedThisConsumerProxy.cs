using Amazon.JSII.Runtime.Deputy;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(PartiallyInitializedThisConsumer), "jsii-calc.PartiallyInitializedThisConsumer")]
    internal sealed class PartiallyInitializedThisConsumerProxy : PartiallyInitializedThisConsumer
    {
        private PartiallyInitializedThisConsumerProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod("consumePartiallyInitializedThis", "{\"type\":{\"primitive\":\"string\"}}", "[{\"name\":\"obj\",\"value\":{\"type\":{\"fqn\":\"jsii-calc.ConstructorPassesThisOut\"}}},{\"name\":\"dt\",\"value\":{\"type\":{\"primitive\":\"date\"}}},{\"name\":\"ev\",\"value\":{\"type\":{\"fqn\":\"jsii-calc.AllTypesEnum\"}}}]")]
        public override string ConsumePartiallyInitializedThis(ConstructorPassesThisOut obj, DateTime dt, AllTypesEnum ev)
        {
            return InvokeInstanceMethod<string>(new object[]{obj, dt, ev});
        }
    }
}