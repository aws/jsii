using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// deprecated: a pretty boring class
    /// stability: deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(DeprecatedClass), fullyQualifiedName: "jsii-calc.DeprecatedClass", parametersJson: "[{\"name\":\"readonlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"mutableNumber\",\"optional\":true,\"type\":{\"primitive\":\"number\"}}]")]
    [System.Obsolete()]
    public class DeprecatedClass : DeputyBase
    {
        /// <remarks>
        /// deprecated: this constructor is "just" okay
        /// stability: deprecated
        /// </remarks>
        [System.Obsolete()]
        public DeprecatedClass(string readonlyString, double? mutableNumber): base(new DeputyProps(new object[]{readonlyString, mutableNumber}))
        {
        }

        protected DeprecatedClass(ByRefValue reference): base(reference)
        {
        }

        protected DeprecatedClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// deprecated: it was a bad idea
        /// stability: deprecated
        /// </remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete()]
        public virtual void Method()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>
        /// deprecated: this is not always "wazoo", be ready to be disappointed
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete()]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// deprecated: shouldn't have been mutable
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete()]
        public virtual double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }
    }
}
