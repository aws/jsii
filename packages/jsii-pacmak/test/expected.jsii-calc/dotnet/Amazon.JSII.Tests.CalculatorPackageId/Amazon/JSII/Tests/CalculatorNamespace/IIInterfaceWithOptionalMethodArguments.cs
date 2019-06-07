using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.</summary>
    [JsiiInterface(nativeType: typeof(IIInterfaceWithOptionalMethodArguments), fullyQualifiedName: "jsii-calc.IInterfaceWithOptionalMethodArguments")]
    public interface IIInterfaceWithOptionalMethodArguments
    {
        [JsiiMethod(name: "hello", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg2\",\"optional\":true,\"type\":{\"primitive\":\"number\"}}]")]
        void Hello(string arg1, double? arg2);
    }
}
