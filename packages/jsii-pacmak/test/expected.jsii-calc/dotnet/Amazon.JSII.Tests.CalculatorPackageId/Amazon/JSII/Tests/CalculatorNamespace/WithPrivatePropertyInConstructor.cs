using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that private property declarations in constructor arguments are hidden.</summary>
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(WithPrivatePropertyInConstructor), fullyQualifiedName: "jsii-calc.WithPrivatePropertyInConstructor", parametersJson: "[{\"name\":\"privateField\",\"optional\":true,\"type\":{\"primitive\":\"string\"}}]")]
    public class WithPrivatePropertyInConstructor : DeputyBase
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        public WithPrivatePropertyInConstructor(string privateField): base(new DeputyProps(new object[]{privateField}))
        {
        }

        protected WithPrivatePropertyInConstructor(ByRefValue reference): base(reference)
        {
        }

        protected WithPrivatePropertyInConstructor(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
