using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AsyncVirtualMethods), fullyQualifiedName: "jsii-calc.AsyncVirtualMethods")]
    public class AsyncVirtualMethods : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public AsyncVirtualMethods(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AsyncVirtualMethods(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AsyncVirtualMethods(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "callMe", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isAsync: true)]
        public virtual double CallMe()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Just calls "overrideMeToo".</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "callMe2", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isAsync: true)]
        public virtual double CallMe2()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <summary>This method calls the "callMe" async method indirectly, which will then invoke a virtual method.</summary>
        /// <remarks>
        /// This is a "double promise" situation, which
        /// means that callbacks are not going to be available immediate, but only
        /// after an "immediates" cycle.
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "callMeDoublePromise", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isAsync: true)]
        public virtual double CallMeDoublePromise()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "dontOverrideMe", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double DontOverrideMe()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMe", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"mult\",\"type\":{\"primitive\":\"number\"}}]", isAsync: true)]
        public virtual double OverrideMe(double mult)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(double)}, new object[]{mult});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMeToo", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isAsync: true)]
        public virtual double OverrideMeToo()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }
    }
}
