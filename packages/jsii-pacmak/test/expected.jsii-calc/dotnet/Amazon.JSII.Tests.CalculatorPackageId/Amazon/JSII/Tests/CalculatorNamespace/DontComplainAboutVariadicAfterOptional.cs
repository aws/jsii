using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

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

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DontComplainAboutVariadicAfterOptional(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DontComplainAboutVariadicAfterOptional(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "optionalAndVariadic", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"optional\",\"optional\":true,\"type\":{\"primitive\":\"string\"}},{\"name\":\"things\",\"type\":{\"primitive\":\"string\"},\"variadic\":true}]")]
        public virtual string OptionalAndVariadic(string? optional = null, params string[] things)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string), typeof(string[])}, new object?[]{optional, things});
        }
    }
}
