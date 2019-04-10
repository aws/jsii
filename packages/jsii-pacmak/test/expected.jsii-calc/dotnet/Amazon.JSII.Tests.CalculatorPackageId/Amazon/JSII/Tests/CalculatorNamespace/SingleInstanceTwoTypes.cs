using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Test that a single instance can be returned under two different FQNs.</summary>
    /// <remarks>
    /// JSII clients can instantiate 2 different strongly-typed wrappers for the same
    /// object. Unfortunately, this will break object equality, but if we didn't do
    /// this it would break runtime type checks in the JVM or CLR.
    /// </remarks>
    [JsiiClass(typeof(SingleInstanceTwoTypes), "jsii-calc.SingleInstanceTwoTypes", "[]")]
    public class SingleInstanceTwoTypes : DeputyBase
    {
        public SingleInstanceTwoTypes(): base(new DeputyProps(new object[]{}))
        {
        }

        protected SingleInstanceTwoTypes(ByRefValue reference): base(reference)
        {
        }

        protected SingleInstanceTwoTypes(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "interface1", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.InbetweenClass\"}}", parametersJson: "[]")]
        public virtual InbetweenClass Interface1()
        {
            return InvokeInstanceMethod<InbetweenClass>(new object[]{});
        }

        [JsiiMethod(name: "interface2", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}", parametersJson: "[]")]
        public virtual IIPublicInterface Interface2()
        {
            return InvokeInstanceMethod<IIPublicInterface>(new object[]{});
        }
    }
}