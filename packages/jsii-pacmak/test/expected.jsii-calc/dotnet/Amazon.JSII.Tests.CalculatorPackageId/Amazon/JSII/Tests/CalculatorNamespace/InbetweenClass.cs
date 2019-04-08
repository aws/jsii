using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(InbetweenClass), "jsii-calc.InbetweenClass", "[]")]
    public class InbetweenClass : PublicClass, IIPublicInterface2
    {
        public InbetweenClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected InbetweenClass(ByRefValue reference): base(reference)
        {
        }

        protected InbetweenClass(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("ciao", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Ciao()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}