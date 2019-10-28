using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(ITopLevelStruct), fullyQualifiedName: "jsii-calc.TopLevelStruct")]
    public interface ITopLevelStruct
    {
        /// <summary>This is a required field.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "required", typeJson: "{\"primitive\":\"string\"}")]
        string Required
        {
            get;
        }

        /// <summary>A union to really stress test our serialization.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "secondLevel", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.SecondLevelStruct\"}]}}")]
        object SecondLevel
        {
            get;
        }

        /// <summary>You don't have to pass this.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "optional", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Optional
        {
            get
            {
                return null;
            }
        }
    }
}
