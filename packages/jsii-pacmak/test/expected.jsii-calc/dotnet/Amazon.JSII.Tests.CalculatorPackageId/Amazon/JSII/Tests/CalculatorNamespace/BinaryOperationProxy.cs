using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Represents an operation with two operands.</summary>
    [JsiiInterfaceProxy(typeof(BinaryOperation), "jsii-calc.BinaryOperation")]
    internal class BinaryOperationProxy : BinaryOperation
    {
        private BinaryOperationProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The value.</summary>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod("toString", "{\"primitive\":\"string\"}", "[]")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}