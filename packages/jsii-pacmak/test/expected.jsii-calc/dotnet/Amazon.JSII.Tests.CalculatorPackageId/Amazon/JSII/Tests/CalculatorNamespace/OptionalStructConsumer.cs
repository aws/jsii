using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OptionalStructConsumer), fullyQualifiedName: "jsii-calc.OptionalStructConsumer", parametersJson: "[{\"name\":\"optionalStruct\",\"optional\":true,\"type\":{\"fqn\":\"jsii-calc.OptionalStruct\"}}]")]
    public class OptionalStructConsumer : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public OptionalStructConsumer(Amazon.JSII.Tests.CalculatorNamespace.IOptionalStruct optionalStruct = null): base(new DeputyProps(new object[]{optionalStruct}))
        {
        }

        protected OptionalStructConsumer(ByRefValue reference): base(reference)
        {
        }

        protected OptionalStructConsumer(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "parameterWasUndefined", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool ParameterWasUndefined
        {
            get => GetInstanceProperty<bool>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "fieldValue", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [JsiiOptional]
        public virtual string FieldValue
        {
            get => GetInstanceProperty<string>();
        }
    }
}
