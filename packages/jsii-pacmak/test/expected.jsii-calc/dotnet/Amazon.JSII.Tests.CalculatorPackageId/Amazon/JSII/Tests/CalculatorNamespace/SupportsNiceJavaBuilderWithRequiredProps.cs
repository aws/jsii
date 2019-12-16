using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can generate fancy builders in Java for classes which take a mix of positional &amp; struct parameters.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.SupportsNiceJavaBuilderWithRequiredProps), fullyQualifiedName: "jsii-calc.SupportsNiceJavaBuilderWithRequiredProps", parametersJson: "[{\"docs\":{\"summary\":\"some identifier of your choice.\"},\"name\":\"id\",\"type\":{\"primitive\":\"number\"}},{\"docs\":{\"summary\":\"some properties.\"},\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.SupportsNiceJavaBuilderProps\"}}]")]
    public class SupportsNiceJavaBuilderWithRequiredProps : DeputyBase
    {
        /// <summary></summary>
        /// <param name="id">some identifier of your choice.</param>
        /// <param name="props">some properties.</param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public SupportsNiceJavaBuilderWithRequiredProps(double id, Amazon.JSII.Tests.CalculatorNamespace.ISupportsNiceJavaBuilderProps props): base(new DeputyProps(new object[]{id, props}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected SupportsNiceJavaBuilderWithRequiredProps(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected SupportsNiceJavaBuilderWithRequiredProps(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Bar
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>some identifier of your choice.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "id", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Id
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "propId", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string PropId
        {
            get => GetInstanceProperty<string>();
        }
    }
}
