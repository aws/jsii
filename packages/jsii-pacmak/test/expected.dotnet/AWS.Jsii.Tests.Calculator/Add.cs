using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>The "+" binary operation.</summary>
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.Add", "[{\"name\":\"lhs\",\"type\":{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}},{\"name\":\"rhs\",\"type\":{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}}]")]
    public class Add : BinaryOperation
    {
        public Add(Value_ lhs, Value_ rhs): base(new DeputyProps(new object[]{lhs, rhs}))
        {
        }

        protected Add(ByRefValue reference): base(reference)
        {
        }

        protected Add(DeputyProps props): base(props)
        {
        }

        /// <summary>The value.</summary>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetProperty<double>();
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod("toString", "{\"primitive\":\"string\"}", "[]")]
        public override string ToString()
        {
            return InvokeMethod<string>(new object[]{});
        }
    }
}