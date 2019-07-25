using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ExperimentalClass), fullyQualifiedName: "jsii-calc.ExperimentalClass", parametersJson: "[{\"name\":\"readonlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"mutableNumber\",\"optional\":true,\"type\":{\"primitive\":\"number\"}}]")]
    public class ExperimentalClass : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public ExperimentalClass(string readonlyString, double? mutableNumber): base(new DeputyProps(new object[]{readonlyString, mutableNumber}))
        {
        }

        protected ExperimentalClass(ByRefValue reference): base(reference)
        {
        }

        protected ExperimentalClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "method")]
        public virtual void Method()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public virtual double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }
    }
}
