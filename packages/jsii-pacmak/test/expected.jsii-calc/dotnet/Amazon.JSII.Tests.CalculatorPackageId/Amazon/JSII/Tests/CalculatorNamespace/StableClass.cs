using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Stable
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.StableClass), fullyQualifiedName: "jsii-calc.StableClass", parametersJson: "[{\"name\":\"readonlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"mutableNumber\",\"optional\":true,\"type\":{\"primitive\":\"number\"}}]")]
    public class StableClass : DeputyBase
    {
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        public StableClass(string readonlyString, double? mutableNumber = null): base(new DeputyProps(new object[]{readonlyString, mutableNumber}))
        {
        }

        protected StableClass(ByRefValue reference): base(reference)
        {
        }

        protected StableClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiMethod(name: "method")]
        public virtual void Method()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

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
