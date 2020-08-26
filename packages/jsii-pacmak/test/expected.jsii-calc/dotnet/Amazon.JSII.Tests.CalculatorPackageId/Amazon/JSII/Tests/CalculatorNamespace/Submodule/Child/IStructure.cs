using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    [JsiiInterface(nativeType: typeof(IStructure), fullyQualifiedName: "jsii-calc.submodule.child.Structure")]
    public interface IStructure
    {
        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Bool
        {
            get;
        }
    }
}
