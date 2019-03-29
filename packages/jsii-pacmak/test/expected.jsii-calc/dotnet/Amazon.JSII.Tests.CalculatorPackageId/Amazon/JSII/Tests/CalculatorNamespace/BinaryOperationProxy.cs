using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: Represents an operation with two operands.</remarks>
    [JsiiTypeProxy(typeof(BinaryOperation), "jsii-calc.BinaryOperation")]
    internal sealed class BinaryOperationProxy : BinaryOperation
    {
        private BinaryOperationProxy(ByRefValue reference): base(reference)
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