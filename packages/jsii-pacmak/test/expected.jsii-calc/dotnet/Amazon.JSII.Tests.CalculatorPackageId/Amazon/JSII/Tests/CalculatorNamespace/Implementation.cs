using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Implementation), fullyQualifiedName: "jsii-calc.Implementation")]
    public class Implementation : DeputyBase
    {
        public Implementation(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Implementation(ByRefValue reference): base(reference)
        {
        }

        protected Implementation(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}
