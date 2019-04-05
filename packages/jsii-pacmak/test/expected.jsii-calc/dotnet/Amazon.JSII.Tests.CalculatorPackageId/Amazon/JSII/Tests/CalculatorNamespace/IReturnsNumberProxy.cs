using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIReturnsNumber), "jsii-calc.IReturnsNumber")]
    internal sealed class IReturnsNumberProxy : DeputyBase, IIReturnsNumber
    {
        private IReturnsNumberProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("numberProp", "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Number\"}}")]
        public Number NumberProp
        {
            get => GetInstanceProperty<Number>();
        }

        [JsiiMethod("obtainNumber", "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"}}", "[]")]
        public IIDoublable ObtainNumber()
        {
            return InvokeInstanceMethod<IIDoublable>(new object[]{});
        }
    }
}