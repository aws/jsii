using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: The power operation.</remarks>
    [JsiiClass(typeof(Power), "jsii-calc.Power", "[{\"name\":\"base\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"name\":\"pow\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Power : CompositeOperation_
    {
        public Power(Value_ @base, Value_ pow): base(new DeputyProps(new object[]{@base, pow}))
        {
        }

        protected Power(ByRefValue reference): base(reference)
        {
        }

        protected Power(DeputyProps props): base(props)
        {
        }

        /// <remarks>summary: The base of the power.</remarks>
        [JsiiProperty("base", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Base
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <remarks>
        /// remarks: Must be implemented by derived classes.
        /// summary: The expression that this operation consists of.
        /// </remarks>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <remarks>summary: The number of times to multiply.</remarks>
        [JsiiProperty("pow", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Pow
        {
            get => GetInstanceProperty<Value_>();
        }
    }
}