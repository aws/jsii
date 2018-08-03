using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.Lib;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>The "*" binary operation.</summary>
    [JsiiClass(typeof(Multiply), "jsii-calc.Multiply", "[{\"name\":\"lhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"name\":\"rhs\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Multiply : BinaryOperation, IIFriendlier, IIRandomNumberGenerator
    {
        public Multiply(Value_ lhs, Value_ rhs): base(new DeputyProps(new object[]{lhs, rhs}))
        {
        }

        protected Multiply(ByRefValue reference): base(reference)
        {
        }

        protected Multiply(DeputyProps props): base(props)
        {
        }

        /// <summary>The value.</summary>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod("toString", "{\"primitive\":\"string\"}", "[]")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say goodbye.</summary>
        [JsiiMethod("goodbye", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Goodbye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say farewell.</summary>
        [JsiiMethod("farewell", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Farewell()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Returns another random number.</summary>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}