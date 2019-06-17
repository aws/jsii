using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(ImplementsPrivateInterface), fullyQualifiedName: "jsii-calc.ImplementsPrivateInterface")]
    public class ImplementsPrivateInterface : DeputyBase
    {
        public ImplementsPrivateInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ImplementsPrivateInterface(ByRefValue reference): base(reference)
        {
        }

        protected ImplementsPrivateInterface(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "private", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Private
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
