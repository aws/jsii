using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// returns: an instance of an un-exported class that extends `ExportedBaseClass`, declared as `IPrivatelyImplemented`.
    /// see: https://github.com/awslabs/jsii/issues/320
    /// summary: Helps ensure the JSII kernel &amp; runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.
    /// </remarks>
    [JsiiClass(typeof(ReturnsPrivateImplementationOfInterface), "jsii-calc.ReturnsPrivateImplementationOfInterface", "[]")]
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

        [JsiiProperty("privateImplementation", "{\"fqn\":\"jsii-calc.IPrivatelyImplemented\"}")]
        public virtual IIPrivatelyImplemented PrivateImplementation
        {
            get => GetInstanceProperty<IIPrivatelyImplemented>();
        }
    }
}