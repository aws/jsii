using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIInterfaceWithMethods), fullyQualifiedName: "jsii-calc.IInterfaceWithMethods")]
    public interface IIInterfaceWithMethods
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        string Value
        {
            get;
        }
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "doThings")]
        void DoThings();
    }
}
