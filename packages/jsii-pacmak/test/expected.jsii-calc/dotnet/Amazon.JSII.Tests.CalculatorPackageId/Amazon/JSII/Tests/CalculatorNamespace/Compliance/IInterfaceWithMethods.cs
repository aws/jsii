using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IInterfaceWithMethods), fullyQualifiedName: "jsii-calc.compliance.IInterfaceWithMethods")]
    public interface IInterfaceWithMethods
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        string Value
        {
            get;
        }
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "doThings")]
        void DoThings();
    }
}
