using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(OptionalStructConsumer), fullyQualifiedName: "jsii-calc.OptionalStructConsumer", parametersJson: "[{\"name\":\"optionalStruct\",\"type\":{\"fqn\":\"jsii-calc.OptionalStruct\"},\"optional\":true}]")]
    public class OptionalStructConsumer : DeputyBase
    {
        /// <remarks>stability: Experimental</remarks>
        public OptionalStructConsumer(IOptionalStruct optionalStruct): base(new DeputyProps(new object[]{optionalStruct}))
        {
        }

        protected OptionalStructConsumer(ByRefValue reference): base(reference)
        {
        }

        protected OptionalStructConsumer(DeputyProps props): base(props)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "parameterWasUndefined", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool ParameterWasUndefined
        {
            get => GetInstanceProperty<bool>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "fieldValue", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string FieldValue
        {
            get => GetInstanceProperty<string>();
        }
    }
}