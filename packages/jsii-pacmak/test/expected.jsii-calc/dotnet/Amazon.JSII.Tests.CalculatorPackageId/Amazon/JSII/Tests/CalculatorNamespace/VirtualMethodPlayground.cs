using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.VirtualMethodPlayground), fullyQualifiedName: "jsii-calc.VirtualMethodPlayground")]
    public class VirtualMethodPlayground : DeputyBase
    {
        /// <summary></summary>
        public VirtualMethodPlayground(): base(new DeputyProps(new object[]{}))
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected VirtualMethodPlayground(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected VirtualMethodPlayground(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="index"></param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMeAsync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"index\",\"type\":{\"primitive\":\"number\"}}]", isAsync: true)]
        public virtual double OverrideMeAsync(double index)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(double)}, new object[]{index});
        }

        /// <summary></summary>
        /// <param name="index"></param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMeSync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"index\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double OverrideMeSync(double index)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(double)}, new object[]{index});
        }

        /// <summary></summary>
        /// <param name="count"></param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "parallelSumAsync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]", isAsync: true)]
        public virtual double ParallelSumAsync(double count)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(double)}, new object[]{count});
        }

        /// <summary></summary>
        /// <param name="count"></param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "serialSumAsync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]", isAsync: true)]
        public virtual double SerialSumAsync(double count)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(double)}, new object[]{count});
        }

        /// <summary></summary>
        /// <param name="count"></param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "sumSync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double SumSync(double count)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(double)}, new object[]{count});
        }
    }
}
