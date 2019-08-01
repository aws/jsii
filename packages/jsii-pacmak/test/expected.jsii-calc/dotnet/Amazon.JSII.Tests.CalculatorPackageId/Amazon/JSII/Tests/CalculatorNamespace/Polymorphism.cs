using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Polymorphism), fullyQualifiedName: "jsii-calc.Polymorphism")]
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

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "sayHello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"friendly\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}}]")]
        public virtual string SayHello(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IIFriendly friendly)
        {
            return InvokeInstanceMethod<string>(new object[]{friendly});
        }
    }
}
