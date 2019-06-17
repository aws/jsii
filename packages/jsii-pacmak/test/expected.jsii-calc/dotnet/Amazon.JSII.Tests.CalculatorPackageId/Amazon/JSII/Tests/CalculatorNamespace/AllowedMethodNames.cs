using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
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

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "getBar", parametersJson: "[{\"name\":\"_p1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_p2\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void GetBar(string p1, double p2)
        {
            InvokeInstanceVoidMethod(new object[]{p1, p2});
        }

        /// <summary>getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "getFoo", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"withParam\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string GetFoo(string withParam)
        {
            return InvokeInstanceMethod<string>(new object[]{withParam});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "setBar", parametersJson: "[{\"name\":\"_x\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_y\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"_z\",\"type\":{\"primitive\":\"boolean\"}}]")]
        public virtual void SetBar(string x, double y, bool z)
        {
            InvokeInstanceVoidMethod(new object[]{x, y, z});
        }

        /// <summary>setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "setFoo", parametersJson: "[{\"name\":\"_x\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_y\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void SetFoo(string x, double y)
        {
            InvokeInstanceVoidMethod(new object[]{x, y});
        }
    }
}
