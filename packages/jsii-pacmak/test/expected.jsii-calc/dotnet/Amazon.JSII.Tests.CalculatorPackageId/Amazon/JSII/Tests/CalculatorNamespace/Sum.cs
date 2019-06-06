using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>An operation that sums multiple values.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(Sum), fullyQualifiedName: "jsii-calc.Sum")]
    public class Sum : CompositeOperation_
    {
        /// <remarks>stability: Experimental</remarks>
        public Sum(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Sum(ByRefValue reference): base(reference)
        {
        }

        protected Sum(DeputyProps props): base(props)
        {
        }

        /// <summary>The expression that this operation consists of. Must be implemented by derived classes.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <summary>The parts to sum.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "parts", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}")]
        public virtual Value_[] Parts
        {
            get => GetInstanceProperty<Value_[]>();
            set => SetInstanceProperty(value);
        }
    }
}