using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OptionalStructConsumer), fullyQualifiedName: "jsii-calc.OptionalStructConsumer", parametersJson: "[{\"name\":\"optionalStruct\",\"optional\":true,\"type\":{\"fqn\":\"jsii-calc.OptionalStruct\"}}]")]
    public class OptionalStructConsumer : DeputyBase
    {
        /// <summary></summary>
        /// <param name="optionalStruct"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public OptionalStructConsumer(Amazon.JSII.Tests.CalculatorNamespace.IOptionalStruct optionalStruct = null): base(new DeputyProps(new object[]{optionalStruct}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected OptionalStructConsumer(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected OptionalStructConsumer(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "parameterWasUndefined", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool ParameterWasUndefined
        {
            get => GetInstanceProperty<bool>();
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "fieldValue", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string FieldValue
        {
            get => GetInstanceProperty<string>();
        }
    }
}
