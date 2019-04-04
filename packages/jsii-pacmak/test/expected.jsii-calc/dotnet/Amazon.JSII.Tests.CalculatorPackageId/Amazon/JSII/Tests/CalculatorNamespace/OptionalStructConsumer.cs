using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(OptionalStructConsumer), "jsii-calc.OptionalStructConsumer", "[{\"name\":\"optionalStruct\",\"type\":{\"fqn\":\"jsii-calc.OptionalStruct\",\"nullable\":true}}]")]
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

        [JsiiProperty("parameterWasUndefined", "{\"primitive\":\"boolean\"}")]
        public virtual bool ParameterWasUndefined
        {
            get => GetInstanceProperty<bool>();
        }

        [JsiiProperty("fieldValue", "{\"primitive\":\"string\",\"nullable\":true}")]
        public virtual string FieldValue
        {
            get => GetInstanceProperty<string>();
        }
    }
}