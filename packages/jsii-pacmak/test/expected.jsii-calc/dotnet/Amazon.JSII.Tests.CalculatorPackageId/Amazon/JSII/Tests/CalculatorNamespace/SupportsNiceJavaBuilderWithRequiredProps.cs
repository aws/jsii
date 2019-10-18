using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can generate fancy builders in Java for classes which take a mix of positional & struct parameters.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.SupportsNiceJavaBuilderWithRequiredProps), fullyQualifiedName: "jsii-calc.SupportsNiceJavaBuilderWithRequiredProps", parametersJson: "[{\"name\":\"id\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.SupportsNiceJavaBuilderProps\"}}]")]
    public class SupportsNiceJavaBuilderWithRequiredProps : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public SupportsNiceJavaBuilderWithRequiredProps(double id, Amazon.JSII.Tests.CalculatorNamespace.ISupportsNiceJavaBuilderProps props): base(new DeputyProps(new object[]{id, props}))
        {
        }

        protected SupportsNiceJavaBuilderWithRequiredProps(ByRefValue reference): base(reference)
        {
        }

        protected SupportsNiceJavaBuilderWithRequiredProps(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Bar
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "id", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Id
        {
            get => GetInstanceProperty<double>();
        }

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
