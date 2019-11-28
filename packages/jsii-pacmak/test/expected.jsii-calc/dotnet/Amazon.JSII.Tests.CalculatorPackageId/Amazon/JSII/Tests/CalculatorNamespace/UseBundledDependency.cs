using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.UseBundledDependency), fullyQualifiedName: "jsii-calc.UseBundledDependency")]
    public class UseBundledDependency : DeputyBase
    {
        public UseBundledDependency(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UseBundledDependency(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UseBundledDependency(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "value", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public virtual object Value()
        {
            return InvokeInstanceMethod<object>(new System.Type[]{}, new object[]{});
        }
    }
}
