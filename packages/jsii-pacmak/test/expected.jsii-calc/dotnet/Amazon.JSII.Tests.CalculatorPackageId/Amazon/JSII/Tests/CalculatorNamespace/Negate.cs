using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The negation operation ("-value").</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(Negate), fullyQualifiedName: "jsii-calc.Negate", parametersJson: "[{\"name\":\"operand\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Negate : UnaryOperation, IIFriendlier
    {
        /// <remarks>stability: Experimental</remarks>
        public Negate(Value_ operand): base(new DeputyProps(new object[]{operand}))
        {
        }

        protected Negate(ByRefValue reference): base(reference)
        {
        }

        protected Negate(DeputyProps props): base(props)
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

        /// <summary>Say hello!</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
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