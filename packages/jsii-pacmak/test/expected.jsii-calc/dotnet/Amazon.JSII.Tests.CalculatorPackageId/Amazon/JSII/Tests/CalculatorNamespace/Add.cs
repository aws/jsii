using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The "+" binary operation.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Add), fullyQualifiedName: "jsii-calc.Add", parametersJson: "[{\"docs\":{\"summary\":\"Left-hand side operand.\"},\"name\":\"lhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"docs\":{\"summary\":\"Right-hand side operand.\"},\"name\":\"rhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Add : Amazon.JSII.Tests.CalculatorNamespace.BinaryOperation
    {
        /// <summary>Creates a BinaryOperation.</summary>
        /// <param name = "lhs">Left-hand side operand.</param>
        /// <param name = "rhs">Right-hand side operand.</param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public Add(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ lhs, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ rhs): base(new DeputyProps(new object[]{lhs, rhs}))
        {
        }

        protected Add(ByRefValue reference): base(reference)
        {
        }

        protected Add(DeputyProps props): base(props)
        {
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>The value.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}
