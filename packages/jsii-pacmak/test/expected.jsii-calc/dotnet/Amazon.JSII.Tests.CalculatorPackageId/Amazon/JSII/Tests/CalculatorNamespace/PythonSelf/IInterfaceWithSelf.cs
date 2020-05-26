using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.PythonSelf
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IInterfaceWithSelf), fullyQualifiedName: "jsii-calc.PythonSelf.IInterfaceWithSelf")]
    public interface IInterfaceWithSelf
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "method", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"self\",\"type\":{\"primitive\":\"number\"}}]")]
        string Method(double self);
    }
}
