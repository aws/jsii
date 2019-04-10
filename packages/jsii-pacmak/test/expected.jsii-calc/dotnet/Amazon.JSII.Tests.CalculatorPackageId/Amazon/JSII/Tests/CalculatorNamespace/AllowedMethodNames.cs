using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(AllowedMethodNames), fullyQualifiedName: "jsii-calc.AllowedMethodNames")]
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

        [JsiiMethod(name: "getBar", parametersJson: "[{\"name\":\"_p1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_p2\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void GetBar(string _p1, double _p2)
        {
            InvokeInstanceVoidMethod(new object[]{_p1, _p2});
        }

        /// <summary>getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.</summary>
        [JsiiMethod(name: "getFoo", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"withParam\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string GetFoo(string withParam)
        {
            return InvokeInstanceMethod<string>(new object[]{withParam});
        }

        [JsiiMethod(name: "setBar", parametersJson: "[{\"name\":\"_x\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_y\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"_z\",\"type\":{\"primitive\":\"boolean\"}}]")]
        public virtual void SetBar(string _x, double _y, bool _z)
        {
            InvokeInstanceVoidMethod(new object[]{_x, _y, _z});
        }

        /// <summary>setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.</summary>
        [JsiiMethod(name: "setFoo", parametersJson: "[{\"name\":\"_x\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_y\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void SetFoo(string _x, double _y)
        {
            InvokeInstanceVoidMethod(new object[]{_x, _y});
        }
    }
}