using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Represents an operation with two operands.</summary>
    [JsiiClass(nativeType: typeof(BinaryOperation), fullyQualifiedName: "jsii-calc.BinaryOperation", parametersJson: "[{\"name\":\"lhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"name\":\"rhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
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

        /// <summary>Left-hand side operand.</summary>
        [JsiiProperty(name: "lhs", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Lhs
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <summary>Right-hand side operand.</summary>
        [JsiiProperty(name: "rhs", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Rhs
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}