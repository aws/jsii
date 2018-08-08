using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
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

        /// <summary>Returns another random number.</summary>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}