using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterfaceProxy(typeof(IReturnsNumber), "jsii-calc.ReturnsNumber")]
    internal class ReturnsNumberProxy : DeputyBase, IReturnsNumber
    {
        private ReturnsNumberProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("numberProp", "{\"primitive\":\"number\"}")]
        public virtual double NumberProp
        {
            get => GetInstanceProperty<double>();
        }

        [JsiiMethod("obtainNumber", "{\"primitive\":\"number\"}", "[]")]
        public virtual double ObtainNumber()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}