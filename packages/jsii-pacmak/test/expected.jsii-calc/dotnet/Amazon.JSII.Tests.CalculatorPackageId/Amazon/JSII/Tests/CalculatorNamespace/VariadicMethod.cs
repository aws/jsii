using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(VariadicMethod), fullyQualifiedName: "jsii-calc.VariadicMethod", parametersJson: "[{\"docs\":{\"summary\":\"a prefix that will be use for all values returned by `#asArray`.\"},\"name\":\"prefix\",\"type\":{\"primitive\":\"number\"},\"variadic\":true}]")]
    public class VariadicMethod : DeputyBase
    {
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
        [JsiiMethod(name: "asArray", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"number\"},\"kind\":\"array\"}}}", parametersJson: "[{\"docs\":{\"summary\":\"the first element of the array to be returned (after the `prefix` provided at construction time).\"},\"name\":\"first\",\"type\":{\"primitive\":\"number\"}},{\"docs\":{\"summary\":\"other elements to be included in the array.\"},\"name\":\"others\",\"type\":{\"primitive\":\"number\"},\"variadic\":true}]")]
        public virtual double[] AsArray(double first, double others)
        {
            return InvokeInstanceMethod<double[]>(new object[]{first, others});
        }
    }
}
