using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Abstract class which represents a numeric value.</summary>
    /// <remarks>
    /// stability: deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Value_), fullyQualifiedName: "@scope/jsii-calc-lib.Value")]
    [System.Obsolete()]
    internal sealed class ValueProxy : Value_
    {
        private ValueProxy(ByRefValue reference): base(reference)
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
    }
}
