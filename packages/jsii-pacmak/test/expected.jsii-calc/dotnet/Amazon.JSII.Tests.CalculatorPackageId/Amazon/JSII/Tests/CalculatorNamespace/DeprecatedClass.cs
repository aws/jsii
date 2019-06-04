using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This tests code generation of deprecation markers.</summary>
    /// <remarks>
    /// deprecated: without replacement
    /// stability: Deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(DeprecatedClass), fullyQualifiedName: "jsii-calc.DeprecatedClass", parametersJson: "[{\"name\":\"argument\",\"type\":{\"primitive\":\"string\"},\"optional\":true}]")]
    [System.Obsolete("without replacement")]
    public class DeprecatedClass : DeputyBase
    {
        [System.Obsolete("this is unsafe")]
        public DeprecatedClass(string argument): base(new DeputyProps(new object[]{argument}))
        {
        }

        [System.Obsolete("this is unsafe")]
        protected DeprecatedClass(ByRefValue reference): base(reference)
        {
        }

        [System.Obsolete("this is unsafe")]
        protected DeprecatedClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// deprecated: intentionally
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "deprecatedAttribute", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("intentionally")]
        public virtual string DeprecatedAttribute
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// deprecated: can be unexpectedly non-null!
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "deprecatedProtected", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [System.Obsolete("can be unexpectedly non-null!")]
        protected virtual string DeprecatedProtected
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// deprecated: throws unexpected errors
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "deprecatedMethod")]
        [System.Obsolete("throws unexpected errors")]
        public virtual void DeprecatedMethod()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}