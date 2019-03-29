using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>summary: Represents an operation on values.</remarks>
    [JsiiClass(typeof(Operation), "@scope/jsii-calc-lib.Operation", "[]")]
    public abstract class Operation : Value_
    {
        protected Operation(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Operation(ByRefValue reference): base(reference)
        {
        }

        protected Operation(DeputyProps props): base(props)
        {
        }

        /// <remarks>summary: String representation of the value.</remarks>
        [JsiiMethod("toString", "{\"primitive\":\"string\"}", "[]")]
        public override abstract string ToString();
    }
}