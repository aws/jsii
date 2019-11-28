using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that private property declarations in constructor arguments are hidden.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.WithPrivatePropertyInConstructor), fullyQualifiedName: "jsii-calc.WithPrivatePropertyInConstructor", parametersJson: "[{\"name\":\"privateField\",\"optional\":true,\"type\":{\"primitive\":\"string\"}}]")]
    public class WithPrivatePropertyInConstructor : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public WithPrivatePropertyInConstructor(string privateField = null): base(new DeputyProps(new object[]{privateField}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected WithPrivatePropertyInConstructor(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected WithPrivatePropertyInConstructor(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
