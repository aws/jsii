using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Checks the "same instance" isomorphism is preserved within the constructor.</summary>
    /// <remarks>
    /// Create a subclass of this, and assert that <c>this.myself()</c> actually returns
    /// <c>this</c> from within the constructor.
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Isomorphism), fullyQualifiedName: "jsii-calc.Isomorphism")]
    public abstract class Isomorphism : DeputyBase
    {
        protected Isomorphism(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Isomorphism(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Isomorphism(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "myself", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.Isomorphism\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Isomorphism Myself()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Isomorphism>(new System.Type[]{}, new object[]{});
        }
    }
}
