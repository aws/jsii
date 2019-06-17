using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>The power operation.</summary>
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Power), fullyQualifiedName: "jsii-calc.Power", parametersJson: "[{\"docs\":{\"summary\":\"The base of the power.\"},\"name\":\"base\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},{\"docs\":{\"summary\":\"The number of times to multiply.\"},\"name\":\"pow\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]")]
    public class Power : CompositeOperation
    {
        /// <summary>Creates a Power operation.</summary>
        /// <param name = "@base">The base of the power.</param>
        /// <param name = "pow">The number of times to multiply.</param>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        public Power(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ @base, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ pow): base(new DeputyProps(new object[]{@base, pow}))
        {
        }

        protected Power(ByRefValue reference): base(reference)
        {
        }

        protected Power(DeputyProps props): base(props)
        {
        }

        /// <summary>The base of the power.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "base", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Base
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }

        /// <summary>The expression that this operation consists of. Must be implemented by derived classes.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }

        /// <summary>The number of times to multiply.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "pow", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Pow
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }
    }
}
