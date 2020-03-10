using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Checks that optional result from interface method code generates correctly.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IOptionalMethod), fullyQualifiedName: "jsii-calc.compliance.IOptionalMethod")]
    internal sealed class IOptionalMethodProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IOptionalMethod
    {
        private IOptionalMethodProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "optional", returnsJson: "{\"optional\":true,\"type\":{\"primitive\":\"string\"}}")]
        public string? Optional()
        {
            return InvokeInstanceMethod<string?>(new System.Type[]{}, new object[]{});
        }
    }
}
