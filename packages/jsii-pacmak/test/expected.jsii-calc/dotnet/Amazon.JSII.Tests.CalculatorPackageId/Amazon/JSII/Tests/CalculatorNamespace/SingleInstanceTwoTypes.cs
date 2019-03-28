using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>
    /// Test that a single instance can be returned under two different FQNs
    /// 
    /// JSII clients can instantiate 2 different strongly-typed wrappers for the same
    /// object. Unfortunately, this will break object equality, but if we didn't do
    /// this it would break runtime type checks in the JVM or CLR.
    /// </summary>
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

        [JsiiMethod("interface1", "{\"fqn\":\"jsii-calc.InbetweenClass\"}", "[]")]
        public virtual InbetweenClass Interface1()
        {
            return InvokeInstanceMethod<InbetweenClass>(new object[]{});
        }

        [JsiiMethod("interface2", "{\"fqn\":\"jsii-calc.IPublicInterface\"}", "[]")]
        public virtual IIPublicInterface Interface2()
        {
            return InvokeInstanceMethod<IIPublicInterface>(new object[]{});
        }
    }
}