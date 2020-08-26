using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Checks that optional result from interface method code generates correctly.</summary>
    [JsiiInterface(nativeType: typeof(IOptionalMethod), fullyQualifiedName: "jsii-calc.IOptionalMethod")]
    public interface IOptionalMethod
    {
        [JsiiMethod(name: "optional", returnsJson: "{\"optional\":true,\"type\":{\"primitive\":\"string\"}}")]
        string? Optional();
    }
}
