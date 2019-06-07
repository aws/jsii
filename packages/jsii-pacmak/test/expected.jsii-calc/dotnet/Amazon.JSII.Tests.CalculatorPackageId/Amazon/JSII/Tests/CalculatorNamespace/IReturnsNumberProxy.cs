using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IIReturnsNumber), fullyQualifiedName: "jsii-calc.IReturnsNumber")]
    internal sealed class IReturnsNumberProxy : DeputyBase, IIReturnsNumber
    {
        private IReturnsNumberProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "numberProp", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Number\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number NumberProp
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number>();
        }

        [JsiiMethod(name: "obtainNumber", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"}}")]
        public Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IIDoublable ObtainNumber()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IIDoublable>(new object[]{});
        }
    }
}
