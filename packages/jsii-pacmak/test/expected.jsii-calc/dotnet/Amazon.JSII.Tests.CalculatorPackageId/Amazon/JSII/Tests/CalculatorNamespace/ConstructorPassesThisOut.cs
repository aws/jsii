using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ConstructorPassesThisOut), fullyQualifiedName: "jsii-calc.ConstructorPassesThisOut", parametersJson: "[{\"name\":\"consumer\",\"type\":{\"fqn\":\"jsii-calc.PartiallyInitializedThisConsumer\"}}]")]
    public class ConstructorPassesThisOut : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public ConstructorPassesThisOut(Amazon.JSII.Tests.CalculatorNamespace.PartiallyInitializedThisConsumer consumer): base(new DeputyProps(new object[]{consumer}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConstructorPassesThisOut(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConstructorPassesThisOut(DeputyProps props): base(props)
        {
        }
    }
}
