using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.composition
{
    /// <summary>Abstract operation composed from an expression of other operations.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation), fullyQualifiedName: "jsii-calc.composition.CompositeOperation")]
    internal sealed class CompositeOperationProxy : Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation
    {
        private CompositeOperationProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The expression that this operation consists of. Must be implemented by derived classes.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }
    }
}
