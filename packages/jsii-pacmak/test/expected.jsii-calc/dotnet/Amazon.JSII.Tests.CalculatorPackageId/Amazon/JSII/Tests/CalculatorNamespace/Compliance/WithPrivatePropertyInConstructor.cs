using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Verifies that private property declarations in constructor arguments are hidden.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.WithPrivatePropertyInConstructor), fullyQualifiedName: "jsii-calc.compliance.WithPrivatePropertyInConstructor", parametersJson: "[{\"name\":\"privateField\",\"optional\":true,\"type\":{\"primitive\":\"string\"}}]")]
    public class WithPrivatePropertyInConstructor : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public WithPrivatePropertyInConstructor(string? privateField = null): base(new DeputyProps(new object?[]{privateField}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected WithPrivatePropertyInConstructor(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
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
