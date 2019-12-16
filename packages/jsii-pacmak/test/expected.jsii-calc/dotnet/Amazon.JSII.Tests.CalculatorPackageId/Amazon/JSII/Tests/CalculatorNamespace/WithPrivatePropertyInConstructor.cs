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
        /// <summary></summary>
        /// <param name="privateField"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public WithPrivatePropertyInConstructor(string privateField = null): base(new DeputyProps(new object[]{privateField}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected WithPrivatePropertyInConstructor(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected WithPrivatePropertyInConstructor(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
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
