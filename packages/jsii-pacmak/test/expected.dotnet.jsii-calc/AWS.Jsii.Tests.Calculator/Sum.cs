using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.composition;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>An operation that sums multiple values.</summary>
    [JsiiClass(typeof(Sum), "jsii-calc.Sum", "[]")]
    public class Sum : CompositeOperation
    {
        public Sum(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Sum(ByRefValue reference): base(reference)
        {
        }

        protected Sum(DeputyProps props): base(props)
        {
        }

        /// <summary>The parts to sum.</summary>
        [JsiiProperty("parts", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}")]
        public virtual Value_[] Parts
        {
            get => GetProperty<Value_[]>();
            set => SetProperty(value);
        }

        /// <summary>
        /// The expression that this operation consists of.
        /// Must be implemented by derived classes.
        /// </summary>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetProperty<Value_>();
        }
    }
}