using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(ITopLevelStruct), fullyQualifiedName: "jsii-calc.compliance.TopLevelStruct")]
    public interface ITopLevelStruct
    {
        /// <summary>This is a required field.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "required", typeJson: "{\"primitive\":\"string\"}")]
        string Required
        {
            get;
        }

        /// <summary>A union to really stress test our serialization.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "secondLevel", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.compliance.SecondLevelStruct\"}]}}")]
        object SecondLevel
        {
            get;
        }

        /// <summary>You don't have to pass this.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "optional", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string? Optional
        {
            get
            {
                return null;
            }
        }
    }
}
