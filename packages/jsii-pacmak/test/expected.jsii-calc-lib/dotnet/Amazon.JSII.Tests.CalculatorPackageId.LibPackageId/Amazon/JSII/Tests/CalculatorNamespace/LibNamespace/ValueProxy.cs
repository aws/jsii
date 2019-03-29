using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>summary: Abstract class which represents a numeric value.</remarks>
    [JsiiTypeProxy(typeof(Value_), "@scope/jsii-calc-lib.Value")]
    internal sealed class ValueProxy : Value_
    {
        private ValueProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>summary: The value.</remarks>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}