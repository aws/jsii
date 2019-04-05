using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(OptionalStructConsumer), "jsii-calc.OptionalStructConsumer", "[{\"name\":\"optionalStruct\",\"value\":{\"type\":{\"fqn\":\"jsii-calc.OptionalStruct\"},\"optional\":true}}]")]
    public class OptionalStructConsumer : DeputyBase
    {
        public OptionalStructConsumer(IOptionalStruct optionalStruct): base(new DeputyProps(new object[]{optionalStruct}))
        {
        }

        protected OptionalStructConsumer(ByRefValue reference): base(reference)
        {
        }

        protected OptionalStructConsumer(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("fieldValue", "{\"type\":{\"primitive\":\"string\"},\"optional\":true}")]
        public virtual string FieldValue
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("parameterWasUndefined", "{\"type\":{\"primitive\":\"boolean\"}}")]
        public virtual bool ParameterWasUndefined
        {
            get => GetInstanceProperty<bool>();
        }
    }
}