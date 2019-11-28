using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The "*" binary operation.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Multiply), fullyQualifiedName: "jsii-calc.Multiply", parametersJson: "[{\"docs\":{\"summary\":\"Left-hand side operand.\"},\"name\":\"lhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"docs\":{\"summary\":\"Right-hand side operand.\"},\"name\":\"rhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Multiply : Amazon.JSII.Tests.CalculatorNamespace.BinaryOperation, Amazon.JSII.Tests.CalculatorNamespace.IFriendlier, Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator
    {
        /// <summary>Creates a BinaryOperation.</summary>
        /// <param name = "lhs">Left-hand side operand.</param>
        /// <param name = "rhs">Right-hand side operand.</param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public Multiply(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ lhs, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ rhs): base(new DeputyProps(new object[]{lhs, rhs}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Multiply(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Multiply(DeputyProps props): base(props)
        {
        }

        /// <summary>Say farewell.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "farewell", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Farewell()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Say goodbye.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "goodbye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Goodbye()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Returns another random number.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "next", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isOverride: true)]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>The value.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}
