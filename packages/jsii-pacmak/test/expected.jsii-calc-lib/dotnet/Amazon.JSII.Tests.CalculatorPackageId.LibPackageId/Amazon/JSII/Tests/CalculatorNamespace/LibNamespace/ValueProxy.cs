using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Abstract class which represents a numeric value.</summary>
    [JsiiTypeProxy(nativeType: typeof(Value_), fullyQualifiedName: "@scope/jsii-calc-lib.Value")]
    internal sealed class ValueProxy : Value_
    {
        private ValueProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The value.</summary>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}
