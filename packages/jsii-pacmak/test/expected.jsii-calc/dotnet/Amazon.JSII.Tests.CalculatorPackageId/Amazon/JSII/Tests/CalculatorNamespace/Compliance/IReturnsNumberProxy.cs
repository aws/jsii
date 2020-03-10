using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IReturnsNumber), fullyQualifiedName: "jsii-calc.compliance.IReturnsNumber")]
    internal sealed class IReturnsNumberProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IReturnsNumber
    {
        private IReturnsNumberProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "numberProp", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Number\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number NumberProp
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "obtainNumber", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"}}")]
        public Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable ObtainNumber()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable>(new System.Type[]{}, new object[]{});
        }
    }
}
