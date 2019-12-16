using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Stable
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.StableClass), fullyQualifiedName: "jsii-calc.StableClass", parametersJson: "[{\"name\":\"readonlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"mutableNumber\",\"optional\":true,\"type\":{\"primitive\":\"number\"}}]")]
    public class StableClass : DeputyBase
    {
        /// <summary></summary>
        /// <param name="readonlyString"></param>
        /// <param name="mutableNumber"></param>
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        public StableClass(string readonlyString, double? mutableNumber = null): base(new DeputyProps(new object[]{readonlyString, mutableNumber}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected StableClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected StableClass(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiMethod(name: "method")]
        public virtual void Method()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public virtual double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }
    }
}
