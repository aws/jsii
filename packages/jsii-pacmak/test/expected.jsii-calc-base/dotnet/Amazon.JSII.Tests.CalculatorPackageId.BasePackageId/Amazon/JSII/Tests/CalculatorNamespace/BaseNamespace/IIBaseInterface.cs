using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiInterface(nativeType: typeof(IIBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base.IBaseInterface")]
    public interface IIBaseInterface : IIVeryBaseInterface
    {
        [JsiiMethod(name: "bar")]
        void Bar();
    }
}
