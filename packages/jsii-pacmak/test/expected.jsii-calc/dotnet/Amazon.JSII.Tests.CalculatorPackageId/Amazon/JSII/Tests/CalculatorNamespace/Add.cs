using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The "+" binary operation.</summary>
    [JsiiClass(typeof(Add), "jsii-calc.Add", "[{\"name\":\"lhs\",\"value\":{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}},{\"name\":\"rhs\",\"value\":{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}]")]
    public class Add : BinaryOperation
    {
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
        [JsiiProperty("value", "{\"type\":{\"primitive\":\"number\"}}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod("toString", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}