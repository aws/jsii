using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(AllowedMethodNames), "jsii-calc.AllowedMethodNames", "[]")]
    public class AllowedMethodNames : DeputyBase
    {
        public AllowedMethodNames(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AllowedMethodNames(ByRefValue reference): base(reference)
        {
        }

        protected AllowedMethodNames(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("getBar", null, "[{\"name\":\"_p1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_p2\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void GetBar(string _p1, double _p2)
        {
            InvokeInstanceVoidMethod(new object[]{_p1, _p2});
        }

        /// <remarks>
        /// remarks: ..) is okay.
        /// summary: getXxx() is not allowed (see negatives), but getXxx(a, .
        /// </remarks>
        [JsiiMethod("getFoo", "{\"primitive\":\"string\"}", "[{\"name\":\"withParam\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string GetFoo(string withParam)
        {
            return InvokeInstanceMethod<string>(new object[]{withParam});
        }

        [JsiiMethod("setBar", null, "[{\"name\":\"_x\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_y\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"_z\",\"type\":{\"primitive\":\"boolean\"}}]")]
        public virtual void SetBar(string _x, double _y, bool _z)
        {
            InvokeInstanceVoidMethod(new object[]{_x, _y, _z});
        }

        /// <remarks>
        /// remarks: ..) is okay.
        /// summary: setFoo(x) is not allowed (see negatives), but setXxx(a, b, .
        /// </remarks>
        [JsiiMethod("setFoo", null, "[{\"name\":\"_x\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_y\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void SetFoo(string _x, double _y)
        {
            InvokeInstanceVoidMethod(new object[]{_x, _y});
        }
    }
}