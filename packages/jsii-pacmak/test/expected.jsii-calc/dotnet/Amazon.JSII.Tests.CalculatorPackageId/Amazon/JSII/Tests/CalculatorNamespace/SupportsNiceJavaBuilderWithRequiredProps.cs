using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can generate fancy builders in Java for classes which take a mix of positional & struct parameters.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.SupportsNiceJavaBuilderWithRequiredProps), fullyQualifiedName: "jsii-calc.SupportsNiceJavaBuilderWithRequiredProps", parametersJson: "[{\"docs\":{\"summary\":\"some identifier of your choice.\"},\"name\":\"id\",\"type\":{\"primitive\":\"number\"}},{\"docs\":{\"summary\":\"some properties.\"},\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.SupportsNiceJavaBuilderProps\"}}]")]
    public class SupportsNiceJavaBuilderWithRequiredProps : DeputyBase
    {
        /// <param name = "id">some identifier of your choice.</param>
        /// <param name = "props">some properties.</param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public SupportsNiceJavaBuilderWithRequiredProps(double id, Amazon.JSII.Tests.CalculatorNamespace.ISupportsNiceJavaBuilderProps props): base(new DeputyProps(new object[]{id, props}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected SupportsNiceJavaBuilderWithRequiredProps(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected SupportsNiceJavaBuilderWithRequiredProps(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Bar
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>some identifier of your choice.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "id", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Id
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "propId", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string PropId
        {
            get => GetInstanceProperty<string>();
        }
    }
}
