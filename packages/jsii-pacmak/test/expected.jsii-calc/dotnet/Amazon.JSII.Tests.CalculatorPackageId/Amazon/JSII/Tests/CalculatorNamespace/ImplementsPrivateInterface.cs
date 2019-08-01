using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ImplementsPrivateInterface), fullyQualifiedName: "jsii-calc.ImplementsPrivateInterface")]
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
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "private", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Private
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
