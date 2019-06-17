using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>An operation on a single operand.</summary>
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(UnaryOperation), fullyQualifiedName: "jsii-calc.UnaryOperation")]
    internal sealed class UnaryOperationProxy : UnaryOperation
    {
        private UnaryOperationProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The value.</summary>
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        [System.Obsolete()]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}
