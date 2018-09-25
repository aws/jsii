using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IReturnsNumber), "jsii-calc.ReturnsNumber")]
    internal sealed class ReturnsNumberProxy : DeputyBase, IReturnsNumber
    {
        private ReturnsNumberProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("numberProp", "{\"primitive\":\"number\"}")]
        public double NumberProp
        {
            get => GetInstanceProperty<double>();
        }

        [JsiiMethod("obtainNumber", "{\"primitive\":\"number\"}", "[]")]
        public double ObtainNumber()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}