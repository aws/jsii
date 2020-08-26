using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(ITopLevelStruct), fullyQualifiedName: "jsii-calc.TopLevelStruct")]
    public interface ITopLevelStruct
    {
        /// <summary>This is a required field.</summary>
        [JsiiProperty(name: "required", typeJson: "{\"primitive\":\"string\"}")]
        string Required
        {
            get;
        }

        /// <summary>A union to really stress test our serialization.</summary>
        [JsiiProperty(name: "secondLevel", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.SecondLevelStruct\"}]}}")]
        object SecondLevel
        {
            get;
        }

        /// <summary>You don't have to pass this.</summary>
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
