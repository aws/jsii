using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>https://github.com/aws/jsii/issues/982.</summary>
    [JsiiTypeProxy(nativeType: typeof(IParentStruct982), fullyQualifiedName: "jsii-calc.ParentStruct982")]
    internal sealed class ParentStruct982Proxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IParentStruct982
    {
        private ParentStruct982Proxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"string\"}")]
        public string Foo
        {
            get => GetInstanceProperty<string>();
        }
    }
}
