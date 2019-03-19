using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ConsumersOfThisCrazyTypeSystem), "jsii-calc.ConsumersOfThisCrazyTypeSystem", "[]")]
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

        [JsiiMethod("consumeAnotherPublicInterface", "{\"primitive\":\"string\"}", "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.IAnotherPublicInterface\"}}]")]
        public virtual string ConsumeAnotherPublicInterface(IIAnotherPublicInterface obj)
        {
            return InvokeInstanceMethod<string>(new object[]{obj});
        }

        [JsiiMethod("consumeNonInternalInterface", "{\"primitive\":\"any\"}", "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.INonInternalInterface\"}}]")]
        public virtual object ConsumeNonInternalInterface(IINonInternalInterface obj)
        {
            return InvokeInstanceMethod<object>(new object[]{obj});
        }
    }
}