using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The power operation.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(Power), fullyQualifiedName: "jsii-calc.Power", parametersJson: "[{\"name\":\"base\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"name\":\"pow\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Power : CompositeOperation_
    {
        /// <summary>Creates a Power operation.</summary>
        /// <param name = "@base">The base of the power.</param>
        /// <param name = "pow">The number of times to multiply.</param>
        /// <remarks>stability: Experimental</remarks>
        public Power(Value_ @base, Value_ pow): base(new DeputyProps(new object[]{@base, pow}))
        {
        }

        protected Power(ByRefValue reference): base(reference)
        {
        }

        protected Power(DeputyProps props): base(props)
        {
        }

        /// <summary>The base of the power.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "base", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Base
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <summary>The expression that this operation consists of. Must be implemented by derived classes.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <summary>The number of times to multiply.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "pow", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Pow
        {
            get => GetInstanceProperty<Value_>();
        }
    }
}