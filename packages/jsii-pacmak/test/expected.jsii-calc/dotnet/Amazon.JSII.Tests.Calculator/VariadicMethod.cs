using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiClass(typeof(VariadicMethod), "jsii-calc.VariadicMethod", "[{\"name\":\"prefix\",\"type\":{\"primitive\":\"number\"}}]")]
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

        /// <param name = "first">the first element of the array to be returned (after the ``prefix`` provided at construction time).</param>
        /// <param name = "others">other elements to be included in the array.</param>
        [JsiiMethod("asArray", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"number\"}}}", "[{\"name\":\"first\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"others\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double[] AsArray(double first, double others)
        {
            return InvokeInstanceMethod<double[]>(new object[]{first, others});
        }
    }
}