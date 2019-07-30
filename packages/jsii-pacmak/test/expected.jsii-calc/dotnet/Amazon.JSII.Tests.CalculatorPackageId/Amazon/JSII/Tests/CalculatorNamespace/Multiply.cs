using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The "*" binary operation.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(Multiply), fullyQualifiedName: "jsii-calc.Multiply", parametersJson: "[{\"name\":\"lhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"name\":\"rhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Multiply : Amazon.JSII.Tests.CalculatorNamespace.BinaryOperation, Amazon.JSII.Tests.CalculatorNamespace.IIFriendlier, Amazon.JSII.Tests.CalculatorNamespace.IIRandomNumberGenerator
    {
        /// <summary>Creates a BinaryOperation.</summary>
        /// <param name = "lhs">Left-hand side operand.</param>
        /// <param name = "rhs">Right-hand side operand.</param>
        /// <remarks>stability: Experimental</remarks>
        public Multiply(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ lhs, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ rhs): base(new DeputyProps(new object[]{lhs, rhs}))
        {
        }

        protected Multiply(ByRefValue reference): base(reference)
        {
        }

        protected Multiply(DeputyProps props): base(props)
        {
        }

        /// <summary>The value.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>Say farewell.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "farewell", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Farewell()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say goodbye.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "goodbye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Goodbye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Returns another random number.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "next", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isOverride: true)]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
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