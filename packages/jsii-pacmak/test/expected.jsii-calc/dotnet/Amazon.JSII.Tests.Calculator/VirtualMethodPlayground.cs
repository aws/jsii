using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
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

        [JsiiMethod("serialSumAsync", "{\"primitive\":\"number\",\"promise\":true}", "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double SerialSumAsync(double count)
        {
            return InvokeInstanceMethod<double>(new object[]{count});
        }

        [JsiiMethod("parallelSumAsync", "{\"primitive\":\"number\",\"promise\":true}", "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double ParallelSumAsync(double count)
        {
            return InvokeInstanceMethod<double>(new object[]{count});
        }

        [JsiiMethod("sumSync", "{\"primitive\":\"number\"}", "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double SumSync(double count)
        {
            return InvokeInstanceMethod<double>(new object[]{count});
        }

        [JsiiMethod("overrideMeAsync", "{\"primitive\":\"number\",\"promise\":true}", "[{\"name\":\"index\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double OverrideMeAsync(double index)
        {
            return InvokeInstanceMethod<double>(new object[]{index});
        }

        [JsiiMethod("overrideMeSync", "{\"primitive\":\"number\"}", "[{\"name\":\"index\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double OverrideMeSync(double index)
        {
            return InvokeInstanceMethod<double>(new object[]{index});
        }
    }
}