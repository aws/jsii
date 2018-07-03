using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.composition;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>The power operation.</summary>
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.Power", "[{\"name\":\"base\",\"type\":{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}},{\"name\":\"pow\",\"type\":{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}}]")]
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
        [JsiiProperty("base", "{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}")]
        public virtual Value_ Base
        {
            get => GetProperty<Value_>();
        }

        /// <summary>The number of times to multiply</summary>
        [JsiiProperty("pow", "{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}")]
        public virtual Value_ Pow
        {
            get => GetProperty<Value_>();
        }

        /// <summary>
        /// The expression that this operation consists of.
        /// Must be implemented by derived classes.
        /// </summary>
        [JsiiProperty("expression", "{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}")]
        public override Value_ Expression
        {
            get => GetProperty<Value_>();
        }
    }
}