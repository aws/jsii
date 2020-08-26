using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    [JsiiTypeProxy(nativeType: typeof(IStructure), fullyQualifiedName: "jsii-calc.submodule.child.Structure")]
    internal sealed class StructureProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.IStructure
    {
        private StructureProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Bool
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
