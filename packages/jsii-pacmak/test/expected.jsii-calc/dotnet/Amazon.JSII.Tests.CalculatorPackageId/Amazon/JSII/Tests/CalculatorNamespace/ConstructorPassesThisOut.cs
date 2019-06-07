using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(ConstructorPassesThisOut), fullyQualifiedName: "jsii-calc.ConstructorPassesThisOut", parametersJson: "[{\"name\":\"consumer\",\"type\":{\"fqn\":\"jsii-calc.PartiallyInitializedThisConsumer\"}}]")]
    public class ConstructorPassesThisOut : DeputyBase
    {
        public ConstructorPassesThisOut(Amazon.JSII.Tests.CalculatorNamespace.PartiallyInitializedThisConsumer consumer): base(new DeputyProps(new object[]{consumer}))
        {
        }

        protected ConstructorPassesThisOut(ByRefValue reference): base(reference)
        {
        }

        protected ConstructorPassesThisOut(DeputyProps props): base(props)
        {
        }
    }
}
