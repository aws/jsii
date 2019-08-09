using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that private property declarations in constructor arguments are hidden.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.WithPrivatePropertyInConstructor), fullyQualifiedName: "jsii-calc.WithPrivatePropertyInConstructor", parametersJson: "[{\"name\":\"privateField\",\"optional\":true,\"type\":{\"primitive\":\"string\"}}]")]
    public class WithPrivatePropertyInConstructor : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public WithPrivatePropertyInConstructor(string privateField = null): base(new DeputyProps(new object[]{privateField}))
        {
        }

        protected WithPrivatePropertyInConstructor(ByRefValue reference): base(reference)
        {
        }

        protected WithPrivatePropertyInConstructor(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
