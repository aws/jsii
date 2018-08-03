using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.composition;
using Amazon.JSII.Tests.Calculator.Lib;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>The power operation.</summary>
    [JsiiClass(typeof(Power), "jsii-calc.Power", "[{\"name\":\"base\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"name\":\"pow\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Power : CompositeOperation
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

        /// <summary>The base of the power</summary>
        [JsiiProperty("base", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Base
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <summary>The number of times to multiply</summary>
        [JsiiProperty("pow", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Pow
        {
            get => GetInstanceProperty<Value_>();
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