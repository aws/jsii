using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(DontComplainAboutVariadicAfterOptional), fullyQualifiedName: "jsii-calc.DontComplainAboutVariadicAfterOptional")]
    public class DontComplainAboutVariadicAfterOptional : DeputyBase
    {
        public DontComplainAboutVariadicAfterOptional(): base(new DeputyProps(new object[]{}))
        {
        }

        protected DontComplainAboutVariadicAfterOptional(ByRefValue reference): base(reference)
        {
        }

        protected DontComplainAboutVariadicAfterOptional(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "optionalAndVariadic", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"optional\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"things\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string OptionalAndVariadic(string optional, string things)
        {
            return InvokeInstanceMethod<string>(new object[]{optional, things});
        }
    }
}