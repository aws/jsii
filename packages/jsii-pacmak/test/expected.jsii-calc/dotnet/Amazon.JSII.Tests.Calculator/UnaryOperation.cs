using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.Lib;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>An operation on a single operand.</summary>
    [JsiiClass(typeof(UnaryOperation), "jsii-calc.UnaryOperation", "[{\"name\":\"operand\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
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

        [JsiiProperty("operand", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Operand
        {
            get => GetInstanceProperty<Value_>();
        }
    }
}