using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Helps ensure the JSII kernel &amp; runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.</summary>
    /// <returns>an instance of an un-exported class that extends `ExportedBaseClass`, declared as `IPrivatelyImplemented`.</returns>
    /// <remarks>
<<<<<<< HEAD
    /// <strong>Stability</strong>: Experimental
    /// 
    /// <strong>See</strong>: https://github.com/aws/jsii/issues/320
=======
    /// stability: Experimental
    /// 
    /// see:
    /// https://github.com/aws/jsii/issues/320
>>>>>>> origin/master
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ReturnsPrivateImplementationOfInterface), fullyQualifiedName: "jsii-calc.ReturnsPrivateImplementationOfInterface")]
    public class ReturnsPrivateImplementationOfInterface : DeputyBase
    {
        /// <summary></summary>
        public ReturnsPrivateImplementationOfInterface(): base(new DeputyProps(new object[]{}))
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected ReturnsPrivateImplementationOfInterface(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected ReturnsPrivateImplementationOfInterface(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
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
