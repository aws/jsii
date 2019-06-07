using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(ConsumersOfThisCrazyTypeSystem), fullyQualifiedName: "jsii-calc.ConsumersOfThisCrazyTypeSystem")]
    public class ConsumersOfThisCrazyTypeSystem : DeputyBase
    {
        public ConsumersOfThisCrazyTypeSystem(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ConsumersOfThisCrazyTypeSystem(ByRefValue reference): base(reference)
        {
        }

        protected ConsumersOfThisCrazyTypeSystem(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "consumeAnotherPublicInterface", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.IAnotherPublicInterface\"}}]")]
        public virtual string ConsumeAnotherPublicInterface(Amazon.JSII.Tests.CalculatorNamespace.IIAnotherPublicInterface obj)
        {
            return InvokeInstanceMethod<string>(new object[]{obj});
        }

        [JsiiMethod(name: "consumeNonInternalInterface", returnsJson: "{\"type\":{\"primitive\":\"any\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.INonInternalInterface\"}}]")]
        public virtual object ConsumeNonInternalInterface(Amazon.JSII.Tests.CalculatorNamespace.IINonInternalInterface obj)
        {
            return InvokeInstanceMethod<object>(new object[]{obj});
        }
    }
}
