using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>awslabs/jsii#175 Interface proxies (and builders) do not respect optional arguments in methods. (experimental)</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IInterfaceWithOptionalMethodArguments), fullyQualifiedName: "jsii-calc.IInterfaceWithOptionalMethodArguments")]
    internal sealed class IInterfaceWithOptionalMethodArgumentsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithOptionalMethodArguments
    {
        private IInterfaceWithOptionalMethodArgumentsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "hello", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg2\",\"optional\":true,\"type\":{\"primitive\":\"number\"}}]")]
        public void Hello(string arg1, double? arg2 = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(string), typeof(double)}, new object?[]{arg1, arg2});
        }
    }
}
