using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Abstract class which represents a numeric value.</summary>
    [JsiiInterfaceProxy(typeof(Value_), "@scope/jsii-calc-lib.Value")]
    internal class ValueProxy : Value_
    {
        private ValueProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The value.</summary>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}