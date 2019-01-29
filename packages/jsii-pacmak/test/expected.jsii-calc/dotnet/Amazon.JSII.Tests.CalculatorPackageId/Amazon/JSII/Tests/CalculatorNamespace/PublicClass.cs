using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(PublicClass), "jsii-calc.PublicClass", "[]")]
    public class PublicClass : DeputyBase
    {
        public PublicClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected PublicClass(ByRefValue reference): base(reference)
        {
        }

        protected PublicClass(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("hello", null, "[]")]
        public virtual void Hello()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}