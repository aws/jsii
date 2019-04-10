using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(VirtualMethodPlayground), "jsii-calc.VirtualMethodPlayground", "[]")]
    public class VirtualMethodPlayground : DeputyBase
    {
        public VirtualMethodPlayground(): base(new DeputyProps(new object[]{}))
        {
        }

        protected VirtualMethodPlayground(ByRefValue reference): base(reference)
        {
        }

        protected VirtualMethodPlayground(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "overrideMeAsync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"index\",\"type\":{\"primitive\":\"number\"}}]", isAsync: true)]
        public virtual double OverrideMeAsync(double index)
        {
            return InvokeInstanceMethod<double>(new object[]{index});
        }

        [JsiiMethod(name: "overrideMeSync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"index\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double OverrideMeSync(double index)
        {
            return InvokeInstanceMethod<double>(new object[]{index});
        }

        [JsiiMethod(name: "parallelSumAsync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]", isAsync: true)]
        public virtual double ParallelSumAsync(double count)
        {
            return InvokeInstanceMethod<double>(new object[]{count});
        }

        [JsiiMethod(name: "serialSumAsync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]", isAsync: true)]
        public virtual double SerialSumAsync(double count)
        {
            return InvokeInstanceMethod<double>(new object[]{count});
        }

        [JsiiMethod(name: "sumSync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double SumSync(double count)
        {
            return InvokeInstanceMethod<double>(new object[]{count});
        }
    }
}