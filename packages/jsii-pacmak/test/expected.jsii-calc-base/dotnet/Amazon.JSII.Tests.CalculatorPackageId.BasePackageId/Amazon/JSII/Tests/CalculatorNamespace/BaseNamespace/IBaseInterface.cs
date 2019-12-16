using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    /// <summary></summary>
    [JsiiInterface(nativeType: typeof(IBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base.IBaseInterface")]
    public interface IBaseInterface : Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.IVeryBaseInterface
    {
        /// <summary></summary>
        [JsiiMethod(name: "bar")]
        void Bar();
    }
}
