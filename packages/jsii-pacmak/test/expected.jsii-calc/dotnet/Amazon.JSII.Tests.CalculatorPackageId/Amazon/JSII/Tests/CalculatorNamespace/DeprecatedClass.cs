using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(DeprecatedClass), fullyQualifiedName: "jsii-calc.DeprecatedClass", parametersJson: "[{\"name\":\"readonlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"mutableNumber\",\"optional\":true,\"type\":{\"primitive\":\"number\"}}]")]
    [System.Obsolete("a pretty boring class")]
    public class DeprecatedClass : DeputyBase
    {
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [System.Obsolete("this constructor is \"just\" okay")]
        public DeprecatedClass(string readonlyString, double? mutableNumber): base(new DeputyProps(new object[]{readonlyString, mutableNumber}))
        {
        }

        [System.Obsolete("this constructor is \"just\" okay")]
        protected DeprecatedClass(ByRefValue reference): base(reference)
        {
        }

        [System.Obsolete("this constructor is \"just\" okay")]
        protected DeprecatedClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete("it was a bad idea")]
        public virtual void Method()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("this is not always \"wazoo\", be ready to be disappointed")]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete("shouldn't have been mutable")]
        public virtual double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }
    }
}
