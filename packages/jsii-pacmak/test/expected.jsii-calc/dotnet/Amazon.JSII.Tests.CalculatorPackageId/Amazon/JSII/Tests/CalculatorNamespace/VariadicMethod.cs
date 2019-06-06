using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(VariadicMethod), fullyQualifiedName: "jsii-calc.VariadicMethod", parametersJson: "[{\"name\":\"prefix\",\"variadic\":true,\"type\":{\"primitive\":\"number\"}}]")]
    public class VariadicMethod : DeputyBase
    {
        /// <param name = "prefix">a prefix that will be use for all values returned by `#asArray`.</param>
        /// <remarks>stability: Experimental</remarks>
        public VariadicMethod(double prefix): base(new DeputyProps(new object[]{prefix}))
        {
        }

        protected VariadicMethod(ByRefValue reference): base(reference)
        {
        }

        protected VariadicMethod(DeputyProps props): base(props)
        {
        }

        /// <param name = "first">the first element of the array to be returned (after the `prefix` provided at construction time).</param>
        /// <param name = "others">other elements to be included in the array.</param>
        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "asArray", returnsJson: "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"number\"}}}}", parametersJson: "[{\"name\":\"first\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"others\",\"variadic\":true,\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double[] AsArray(double first, double others)
        {
            return InvokeInstanceMethod<double[]>(new object[]{first, others});
        }
    }
}