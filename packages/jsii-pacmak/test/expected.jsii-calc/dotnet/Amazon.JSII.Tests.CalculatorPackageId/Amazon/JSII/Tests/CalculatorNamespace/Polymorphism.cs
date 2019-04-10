using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Polymorphism), fullyQualifiedName: "jsii-calc.Polymorphism")]
    public class Polymorphism : DeputyBase
    {
        public Polymorphism(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Polymorphism(ByRefValue reference): base(reference)
        {
        }

        protected Polymorphism(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "sayHello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"friendly\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}}]")]
        public virtual string SayHello(IIFriendly friendly)
        {
            return InvokeInstanceMethod<string>(new object[]{friendly});
        }
    }
}