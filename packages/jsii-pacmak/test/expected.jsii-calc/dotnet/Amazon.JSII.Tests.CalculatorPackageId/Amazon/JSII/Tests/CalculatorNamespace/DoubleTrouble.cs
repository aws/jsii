using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(DoubleTrouble), "jsii-calc.DoubleTrouble", "[]")]
    public class DoubleTrouble : DeputyBase, IIFriendlyRandomGenerator
    {
        public DoubleTrouble(): base(new DeputyProps(new object[]{}))
        {
        }

        protected DoubleTrouble(ByRefValue reference): base(reference)
        {
        }

        protected DoubleTrouble(DeputyProps props): base(props)
        {
        }

        /// <remarks>summary: Say hello!</remarks>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>summary: Returns another random number.</remarks>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}