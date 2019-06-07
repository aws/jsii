using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>An operation that sums multiple values.</summary>
    [JsiiClass(nativeType: typeof(Sum), fullyQualifiedName: "jsii-calc.Sum")]
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

        /// <summary>The expression that this operation consists of. Must be implemented by derived classes.</summary>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }

        /// <summary>The parts to sum.</summary>
        [JsiiProperty(name: "parts", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"array\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[] Parts
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[]>();
            set => SetInstanceProperty(value);
        }
    }
}
