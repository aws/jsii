using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiInterfaceProxy("jsii-calc", "jsii$jsii_calc$.ReturnsNumber")]
    internal class ReturnsNumberProxy : DeputyBase, IReturnsNumber
    {
        private ReturnsNumberProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("numberProp", "{\"primitive\":\"number\"}")]
        public virtual double NumberProp
        {
            get => GetProperty<double>();
        }

        [JsiiMethod("obtainNumber", "{\"primitive\":\"number\"}", "[]")]
        public virtual double ObtainNumber()
        {
            return InvokeMethod<double>(new object[]{});
        }
    }
}