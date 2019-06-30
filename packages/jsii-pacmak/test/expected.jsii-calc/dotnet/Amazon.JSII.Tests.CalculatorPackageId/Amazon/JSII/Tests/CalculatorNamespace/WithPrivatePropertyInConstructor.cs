using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that private property declarations in constructor arguments are hidden.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(WithPrivatePropertyInConstructor), fullyQualifiedName: "jsii-calc.WithPrivatePropertyInConstructor", parametersJson: "[{\"name\":\"privateField\",\"type\":{\"primitive\":\"string\"},\"optional\":true}]")]
    public class WithPrivatePropertyInConstructor : DeputyBase
    {
        /// <remarks>stability: Experimental</remarks>
        public WithPrivatePropertyInConstructor(string privateField): base(new DeputyProps(new object[]{privateField}))
        {
        }

        protected WithPrivatePropertyInConstructor(ByRefValue reference): base(reference)
        {
        }

        protected WithPrivatePropertyInConstructor(DeputyProps props): base(props)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}