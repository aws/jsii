using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.BackReferences
{
    [JsiiInterface(nativeType: typeof(IMyClassReference), fullyQualifiedName: "jsii-calc.submodule.back_references.MyClassReference")]
    public interface IMyClassReference
    {
        [JsiiProperty(name: "reference", typeJson: "{\"fqn\":\"jsii-calc.submodule.MyClass\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.Submodule.MyClass Reference
        {
            get;
        }
    }
}
