using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents an operation on values.</summary>
    [JsiiInterfaceProxy(typeof(Operation), "@scope/jsii-calc-lib.Operation")]
    internal class OperationProxy : Operation
    {
        private OperationProxy(ByRefValue reference): base(reference)
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