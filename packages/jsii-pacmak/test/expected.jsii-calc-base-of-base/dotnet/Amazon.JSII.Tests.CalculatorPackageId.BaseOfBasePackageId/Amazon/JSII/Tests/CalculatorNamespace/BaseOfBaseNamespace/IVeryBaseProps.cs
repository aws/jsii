using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace
{
    [JsiiInterface(nativeType: typeof(IVeryBaseProps), fullyQualifiedName: "@scope/jsii-calc-base-of-base.VeryBaseProps")]
    public interface IVeryBaseProps
    {
        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very Foo
        {
            get;
        }
    }
}
