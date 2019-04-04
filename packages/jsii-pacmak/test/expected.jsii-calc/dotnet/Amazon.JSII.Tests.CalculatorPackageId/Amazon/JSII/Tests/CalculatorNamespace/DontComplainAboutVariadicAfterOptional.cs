using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(DontComplainAboutVariadicAfterOptional), "jsii-calc.DontComplainAboutVariadicAfterOptional", "[]")]
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

        [JsiiMethod("optionalAndVariadic", "{\"primitive\":\"string\"}", "[{\"name\":\"optional\",\"type\":{\"primitive\":\"string\",\"nullable\":true}},{\"name\":\"things\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string OptionalAndVariadic(string optional, string things)
        {
            return InvokeInstanceMethod<string>(new object[]{optional, things});
        }
    }
}