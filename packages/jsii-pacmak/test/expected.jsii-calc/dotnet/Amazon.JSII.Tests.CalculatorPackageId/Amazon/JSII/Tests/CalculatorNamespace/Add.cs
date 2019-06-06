using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The "+" binary operation.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(Add), fullyQualifiedName: "jsii-calc.Add", parametersJson: "[{\"name\":\"lhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"name\":\"rhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Add : BinaryOperation
    {
        /// <summary>Creates a BinaryOperation.</summary>
        /// <param name = "lhs">Left-hand side operand.</param>
        /// <param name = "rhs">Right-hand side operand.</param>
        /// <remarks>stability: Experimental</remarks>
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
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}