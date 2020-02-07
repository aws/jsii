using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Helps ensure the JSII kernel &amp; runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.</summary>
    /// <returns>an instance of an un-exported class that extends `ExportedBaseClass`, declared as `IPrivatelyImplemented`.</returns>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// 
    /// <strong>See</strong>: https://github.com/aws/jsii/issues/320
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ReturnsPrivateImplementationOfInterface), fullyQualifiedName: "jsii-calc.ReturnsPrivateImplementationOfInterface")]
    public class ReturnsPrivateImplementationOfInterface : DeputyBase
    {
        public ReturnsPrivateImplementationOfInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ReturnsPrivateImplementationOfInterface(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ReturnsPrivateImplementationOfInterface(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "privateImplementation", typeJson: "{\"fqn\":\"jsii-calc.IPrivatelyImplemented\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IPrivatelyImplemented PrivateImplementation
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IPrivatelyImplemented>();
        }
    }
}
