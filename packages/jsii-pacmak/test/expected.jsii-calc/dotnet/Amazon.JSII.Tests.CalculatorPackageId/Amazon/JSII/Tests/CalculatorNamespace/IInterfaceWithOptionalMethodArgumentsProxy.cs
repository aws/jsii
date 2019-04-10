using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.</summary>
    [JsiiTypeProxy(nativeType: typeof(IIInterfaceWithOptionalMethodArguments), fullyQualifiedName: "jsii-calc.IInterfaceWithOptionalMethodArguments")]
    internal sealed class IInterfaceWithOptionalMethodArgumentsProxy : DeputyBase, IIInterfaceWithOptionalMethodArguments
    {
        private IInterfaceWithOptionalMethodArgumentsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(name: "hello", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"number\"}}]")]
        public void Hello(string arg1, double? arg2)
        {
            InvokeInstanceVoidMethod(new object[]{arg1, arg2});
        }
    }
}