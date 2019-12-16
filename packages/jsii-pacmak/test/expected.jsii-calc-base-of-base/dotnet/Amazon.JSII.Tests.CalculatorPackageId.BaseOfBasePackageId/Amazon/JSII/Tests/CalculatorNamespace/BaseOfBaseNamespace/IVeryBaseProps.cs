using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace
{
    /// <summary></summary>
    [JsiiInterface(nativeType: typeof(IVeryBaseProps), fullyQualifiedName: "@scope/jsii-calc-base-of-base.VeryBaseProps")]
    public interface IVeryBaseProps
    {
        /// <summary></summary>
        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very Foo
        {
            get;
        }
    }
}
