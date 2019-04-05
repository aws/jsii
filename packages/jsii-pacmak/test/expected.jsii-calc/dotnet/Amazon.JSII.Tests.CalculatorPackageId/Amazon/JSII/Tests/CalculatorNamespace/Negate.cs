using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The negation operation ("-value").</summary>
    [JsiiClass(typeof(Negate), "jsii-calc.Negate", "[{\"name\":\"operand\",\"value\":{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}]")]
    public class Negate : UnaryOperation, IIFriendlier
    {
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
        [JsiiProperty("value", "{\"type\":{\"primitive\":\"number\"}}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>Say farewell.</summary>
        [JsiiMethod("farewell", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public virtual string Farewell()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say goodbye.</summary>
        [JsiiMethod("goodbye", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public virtual string Goodbye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public virtual string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod("toString", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}