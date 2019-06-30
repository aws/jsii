using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiTypeProxy(nativeType: typeof(IIReturnsNumber), fullyQualifiedName: "jsii-calc.IReturnsNumber")]
    internal sealed class IReturnsNumberProxy : DeputyBase, IIReturnsNumber
    {
        private IReturnsNumberProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "numberProp", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Number\"}")]
        public Number NumberProp
        {
            get => GetInstanceProperty<Number>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "obtainNumber", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"}}")]
        public IIDoublable ObtainNumber()
        {
            return InvokeInstanceMethod<IIDoublable>(new object[]{});
        }
    }
}