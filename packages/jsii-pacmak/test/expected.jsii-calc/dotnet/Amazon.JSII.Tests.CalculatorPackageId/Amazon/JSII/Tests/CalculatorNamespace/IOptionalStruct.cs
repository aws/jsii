using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IOptionalStruct), fullyQualifiedName: "jsii-calc.OptionalStruct")]
    public interface IOptionalStruct
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "field", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Field
        {
            #if NETCOREAPP3_0
            get
            {
                return null;
            }
            #else
            get;
            #endif
        }
    }
}
