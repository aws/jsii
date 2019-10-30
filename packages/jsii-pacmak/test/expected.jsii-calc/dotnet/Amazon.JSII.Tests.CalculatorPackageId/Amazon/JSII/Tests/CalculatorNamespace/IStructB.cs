using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This intentionally overlaps with StructA (where only requiredString is provided) to test htat the kernel properly disambiguates those.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStructB), fullyQualifiedName: "jsii-calc.StructB")]
    public interface IStructB
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "requiredString", typeJson: "{\"primitive\":\"string\"}")]
        string RequiredString
        {
            get;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "optionalBoolean", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        bool? OptionalBoolean
        {
            get
            {
                return null;
            }
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "optionalStructA", typeJson: "{\"fqn\":\"jsii-calc.StructA\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        Amazon.JSII.Tests.CalculatorNamespace.IStructA OptionalStructA
        {
            get
            {
                return null;
            }
        }
    }
}
