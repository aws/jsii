using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.SupportsNiceJavaBuilder), fullyQualifiedName: "jsii-calc.SupportsNiceJavaBuilder", parametersJson: "[{\"name\":\"id\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"defaultBar\",\"optional\":true,\"type\":{\"primitive\":\"number\"}},{\"name\":\"props\",\"optional\":true,\"type\":{\"fqn\":\"jsii-calc.SupportsNiceJavaBuilderProps\"}}]")]
    public class SupportsNiceJavaBuilder : Amazon.JSII.Tests.CalculatorNamespace.SupportsNiceJavaBuilderWithRequiredProps
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public SupportsNiceJavaBuilder(double id, double? defaultBar = null, Amazon.JSII.Tests.CalculatorNamespace.ISupportsNiceJavaBuilderProps props = null): base(new DeputyProps(new object[]{id, defaultBar, props}))
        {
        }

        protected SupportsNiceJavaBuilder(ByRefValue reference): base(reference)
        {
        }

        protected SupportsNiceJavaBuilder(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "id", typeJson: "{\"primitive\":\"number\"}")]
        public override double Id
        {
            get => GetInstanceProperty<double>();
        }
    }
}
