using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(OverrideReturnsObject), fullyQualifiedName: "jsii-calc.OverrideReturnsObject")]
    public class OverrideReturnsObject : DeputyBase
    {
        public OverrideReturnsObject(): base(new DeputyProps(new object[]{}))
        {
        }

        protected OverrideReturnsObject(ByRefValue reference): base(reference)
        {
        }

        protected OverrideReturnsObject(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "test", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.IReturnsNumber\"}}]")]
        public virtual double Test(Amazon.JSII.Tests.CalculatorNamespace.IIReturnsNumber obj)
        {
            return InvokeInstanceMethod<double>(new object[]{obj});
        }
    }
}
