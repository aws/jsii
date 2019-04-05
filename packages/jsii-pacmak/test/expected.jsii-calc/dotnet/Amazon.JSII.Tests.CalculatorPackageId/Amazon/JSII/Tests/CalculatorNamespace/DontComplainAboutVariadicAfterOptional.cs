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

        [JsiiMethod("optionalAndVariadic", "{\"type\":{\"primitive\":\"string\"}}", "[{\"name\":\"optional\",\"value\":{\"type\":{\"primitive\":\"string\"},\"optional\":true}},{\"name\":\"things\",\"value\":{\"type\":{\"primitive\":\"string\"}}}]")]
        public virtual string OptionalAndVariadic(string optional, string things)
        {
            return InvokeInstanceMethod<string>(new object[]{optional, things});
        }
    }
}