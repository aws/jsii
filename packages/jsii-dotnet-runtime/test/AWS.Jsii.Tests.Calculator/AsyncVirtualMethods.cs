using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.AsyncVirtualMethods", "[]")]
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

        [JsiiMethod("callMe", "{\"primitive\":\"number\",\"promise\":true}", "[]")]
        public virtual double CallMe()
        {
            return InvokeMethod<double>(new object[]{});
        }

        [JsiiMethod("overrideMe", "{\"primitive\":\"number\",\"promise\":true}", "[{\"name\":\"mult\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double OverrideMe(double mult)
        {
            return InvokeMethod<double>(new object[]{mult});
        }

        [JsiiMethod("overrideMeToo", "{\"primitive\":\"number\",\"promise\":true}", "[]")]
        public virtual double OverrideMeToo()
        {
            return InvokeMethod<double>(new object[]{});
        }

        /// <summary>Just calls "overrideMeToo"</summary>
        [JsiiMethod("callMe2", "{\"primitive\":\"number\",\"promise\":true}", "[]")]
        public virtual double CallMe2()
        {
            return InvokeMethod<double>(new object[]{});
        }

        /// <summary>
        /// This method calls the "callMe" async method indirectly, which will then
        /// invoke a virtual method. This is a "double promise" situation, which
        /// means that callbacks are not going to be available immediate, but only
        /// after an "immediates" cycle.
        /// </summary>
        [JsiiMethod("callMeDoublePromise", "{\"primitive\":\"number\",\"promise\":true}", "[]")]
        public virtual double CallMeDoublePromise()
        {
            return InvokeMethod<double>(new object[]{});
        }

        [JsiiMethod("dontOverrideMe", "{\"primitive\":\"number\"}", "[]")]
        public virtual double DontOverrideMe()
        {
            return InvokeMethod<double>(new object[]{});
        }
    }
}