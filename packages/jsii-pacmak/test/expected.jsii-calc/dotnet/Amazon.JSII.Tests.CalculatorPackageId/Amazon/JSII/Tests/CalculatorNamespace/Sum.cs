using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: An operation that sums multiple values.</remarks>
    [JsiiClass(typeof(Sum), "jsii-calc.Sum", "[]")]
    public class Sum : CompositeOperation_
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

        /// <remarks>summary: The expression that this operation consists of. Must be implemented by derived classes.</remarks>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <remarks>summary: The parts to sum.</remarks>
        [JsiiProperty("parts", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}")]
        public virtual Value_[] Parts
        {
            get => GetInstanceProperty<Value_[]>();
            set => SetInstanceProperty(value);
        }
    }
}