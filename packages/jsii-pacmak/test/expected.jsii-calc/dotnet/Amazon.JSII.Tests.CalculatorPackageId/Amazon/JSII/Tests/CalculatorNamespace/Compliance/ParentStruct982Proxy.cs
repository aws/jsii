using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>https://github.com/aws/jsii/issues/982.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IParentStruct982), fullyQualifiedName: "jsii-calc.compliance.ParentStruct982")]
    internal sealed class ParentStruct982Proxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IParentStruct982
    {
        private ParentStruct982Proxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"string\"}")]
        public string Foo
        {
            get => GetInstanceProperty<string>();
        }
    }
}
