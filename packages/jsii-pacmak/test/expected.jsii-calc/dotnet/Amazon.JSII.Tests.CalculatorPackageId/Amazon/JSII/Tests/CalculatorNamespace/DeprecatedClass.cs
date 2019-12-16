using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DeprecatedClass), fullyQualifiedName: "jsii-calc.DeprecatedClass", parametersJson: "[{\"name\":\"readonlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"mutableNumber\",\"optional\":true,\"type\":{\"primitive\":\"number\"}}]")]
    [System.Obsolete("a pretty boring class")]
    public class DeprecatedClass : DeputyBase
    {
        /// <summary></summary>
        /// <param name="readonlyString"></param>
        /// <param name="mutableNumber"></param>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [System.Obsolete("this constructor is \"just\" okay")]
        public DeprecatedClass(string readonlyString, double? mutableNumber = null): base(new DeputyProps(new object[]{readonlyString, mutableNumber}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.Obsolete("this constructor is \"just\" okay")]
        protected DeprecatedClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.Obsolete("this constructor is \"just\" okay")]
        protected DeprecatedClass(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete("it was a bad idea")]
        public virtual void Method()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("this is not always \"wazoo\", be ready to be disappointed")]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete("shouldn't have been mutable")]
        public virtual double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }
    }
}
