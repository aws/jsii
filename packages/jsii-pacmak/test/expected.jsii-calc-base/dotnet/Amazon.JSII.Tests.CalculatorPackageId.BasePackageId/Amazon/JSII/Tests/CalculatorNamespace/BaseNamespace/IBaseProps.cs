using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    /// <summary></summary>
    [JsiiInterface(nativeType: typeof(IBaseProps), fullyQualifiedName: "@scope/jsii-calc-base.BaseProps")]
    public interface IBaseProps : Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.IVeryBaseProps
    {
        /// <summary></summary>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}")]
        string Bar
        {
            get;
        }
    }
}
