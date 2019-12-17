using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Depend on a type from jsii-calc-base as a test for awslabs/jsii#128.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.UseCalcBase), fullyQualifiedName: "jsii-calc.UseCalcBase")]
    public class UseCalcBase : DeputyBase
    {
        /// <summary></summary>
        public UseCalcBase(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected UseCalcBase(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected UseCalcBase(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-base.Base\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.Base Hello()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.Base>(new System.Type[]{}, new object[]{});
        }
    }
}
