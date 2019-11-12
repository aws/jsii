using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(INestedStruct), fullyQualifiedName: "jsii-calc.NestedStruct")]
    internal sealed class NestedStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.INestedStruct
    {
        private NestedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>When provided, must be > 0.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "numberProp", typeJson: "{\"primitive\":\"number\"}")]
        public double NumberProp
        {
            get => GetInstanceProperty<double>();
        }
    }
}
