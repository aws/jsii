using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(IIInterfaceWithOptionalMethodArguments), fullyQualifiedName: "jsii-calc.IInterfaceWithOptionalMethodArguments")]
    public interface IIInterfaceWithOptionalMethodArguments
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "hello", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"number\"},\"optional\":true}]")]
        void Hello(string arg1, double? arg2);
    }
}