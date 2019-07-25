using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DontComplainAboutVariadicAfterOptional), fullyQualifiedName: "jsii-calc.DontComplainAboutVariadicAfterOptional")]
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

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "optionalAndVariadic", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"optional\",\"optional\":true,\"type\":{\"primitive\":\"string\"}},{\"name\":\"things\",\"type\":{\"primitive\":\"string\"},\"variadic\":true}]")]
        public virtual string OptionalAndVariadic(string optional, string things)
        {
            return InvokeInstanceMethod<string>(new object[]{optional, things});
        }
    }
}
