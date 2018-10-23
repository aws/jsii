using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIReturnsNumber), "jsii-calc.IReturnsNumber")]
    internal sealed class IReturnsNumberProxy : DeputyBase, IIReturnsNumber
    {
        private IReturnsNumberProxy(ByRefValue reference): base(reference)
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