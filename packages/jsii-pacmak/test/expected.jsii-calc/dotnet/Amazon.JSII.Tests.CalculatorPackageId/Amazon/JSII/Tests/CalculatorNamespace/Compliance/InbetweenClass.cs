using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.InbetweenClass), fullyQualifiedName: "jsii-calc.compliance.InbetweenClass")]
    public class InbetweenClass : Amazon.JSII.Tests.CalculatorNamespace.Compliance.PublicClass, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IPublicInterface2
    {
        public InbetweenClass(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected InbetweenClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected InbetweenClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Ciao()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }
    }
}
