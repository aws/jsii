using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(AsyncVirtualMethods), "jsii-calc.AsyncVirtualMethods", "[]")]
    public class AsyncVirtualMethods : DeputyBase
    {
        public AsyncVirtualMethods(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AsyncVirtualMethods(ByRefValue reference): base(reference)
        {
        }

        protected AsyncVirtualMethods(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("callMe", "{\"type\":{\"primitive\":\"number\"},\"promise\":true}", "[]")]
        public virtual double CallMe()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        /// <summary>Just calls "overrideMeToo".</summary>
        [JsiiMethod("callMe2", "{\"type\":{\"primitive\":\"number\"},\"promise\":true}", "[]")]
        public virtual double CallMe2()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        /// <summary>This method calls the "callMe" async method indirectly, which will then invoke a virtual method.</summary>
        /// <remarks>
        /// This is a "double promise" situation, which
        /// means that callbacks are not going to be available immediate, but only
        /// after an "immediates" cycle.
        /// </remarks>
        [JsiiMethod("callMeDoublePromise", "{\"type\":{\"primitive\":\"number\"},\"promise\":true}", "[]")]
        public virtual double CallMeDoublePromise()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiMethod("dontOverrideMe", "{\"type\":{\"primitive\":\"number\"}}", "[]")]
        public virtual double DontOverrideMe()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiMethod("overrideMe", "{\"type\":{\"primitive\":\"number\"},\"promise\":true}", "[{\"name\":\"mult\",\"value\":{\"type\":{\"primitive\":\"number\"}}}]")]
        public virtual double OverrideMe(double mult)
        {
            return InvokeInstanceMethod<double>(new object[]{mult});
        }

        [JsiiMethod("overrideMeToo", "{\"type\":{\"primitive\":\"number\"},\"promise\":true}", "[]")]
        public virtual double OverrideMeToo()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}