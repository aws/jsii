using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>This intentionally overlaps with StructA (where only requiredString is provided) to test htat the kernel properly disambiguates those.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStructB), fullyQualifiedName: "jsii-calc.compliance.StructB")]
    public interface IStructB
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "requiredString", typeJson: "{\"primitive\":\"string\"}")]
        string RequiredString
        {
            get;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
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
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "optionalStructA", typeJson: "{\"fqn\":\"jsii-calc.compliance.StructA\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructA? OptionalStructA
        {
            get
            {
                return null;
            }
        }
    }
}
