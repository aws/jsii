using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The power operation.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Power), fullyQualifiedName: "jsii-calc.Power", parametersJson: "[{\"docs\":{\"summary\":\"The base of the power.\"},\"name\":\"base\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"docs\":{\"summary\":\"The number of times to multiply.\"},\"name\":\"pow\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Power : Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation
    {
        /// <summary>Creates a Power operation.</summary>
        /// <param name="base">The base of the power.</param>
        /// <param name="pow">The number of times to multiply.</param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public Power(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ @base, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ pow): base(new DeputyProps(new object[]{@base, pow}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected Power(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected Power(DeputyProps props): base(props)
        {
        }

        /// <summary>The base of the power.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "base", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Base
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }

        /// <summary>The expression that this operation consists of. Must be implemented by derived classes.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }

        /// <summary>The number of times to multiply.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "pow", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Pow
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }
    }
}
