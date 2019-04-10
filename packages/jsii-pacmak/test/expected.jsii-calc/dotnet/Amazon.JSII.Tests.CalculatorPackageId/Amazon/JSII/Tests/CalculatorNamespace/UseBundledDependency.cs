using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(UseBundledDependency), fullyQualifiedName: "jsii-calc.UseBundledDependency")]
    public class UseBundledDependency : DeputyBase
    {
        public UseBundledDependency(): base(new DeputyProps(new object[]{}))
        {
        }

        protected UseBundledDependency(ByRefValue reference): base(reference)
        {
        }

        protected UseBundledDependency(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "value", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public virtual object Value()
        {
            return InvokeInstanceMethod<object>(new object[]{});
        }
    }
}