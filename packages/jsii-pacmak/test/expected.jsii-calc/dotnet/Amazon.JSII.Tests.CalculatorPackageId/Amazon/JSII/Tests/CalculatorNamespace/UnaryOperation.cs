using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>An operation on a single operand.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(UnaryOperation), fullyQualifiedName: "jsii-calc.UnaryOperation", parametersJson: "[{\"name\":\"operand\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public abstract class UnaryOperation : Operation
    {
        /// <remarks>stability: Experimental</remarks>
        protected UnaryOperation(Value_ operand): base(new DeputyProps(new object[]{operand}))
        {
        }

        protected UnaryOperation(ByRefValue reference): base(reference)
        {
        }

        protected UnaryOperation(DeputyProps props): base(props)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "operand", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Operand
        {
            get => GetInstanceProperty<Value_>();
        }
    }
}