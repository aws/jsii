using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>https://github.com/aws/jsii/issues/982.</summary>
    [JsiiInterface(nativeType: typeof(IParentStruct982), fullyQualifiedName: "jsii-calc.ParentStruct982")]
    public interface IParentStruct982
    {
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"string\"}")]
        string Foo
        {
            get;
        }
    }
}
