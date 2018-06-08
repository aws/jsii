using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>An operation on a single operand.</summary>
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.UnaryOperation", "[{\"name\":\"operand\",\"type\":{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}}]")]
    public abstract class UnaryOperation : Operation
    {
        protected UnaryOperation(Value_ operand): base(new DeputyProps(new object[]{operand}))
        {
        }

        protected UnaryOperation(ByRefValue reference): base(reference)
        {
        }

        protected UnaryOperation(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("operand", "{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}")]
        public virtual Value_ Operand
        {
            get => GetProperty<Value_>();
        }
    }
}