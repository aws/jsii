using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AllowedMethodNames), fullyQualifiedName: "jsii-calc.AllowedMethodNames")]
    public class AllowedMethodNames : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public AllowedMethodNames(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AllowedMethodNames(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AllowedMethodNames(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "getBar", parametersJson: "[{\"name\":\"_p1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_p2\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void GetBar(string p1, double p2)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(string), typeof(double)}, new object[]{p1, p2});
        }

        /// <summary>getXxx() is not allowed (see negatives), but getXxx(a, ...) is okay.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "getFoo", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"withParam\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string GetFoo(string withParam)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string)}, new object[]{withParam});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "setBar", parametersJson: "[{\"name\":\"_x\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_y\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"_z\",\"type\":{\"primitive\":\"boolean\"}}]")]
        public virtual void SetBar(string x, double y, bool z)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(string), typeof(double), typeof(bool)}, new object[]{x, y, z});
        }

        /// <summary>setFoo(x) is not allowed (see negatives), but setXxx(a, b, ...) is okay.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "setFoo", parametersJson: "[{\"name\":\"_x\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"_y\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void SetFoo(string x, double y)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(string), typeof(double)}, new object[]{x, y});
        }
    }
}
