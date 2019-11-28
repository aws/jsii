using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OptionalStructConsumer), fullyQualifiedName: "jsii-calc.OptionalStructConsumer", parametersJson: "[{\"name\":\"optionalStruct\",\"optional\":true,\"type\":{\"fqn\":\"jsii-calc.OptionalStruct\"}}]")]
    public class OptionalStructConsumer : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public OptionalStructConsumer(Amazon.JSII.Tests.CalculatorNamespace.IOptionalStruct optionalStruct = null): base(new DeputyProps(new object[]{optionalStruct}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OptionalStructConsumer(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OptionalStructConsumer(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "parameterWasUndefined", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool ParameterWasUndefined
        {
            get => GetInstanceProperty<bool>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "fieldValue", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string FieldValue
        {
            get => GetInstanceProperty<string>();
        }
    }
}
