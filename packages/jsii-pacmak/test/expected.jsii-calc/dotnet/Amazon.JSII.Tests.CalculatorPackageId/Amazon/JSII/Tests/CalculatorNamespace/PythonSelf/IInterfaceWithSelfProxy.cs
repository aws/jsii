using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.PythonSelf
{
    /// <summary> (experimental)</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IInterfaceWithSelf), fullyQualifiedName: "jsii-calc.PythonSelf.IInterfaceWithSelf")]
    internal sealed class IInterfaceWithSelfProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.PythonSelf.IInterfaceWithSelf
    {
        private IInterfaceWithSelfProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "method", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"self\",\"type\":{\"primitive\":\"number\"}}]")]
        public string Method(double self)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(double)}, new object[]{self});
        }
    }
}
