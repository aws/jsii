using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Composition
{
    /// <summary>Abstract operation composed from an expression of other operations.</summary>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Composition.CompositeOperation), fullyQualifiedName: "jsii-calc.composition.CompositeOperation")]
    internal sealed class CompositeOperationProxy : Amazon.JSII.Tests.CalculatorNamespace.Composition.CompositeOperation
    {
        private CompositeOperationProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The expression that this operation consists of.</summary>
        /// <remarks>
        /// Must be implemented by derived classes.
        /// </remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }
    }
}
