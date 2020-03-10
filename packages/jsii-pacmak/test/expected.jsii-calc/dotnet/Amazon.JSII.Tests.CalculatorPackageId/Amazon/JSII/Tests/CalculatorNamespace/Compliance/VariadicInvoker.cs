using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.VariadicInvoker), fullyQualifiedName: "jsii-calc.compliance.VariadicInvoker", parametersJson: "[{\"name\":\"method\",\"type\":{\"fqn\":\"jsii-calc.compliance.VariadicMethod\"}}]")]
    public class VariadicInvoker : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public VariadicInvoker(Amazon.JSII.Tests.CalculatorNamespace.Compliance.VariadicMethod method): base(new DeputyProps(new object[]{method}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected VariadicInvoker(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected VariadicInvoker(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "asArray", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"number\"},\"kind\":\"array\"}}}", parametersJson: "[{\"name\":\"values\",\"type\":{\"primitive\":\"number\"},\"variadic\":true}]")]
        public virtual double[] AsArray(params double[] values)
        {
            return InvokeInstanceMethod<double[]>(new System.Type[]{typeof(double[])}, new object[]{values});
        }
    }
}
