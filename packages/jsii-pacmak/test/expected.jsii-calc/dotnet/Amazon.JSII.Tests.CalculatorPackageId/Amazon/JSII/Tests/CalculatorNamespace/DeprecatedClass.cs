using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Deprecated</remarks>
    [JsiiClass(nativeType: typeof(DeprecatedClass), fullyQualifiedName: "jsii-calc.DeprecatedClass", parametersJson: "[{\"name\":\"readonlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"mutableNumber\",\"type\":{\"primitive\":\"number\"},\"optional\":true}]")]
    [System.Obsolete("for the show")]
    public class DeprecatedClass : DeputyBase
    {
        /// <remarks>stability: Deprecated</remarks>
        [System.Obsolete("for the show")]
        public DeprecatedClass(string readonlyString, double? mutableNumber): base(new DeputyProps(new object[]{readonlyString, mutableNumber}))
        {
        }

        [System.Obsolete("for the show")]
        protected DeprecatedClass(ByRefValue reference): base(reference)
        {
        }

        [System.Obsolete("for the show")]
        protected DeprecatedClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("for the show")]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete("for the show")]
        public virtual double? MutableProperty
        {
            get => GetInstanceProperty<double? >();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Deprecated</remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete("for the show")]
        public virtual void Method()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}