using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: The "*" binary operation.</remarks>
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

        /// <remarks>summary: The value.</remarks>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>summary: Say farewell.</remarks>
        [JsiiMethod("farewell", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Farewell()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>summary: Say goodbye.</remarks>
        [JsiiMethod("goodbye", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Goodbye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>summary: Returns another random number.</remarks>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        /// <remarks>summary: String representation of the value.</remarks>
        [JsiiMethod("toString", "{\"primitive\":\"string\"}", "[]")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}