using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiInterface(nativeType: typeof(IIBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base.IBaseInterface")]
    public interface IIBaseInterface : Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.IIVeryBaseInterface
    {
        [JsiiMethod(name: "bar")]
        void Bar();
    }
}