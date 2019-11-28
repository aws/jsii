using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.PartiallyInitializedThisConsumer), fullyQualifiedName: "jsii-calc.PartiallyInitializedThisConsumer")]
    public abstract class PartiallyInitializedThisConsumer : DeputyBase
    {
        protected PartiallyInitializedThisConsumer(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected PartiallyInitializedThisConsumer(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected PartiallyInitializedThisConsumer(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "consumePartiallyInitializedThis", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.ConstructorPassesThisOut\"}},{\"name\":\"dt\",\"type\":{\"primitive\":\"date\"}},{\"name\":\"ev\",\"type\":{\"fqn\":\"jsii-calc.AllTypesEnum\"}}]")]
        public abstract string ConsumePartiallyInitializedThis(Amazon.JSII.Tests.CalculatorNamespace.ConstructorPassesThisOut obj, System.DateTime dt, Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum ev);

    }
}
