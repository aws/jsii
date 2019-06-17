using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Helps ensure the JSII kernel & runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.</summary>
    /// <returns>an instance of an un-exported class that extends `ExportedBaseClass`, declared as `IPrivatelyImplemented`.</returns>
    /// <remarks>
    /// stability: experimental
    /// https://github.com/awslabs/jsii/issues/320
    /// </remarks>
    [JsiiClass(nativeType: typeof(ReturnsPrivateImplementationOfInterface), fullyQualifiedName: "jsii-calc.ReturnsPrivateImplementationOfInterface")]
    public class ReturnsPrivateImplementationOfInterface : DeputyBase
    {
        public ReturnsPrivateImplementationOfInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ReturnsPrivateImplementationOfInterface(ByRefValue reference): base(reference)
        {
        }

        protected ReturnsPrivateImplementationOfInterface(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "privateImplementation", typeJson: "{\"fqn\":\"jsii-calc.IPrivatelyImplemented\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IIPrivatelyImplemented PrivateImplementation
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IIPrivatelyImplemented>();
        }
    }
}
