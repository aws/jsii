using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.VariadicMethod), fullyQualifiedName: "jsii-calc.VariadicMethod", parametersJson: "[{\"docs\":{\"summary\":\"a prefix that will be use for all values returned by `#asArray`.\"},\"name\":\"prefix\",\"type\":{\"primitive\":\"number\"},\"variadic\":true}]")]
    public class VariadicMethod : DeputyBase
    {
        /// <param name="prefix">a prefix that will be use for all values returned by `#asArray`.</param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public VariadicMethod(params double[] prefix): base(new DeputyProps(new object[]{prefix}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected VariadicMethod(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected VariadicMethod(DeputyProps props): base(props)
        {
        }

        /// <param name="first">the first element of the array to be returned (after the `prefix` provided at construction time).</param>
        /// <param name="others">other elements to be included in the array.</param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "asArray", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"number\"},\"kind\":\"array\"}}}", parametersJson: "[{\"docs\":{\"summary\":\"the first element of the array to be returned (after the `prefix` provided at construction time).\"},\"name\":\"first\",\"type\":{\"primitive\":\"number\"}},{\"docs\":{\"summary\":\"other elements to be included in the array.\"},\"name\":\"others\",\"type\":{\"primitive\":\"number\"},\"variadic\":true}]")]
        public virtual double[] AsArray(double first, params double[] others)
        {
            return InvokeInstanceMethod<double[]>(new System.Type[]{typeof(double), typeof(double[])}, new object[]{first, others});
        }
    }
}
