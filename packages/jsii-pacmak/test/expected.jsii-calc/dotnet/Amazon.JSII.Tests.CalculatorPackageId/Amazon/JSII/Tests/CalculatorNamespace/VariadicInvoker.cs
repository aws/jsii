using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.VariadicInvoker), fullyQualifiedName: "jsii-calc.VariadicInvoker", parametersJson: "[{\"name\":\"method\",\"type\":{\"fqn\":\"jsii-calc.VariadicMethod\"}}]")]
    public class VariadicInvoker : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public VariadicInvoker(Amazon.JSII.Tests.CalculatorNamespace.VariadicMethod method): base(new DeputyProps(new object[]{method}))
        {
        }

        protected VariadicInvoker(ByRefValue reference): base(reference)
        {
        }

        protected VariadicInvoker(DeputyProps props): base(props)
        {
        }

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
