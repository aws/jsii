using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.PartiallyInitializedThisConsumer), fullyQualifiedName: "jsii-calc.PartiallyInitializedThisConsumer")]
    public abstract class PartiallyInitializedThisConsumer : DeputyBase
    {
        /// <summary></summary>
        protected PartiallyInitializedThisConsumer(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected PartiallyInitializedThisConsumer(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected PartiallyInitializedThisConsumer(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="obj"></param>
        /// <param name="dt"></param>
        /// <param name="ev"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "consumePartiallyInitializedThis", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.ConstructorPassesThisOut\"}},{\"name\":\"dt\",\"type\":{\"primitive\":\"date\"}},{\"name\":\"ev\",\"type\":{\"fqn\":\"jsii-calc.AllTypesEnum\"}}]")]
        public abstract string ConsumePartiallyInitializedThis(Amazon.JSII.Tests.CalculatorNamespace.ConstructorPassesThisOut obj, System.DateTime dt, Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum ev);

    }
}
