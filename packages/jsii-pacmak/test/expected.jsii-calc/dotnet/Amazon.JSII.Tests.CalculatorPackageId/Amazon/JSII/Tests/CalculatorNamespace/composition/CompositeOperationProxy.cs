using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.composition
{
    /// <summary>Abstract operation composed from an expression of other operations.</summary>
    [JsiiInterfaceProxy(typeof(CompositeOperation_), "jsii-calc.composition.CompositeOperation")]
    internal class CompositeOperationProxy : CompositeOperation_
    {
        private CompositeOperationProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>
        /// The expression that this operation consists of.
        /// Must be implemented by derived classes.
        /// </summary>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }
    }
}