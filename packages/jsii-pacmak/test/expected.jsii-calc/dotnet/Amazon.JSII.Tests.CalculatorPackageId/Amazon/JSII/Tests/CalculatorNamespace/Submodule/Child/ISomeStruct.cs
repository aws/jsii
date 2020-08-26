using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    [JsiiInterface(nativeType: typeof(ISomeStruct), fullyQualifiedName: "jsii-calc.submodule.child.SomeStruct")]
    public interface ISomeStruct
    {
        [JsiiProperty(name: "prop", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.SomeEnum\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.SomeEnum Prop
        {
            get;
        }
    }
}
