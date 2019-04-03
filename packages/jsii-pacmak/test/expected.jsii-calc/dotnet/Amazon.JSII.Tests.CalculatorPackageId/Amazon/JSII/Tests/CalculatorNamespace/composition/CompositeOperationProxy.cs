using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.composition
{
    /// <remarks>summary: Abstract operation composed from an expression of other operations.</remarks>
    [JsiiTypeProxy(typeof(CompositeOperation_), "jsii-calc.composition.CompositeOperation")]
    internal sealed class CompositeOperationProxy : CompositeOperation_
    {
        private CompositeOperationProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>summary: The expression that this operation consists of. Must be implemented by derived classes.</remarks>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }
    }
}