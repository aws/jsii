using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.BackReferences
{
    /// <summary> (experimental)</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IMyClassReference), fullyQualifiedName: "jsii-calc.submodule.back_references.MyClassReference")]
    internal sealed class MyClassReferenceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Submodule.BackReferences.IMyClassReference
    {
        private MyClassReferenceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "reference", typeJson: "{\"fqn\":\"jsii-calc.submodule.MyClass\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.Submodule.MyClass Reference
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Submodule.MyClass>();
        }
    }
}
