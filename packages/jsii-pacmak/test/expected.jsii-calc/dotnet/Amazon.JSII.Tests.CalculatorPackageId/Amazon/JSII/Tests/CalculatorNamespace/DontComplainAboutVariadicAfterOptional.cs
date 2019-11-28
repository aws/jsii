using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DontComplainAboutVariadicAfterOptional), fullyQualifiedName: "jsii-calc.DontComplainAboutVariadicAfterOptional")]
    public class DontComplainAboutVariadicAfterOptional : DeputyBase
    {
        public DontComplainAboutVariadicAfterOptional(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DontComplainAboutVariadicAfterOptional(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DontComplainAboutVariadicAfterOptional(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "optionalAndVariadic", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"optional\",\"optional\":true,\"type\":{\"primitive\":\"string\"}},{\"name\":\"things\",\"type\":{\"primitive\":\"string\"},\"variadic\":true}]")]
        public virtual string OptionalAndVariadic(string optional = null, params string[] things)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string), typeof(string[])}, new object[]{optional, things});
        }
    }
}
