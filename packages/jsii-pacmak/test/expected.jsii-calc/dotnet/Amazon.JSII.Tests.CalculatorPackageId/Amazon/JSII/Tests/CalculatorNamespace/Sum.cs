using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>An operation that sums multiple values.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Sum), fullyQualifiedName: "jsii-calc.Sum")]
    public class Sum : Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public Sum(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Sum(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Sum(DeputyProps props): base(props)
        {
        }

        /// <summary>The expression that this operation consists of.</summary>
        /// <remarks>
        /// Must be implemented by derived classes.
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }

        /// <summary>The parts to sum.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "parts", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"array\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[] Parts
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[]>();
            set => SetInstanceProperty(value);
        }
    }
}
