using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Depend on a type from jsii-calc-base as a test for awslabs/jsii#128.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.UseCalcBase), fullyQualifiedName: "jsii-calc.compliance.UseCalcBase")]
    public class UseCalcBase : DeputyBase
    {
        public UseCalcBase(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UseCalcBase(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UseCalcBase(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-base.Base\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.Base Hello()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.Base>(new System.Type[]{}, new object[]{});
        }
    }
}
