using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>Represents an operation with two operands.</summary>
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.BinaryOperation", "[{\"name\":\"lhs\",\"type\":{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}},{\"name\":\"rhs\",\"type\":{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}}]")]
    public abstract class BinaryOperation : Operation, IIFriendly
    {
        protected BinaryOperation(Value_ lhs, Value_ rhs): base(new DeputyProps(new object[]{lhs, rhs}))
        {
        }

        protected BinaryOperation(ByRefValue reference): base(reference)
        {
        }

        protected BinaryOperation(DeputyProps props): base(props)
        {
        }

        /// <summary>Left-hand side operand</summary>
        [JsiiProperty("lhs", "{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}")]
        public virtual Value_ Lhs
        {
            get => GetProperty<Value_>();
        }

        /// <summary>Right-hand side operand</summary>
        [JsiiProperty("rhs", "{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}")]
        public virtual Value_ Rhs
        {
            get => GetProperty<Value_>();
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Hello()
        {
            return InvokeMethod<string>(new object[]{});
        }
    }
}