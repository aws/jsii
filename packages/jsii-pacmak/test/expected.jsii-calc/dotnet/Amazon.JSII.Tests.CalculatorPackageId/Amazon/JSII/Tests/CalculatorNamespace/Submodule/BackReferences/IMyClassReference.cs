using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.BackReferences
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IMyClassReference), fullyQualifiedName: "jsii-calc.submodule.back_references.MyClassReference")]
    public interface IMyClassReference
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "reference", typeJson: "{\"fqn\":\"jsii-calc.submodule.MyClass\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.Submodule.MyClass Reference
        {
            get;
        }
    }
}
