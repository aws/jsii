using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: An operation on a single operand.</remarks>
    [JsiiTypeProxy(typeof(UnaryOperation), "jsii-calc.UnaryOperation")]
    internal sealed class UnaryOperationProxy : UnaryOperation
    {
        private UnaryOperationProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>summary: The value.</remarks>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>summary: String representation of the value.</remarks>
        [JsiiMethod("toString", "{\"primitive\":\"string\"}", "[]")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}