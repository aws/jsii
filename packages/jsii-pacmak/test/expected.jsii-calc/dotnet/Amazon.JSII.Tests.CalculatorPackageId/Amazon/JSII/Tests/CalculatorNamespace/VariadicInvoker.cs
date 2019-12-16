using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.VariadicInvoker), fullyQualifiedName: "jsii-calc.VariadicInvoker", parametersJson: "[{\"name\":\"method\",\"type\":{\"fqn\":\"jsii-calc.VariadicMethod\"}}]")]
    public class VariadicInvoker : DeputyBase
    {
        /// <summary></summary>
        /// <param name="method"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public VariadicInvoker(Amazon.JSII.Tests.CalculatorNamespace.VariadicMethod method): base(new DeputyProps(new object[]{method}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected VariadicInvoker(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected VariadicInvoker(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="values"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "asArray", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"number\"},\"kind\":\"array\"}}}", parametersJson: "[{\"name\":\"values\",\"type\":{\"primitive\":\"number\"},\"variadic\":true}]")]
        public virtual double[] AsArray(params double[] values)
        {
            return InvokeInstanceMethod<double[]>(new System.Type[]{typeof(double[])}, new object[]{values});
        }
    }
}
