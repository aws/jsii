using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiInterface(nativeType: typeof(IBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base.IBaseInterface")]
    public interface IBaseInterface : Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.IVeryBaseInterface
    {
        [JsiiMethod(name: "bar")]
        void Bar();
    }
}
