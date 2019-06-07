using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(PartiallyInitializedThisConsumer), fullyQualifiedName: "jsii-calc.PartiallyInitializedThisConsumer")]
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

        [JsiiMethod(name: "consumePartiallyInitializedThis", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.ConstructorPassesThisOut\"}},{\"name\":\"dt\",\"type\":{\"primitive\":\"date\"}},{\"name\":\"ev\",\"type\":{\"fqn\":\"jsii-calc.AllTypesEnum\"}}]")]
        public abstract string ConsumePartiallyInitializedThis(Amazon.JSII.Tests.CalculatorNamespace.ConstructorPassesThisOut obj, System.DateTime dt, Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum ev);

    }
}
