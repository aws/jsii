using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Depend on a type from jsii-calc-base as a test for awslabs/jsii#128.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.UseCalcBase), fullyQualifiedName: "jsii-calc.UseCalcBase")]
    public class UseCalcBase : DeputyBase
    {
        public UseCalcBase(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UseCalcBase(ByRefValue reference): base(reference)
        {
        }

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
