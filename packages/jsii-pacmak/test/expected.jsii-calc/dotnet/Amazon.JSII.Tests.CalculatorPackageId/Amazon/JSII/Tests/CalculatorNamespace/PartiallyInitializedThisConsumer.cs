using Amazon.JSII.Runtime.Deputy;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(PartiallyInitializedThisConsumer), "jsii-calc.PartiallyInitializedThisConsumer", "[]")]
    public abstract class PartiallyInitializedThisConsumer : DeputyBase
    {
        protected PartiallyInitializedThisConsumer(): base(new DeputyProps(new object[]{}))
        {
        }

        protected PartiallyInitializedThisConsumer(ByRefValue reference): base(reference)
        {
        }

        protected PartiallyInitializedThisConsumer(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("consumePartiallyInitializedThis", "{\"primitive\":\"string\"}", "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.ConstructorPassesThisOut\"}},{\"name\":\"dt\",\"type\":{\"primitive\":\"date\"}},{\"name\":\"ev\",\"type\":{\"fqn\":\"jsii-calc.AllTypesEnum\"}}]")]
        public abstract string ConsumePartiallyInitializedThis(ConstructorPassesThisOut obj, DateTime dt, AllTypesEnum ev);
    }
}