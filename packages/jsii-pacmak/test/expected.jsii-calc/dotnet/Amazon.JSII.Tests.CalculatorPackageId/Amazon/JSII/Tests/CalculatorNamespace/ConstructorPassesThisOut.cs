using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ConstructorPassesThisOut), "jsii-calc.ConstructorPassesThisOut", "[{\"name\":\"consumer\",\"type\":{\"fqn\":\"jsii-calc.PartiallyInitializedThisConsumer\"}}]")]
    public class ConstructorPassesThisOut : DeputyBase
    {
        public ConstructorPassesThisOut(PartiallyInitializedThisConsumer consumer): base(new DeputyProps(new object[]{consumer}))
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