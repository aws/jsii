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

        [JsiiMethod("overrideMeAsync", "{\"type\":{\"primitive\":\"number\"},\"promise\":true}", "[{\"name\":\"index\",\"value\":{\"type\":{\"primitive\":\"number\"}}}]")]
        public virtual double OverrideMeAsync(double index)
        {
            return InvokeInstanceMethod<double>(new object[]{index});
        }

        [JsiiMethod("overrideMeSync", "{\"type\":{\"primitive\":\"number\"}}", "[{\"name\":\"index\",\"value\":{\"type\":{\"primitive\":\"number\"}}}]")]
        public virtual double OverrideMeSync(double index)
        {
            return InvokeInstanceMethod<double>(new object[]{index});
        }

        [JsiiMethod("parallelSumAsync", "{\"type\":{\"primitive\":\"number\"},\"promise\":true}", "[{\"name\":\"count\",\"value\":{\"type\":{\"primitive\":\"number\"}}}]")]
        public virtual double ParallelSumAsync(double count)
        {
            return InvokeInstanceMethod<double>(new object[]{count});
        }

        [JsiiMethod("serialSumAsync", "{\"type\":{\"primitive\":\"number\"},\"promise\":true}", "[{\"name\":\"count\",\"value\":{\"type\":{\"primitive\":\"number\"}}}]")]
        public virtual double SerialSumAsync(double count)
        {
            return InvokeInstanceMethod<double>(new object[]{count});
        }

        [JsiiMethod("sumSync", "{\"type\":{\"primitive\":\"number\"}}", "[{\"name\":\"count\",\"value\":{\"type\":{\"primitive\":\"number\"}}}]")]
        public virtual double SumSync(double count)
        {
            return InvokeInstanceMethod<double>(new object[]{count});
        }
    }
}